import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';
import { getPrerenderRoutes } from './routes.mjs';

const BASE_PATH = process.env.BASE_PATH ?? '/';
const DIST_DIR = 'dist';
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT ?? 4173);
const SITE_URL = 'https://sebastien-gineste.github.io/Eportfolio';

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

async function waitForPreviewReady(previewProcess) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timed out waiting for vite preview on port ${PREVIEW_PORT}`));
    }, 30_000);

    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes(`http://localhost:${PREVIEW_PORT}`)) {
        clearTimeout(timeout);
        previewProcess.stdout?.off('data', onData);
        previewProcess.stderr?.off('data', onData);
        resolve();
      }
    };

    previewProcess.stdout?.on('data', onData);
    previewProcess.stderr?.on('data', onData);
    previewProcess.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    previewProcess.on('exit', (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`vite preview exited with code ${code}`));
      }
    });
  });
}

function startPreview() {
  return spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'],
    {
      env: { ...process.env, BASE_PATH },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
}

async function prerender() {
  const base = normalizeBasePath(BASE_PATH);
  const origin = `http://localhost:${PREVIEW_PORT}`;
  const preview = startPreview();

  await waitForPreviewReady(preview);

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
