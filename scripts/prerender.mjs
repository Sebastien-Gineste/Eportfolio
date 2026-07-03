import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { getPrerenderRoutes } from './routes.mjs';

const BASE_PATH = process.env.BASE_PATH ?? '/';
const DIST_DIR = 'dist';
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT ?? 4173);
const PREVIEW_READY_TIMEOUT_MS = Number(process.env.PREVIEW_READY_TIMEOUT_MS ?? 60_000);
const SITE_URL = 'https://sebastien-gineste.github.io/Eportfolio';
const VITE_BIN = join(fileURLToPath(new URL('..', import.meta.url)), 'node_modules', 'vite', 'bin', 'vite.js');

function normalizeBasePath(basePath) {
  if (!basePath || basePath === '/') return '/';
  return basePath.endsWith('/') ? basePath : `${basePath}/`;
}

function routeToOutputPath(route) {
  if (route === '/') return join(DIST_DIR, 'index.html');
  return join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

function routeToUrl(route, origin) {
  const base = normalizeBasePath(BASE_PATH);
  if (route === '/') {
    return `${origin}${base === '/' ? '/' : base}`;
  }
  const suffix = route.replace(/^\//, '');
  return `${origin}${base}${suffix}`;
}

function previewHealthUrl(origin) {
  return `${origin}${normalizeBasePath(BASE_PATH)}`;
}

function pipePreviewLogs(previewProcess) {
  const log = (stream) => {
    stream?.on('data', (chunk) => process.stderr.write(chunk));
  };
  log(previewProcess.stdout);
  log(previewProcess.stderr);
}

async function waitForPreviewReady(healthUrl, previewProcess) {
  const started = Date.now();

  while (Date.now() - started < PREVIEW_READY_TIMEOUT_MS) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`vite preview exited with code ${previewProcess.exitCode}`);
    }

    try {
      const response = await fetch(healthUrl, { redirect: 'follow' });
      if (response.ok) {
        return;
      }
    } catch {
      // Preview is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for vite preview at ${healthUrl}`);
}

function startPreview() {
  return spawn(process.execPath, [VITE_BIN, 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    env: { ...process.env, BASE_PATH },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function prerender() {
  const origin = `http://localhost:${PREVIEW_PORT}`;
  const healthUrl = previewHealthUrl(origin);
  const preview = startPreview();
  pipePreviewLogs(preview);

  try {
    await waitForPreviewReady(healthUrl, preview);
  } catch (error) {
    preview.kill('SIGTERM');
    throw error;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const routes = getPrerenderRoutes();
    console.log(`Pre-rendering ${routes.length} routes…`);

    for (const route of routes) {
      const url = routeToUrl(route, origin);
      const page = await browser.newPage();

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 90_000 });
        await page.waitForSelector('#root > *', { timeout: 30_000 });

        const expectedCanonical = route === '/' ? '/fr' : route;
        await page.waitForFunction(
          (path) => {
            const href = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
            return Boolean(href && href.includes(path));
          },
          { timeout: 30_000 },
          expectedCanonical,
        );

        await page.waitForFunction(
          () => {
            const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
            return Boolean(description && description.length > 10);
          },
          { timeout: 30_000 },
        );

        const html = await page.evaluate(() => document.documentElement.outerHTML);
        const outputPath = routeToOutputPath(route);
        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, `<!doctype html>\n${html}`, 'utf8');
        console.log(`  ✓ ${route} -> ${outputPath}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    preview.kill('SIGTERM');
  }

  console.log(`Pre-render complete (${SITE_URL}).`);
}

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
