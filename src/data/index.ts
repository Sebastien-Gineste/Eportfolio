import type { Interest, JourneyEntry, LocalizedText, Profile, Project, SkillCategory } from '@/types';

/**
 * Static portfolio content, kept separate from the UI so pages stay
 * presentation-only.
 */

export const profile: Profile = {
  name: 'Sébastien Gineste',
  location: 'Montpellier, France',
  email: 'contact@example.com',
  links: {
    github: 'https://github.com/Sebastien-Gineste',
    linkedin: 'https://www.linkedin.com/in/s%C3%A9bastien-gineste/',
  },
};

const skill = (fr: string, en?: string): LocalizedText => ({ fr, en: en ?? fr });

export const skillCategories: SkillCategory[] = [
  {
    id: 'dev',
    name: { fr: 'Langages & Frameworks', en: 'Languages & Frameworks' },
    skills: [
      skill('Scala'),
      skill('Python'),
      skill('TypeScript'),
      skill('Node.js'),
      skill('Angular'),
      skill('npm'),
    ],
  },
  {
    id: 'cloud',
    name: { fr: 'Cloud & Infrastructure', en: 'Cloud & Infrastructure' },
    skills: [
      skill('AWS'),
      skill('Scaleway'),
      skill('Kubernetes'),
      skill('Helm'),
      skill('Terraform'),
      skill('Docker'),
    ],
  },
  {
    id: 'cicd',
    name: { fr: 'CI/CD & Observabilité', en: 'CI/CD & Observability' },
    skills: [
      skill('GitHub Actions'),
      skill('ArgoCD'),
      skill('Git'),
      skill('Grafana'),
      skill('Loki'),
      skill('Alloy'),
    ],
  },
  {
    id: 'data',
    name: { fr: 'Bases de données', en: 'Databases' },
    skills: [skill('MongoDB'), skill('PostgreSQL'), skill('Elasticsearch')],
  },
  {
    id: 'security',
    name: { fr: 'Sécurité & Identité', en: 'Security & Identity' },
    skills: [
      skill('SSO'),
      skill('IDP'),
      skill('MFA'),
      skill('JWT'),
      skill('Sécurité', 'Security'),
    ],
  },
  {
    id: 'ai',
    name: { fr: 'IA générative', en: 'Generative AI' },
    skills: [
      skill('IA générative', 'Generative AI'),
      skill('Agents IA', 'AI agents'),
      skill('RAG'),
      skill('LLM'),
    ],
  },
  {
    id: 'architecture',
    name: { fr: 'Architecture & bonnes pratiques', en: 'Architecture & best practices' },
    skills: [
      skill('DDD'),
      skill('Architecture hexagonale', 'Hexagonal architecture'),
      skill('Clean code'),
      skill('Event-driven'),
    ],
  },
  {
    id: 'tests',
    name: { fr: 'Tests & Qualité', en: 'Testing & Quality' },
    skills: [
      skill('Tests unitaires', 'Unit testing'),
      skill('Tests end-to-end', 'End-to-end testing'),
      skill('Tests de contrat', 'Contract testing'),
      skill('TDD'),
    ],
  },
  {
    id: 'methods',
    name: { fr: 'Méthodes & Collaboration', en: 'Methods & Collaboration' },
    skills: [
      skill('Agile'),
      skill('Scrum'),
      skill('Gestion de projet', 'Project management'),
      skill('Roadmap'),
      skill('Document de design', 'Design document'),
    ],
  },
];

export const education: JourneyEntry[] = [
  {
    id: 'iut',
    period: '2018 – 2020',
    title: { fr: 'DUT Informatique', en: 'Computer Science degree' },
    description: {
      fr: 'IUT de Montpellier-Sète.',
      en: 'University Institute of Technology, Montpellier.',
    },
  },
  {
    id: 'polytech',
    period: '2020 – 2023',
    title: { fr: 'École d’ingénieur', en: 'Engineering school' },
    description: {
      fr: 'Polytech Montpellier — informatique et gestion.',
      en: 'Polytech Montpellier — computer science and management.',
    },
    url: 'https://www.polytech.umontpellier.fr/',
  },
];

export const experience: JourneyEntry[] = [
  {
    id: 'chu-montpellier',
    period: '2025',
    current: true,
    title: { fr: 'Ingénieur logiciel — CHU de Montpellier', en: 'Software Engineer — Montpellier University Hospital' },
    description: {
      fr: 'Conception et exploitation d’applications d’IA pour les professionnels de santé, avec un fort accent sur la fiabilité, la sécurité et l’intégration au système d’information hospitalier.',
      en: 'Design and operation of AI-powered applications for healthcare professionals, with a strong focus on reliability, security and integration with the hospital information system.',
    },
    url: 'https://www.chu-montpellier.fr/',
  },
  {
    id: 'teads',
    period: '2023 – 2025',
    title: { fr: 'Ingénieur logiciel — Teads', en: 'Software Engineer — Teads' },
    description: {
      fr: 'Architecture d’une plateforme backend orientée domaine (Scala, gRPC) : décomposition d’un monolithe, migrations de systèmes distribués (Kafka, Elasticsearch) et standardisation de l’authentification entre équipes.',
      en: 'Architecture of a domain-oriented backend platform (Scala, gRPC): monolith decomposition, distributed-systems migrations (Kafka, Elasticsearch) and cross-team authentication standardization.',
    },
    url: 'https://www.teads.com/',
  },
];

export const interests: Interest[] = [
  { id: 'video', label: { fr: 'Vidéo', en: 'Video' } },
  { id: 'gaming', label: { fr: 'Jeux vidéo', en: 'Gaming' } },
  { id: 'sport', label: { fr: 'Sport', en: 'Sport' } },
  { id: 'anime', label: { fr: 'Animation', en: 'Anime' } },
];

export const projects: Project[] = [
  {
    slug: 'cloud-storage-audit-tool',
    title: {
      fr: 'Application web — Cloud Storage Audit Tool',
      en: 'Web application — Cloud Storage Audit Tool',
    },
    type: { fr: 'Projet industriel', en: 'Industrial project' },
    summary: {
      fr: 'Audit du coût environnemental des données stockées sur un drive et politiques de suppression.',
      en: 'Auditing the environmental cost of data stored on a drive and running deletion policies.',
    },
    description: {
      fr: 'Projet de fin d’études (PFE) réalisé pour CGI dans le cadre du RGESN (Référentiel général d’écoconception de services numériques), visant à réduire la consommation de ressources informatiques et énergétiques et la contribution à l’obsolescence des équipements. L’application permet d’ajouter des drives des fournisseurs Google Drive et OneDrive via OAuth 2. Un audit de ces drives est réalisé à un intervalle défini par l’utilisateur : il mesure l’impact environnemental et énergétique des fichiers et identifie les doublons afin d’économiser de l’espace. L’utilisateur peut définir des politiques de suppression selon le type de données et leur date de dernière modification ; ces politiques permettent de supprimer ou de rendre obsolètes les fichiers qui ne les respectent pas. La consommation du drive peut être visualisée dans le temps. Architecture en microservices dockerisés.',
      en: 'Final-year project (PFE) carried out for CGI as part of the RGESN (General Reference for the Ecodesign of Digital Services), which aims to reduce the consumption of IT and energy resources and the contribution to equipment obsolescence. The application lets you add drives from Google Drive and OneDrive providers via OAuth 2. An audit of these drives is performed at a user-defined interval: it measures the environmental and energy impact of files and identifies duplicate files to save space. Users can define deletion policies based on data type and last modification date; these policies allow non-compliant files to be deleted or made obsolete. Drive consumption can be visualised over time. Dockerised microservices architecture.',
    },
    context: {
      fr: '02/2023 · 2 mois · CGI · France',
      en: '02/2023 · 2 months · CGI · France',
    },
    teamSize: 2,
    technologies: ['HTML/CSS','NestJS', 'Angular', 'RabbitMQ', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    skills: ['Microservices', 'OAuth 2', 'Docker', 'PostgreSQL', 'MongoDB', 'Ecodesign'],
    image: 'img/projects/co2-bot.png',
  },
  {
    slug: 'polyconquest',
    title: { fr: 'Application web — PolyConquest', en: 'Web application — PolyConquest' },
    type: { fr: 'Projet industriel', en: 'Industrial project' },
    summary: {
      fr: 'Jeu sérieux d’algorithmique sous forme d’extension VS Code.',
      en: 'Serious algorithmics game shipped as a VS Code extension.',
    },
    description: {
      fr: 'Projet industriel de 4e année à Polytech. Jeu sérieux sous forme d’extension VS Code en ligne : les membres créent des problèmes algorithmiques que les joueurs résolvent via les entrées/sorties de leurs programmes (à la manière de CodinGame). Les programmes sont stockés dans les comptes GitHub des joueurs, dans le but d’aider les étudiants à apprendre l’algorithmique.',
      en: '4th-year industrial project at Polytech. Serious game delivered as an online VS Code extension: members create algorithmic problems that players solve through their programs’ inputs/outputs (in the spirit of CodinGame). Programs are stored in the players’ GitHub accounts to help students learn algorithms.',
    },
    context: {
      fr: '2022 · 2 mois · Polytech Montpellier · France',
      en: '2022 · 2 months · Polytech Montpellier · France',
    },
    teamSize: 3,
    technologies: ['Node.js', 'NestJS', 'Pixi.js', 'Docker', 'CI/CD'],
    skills: ['Microservices', 'Docker', 'Scrum'],
    image: 'img/projects/polyconquest.png',
  },
  {
    slug: 'numbers-and-letters',
    title: { fr: 'Jeu VR — Numbers & Letters', en: 'VR game — Numbers & Letters' },
    type: { fr: 'Stage', en: 'Internship' },
    summary: {
      fr: 'Jeu sérieux en réalité virtuelle, primé à la conférence GALA.',
      en: 'Serious virtual-reality game, awarded at the GALA conference.',
    },
    description: {
      fr: 'Projet réalisé durant mon stage à Ulster University (Irlande du Nord). Jeu sérieux VR pour améliorer le calcul mental et la formation de mots. J’ai conçu le gameplay et les animations de la partie « Letters ». Le jeu est disponible sur Steam et a remporté le premier prix de sa catégorie (« Student ») à la conférence GALA en Finlande.',
      en: 'Built during my internship at Ulster University (Northern Ireland). Serious VR game improving mental calculation and word building. I designed the gameplay and animation sequences for the "words" part. The game is available on Steam and won first prize in the "Student" category at the GALA conference in Finland.',
    },
    context: {
      fr: '2022 · 2 mois · Ulster University · Irlande du Nord',
      en: '2022 · 2 months · Ulster University · Northern Ireland',
    },
    teamSize: 12,
    technologies: ['Unity3D', 'C#', 'VR'],
    skills: ['VR', 'Unity3D', 'C#', 'Project management'],
    image: 'img/projects/numbers-and-letters.png',
    links: [
      {
        url: 'https://store.steampowered.com/app/869400/Numbers__Letters/',
        label: { fr: 'Voir sur Steam', en: 'View on Steam' },
      },
      {
        url: 'https://numbersandletters.games/credits',
        label: { fr: 'Crédits du jeu', en: 'Game credits' },
      },
    ],
    awards: [
      {
        label: {
          fr: '1er prix — catégorie « Student », GALA 2022 Serious Games Competition',
          en: '1st prize — "Student" category, GALA 2022 Serious Games Competition',
        },
        short: { fr: '1er prix — GALA 2022', en: '1st prize — GALA 2022' },
        url: 'https://conf.seriousgamessociety.org/gala-2022-serious-games-competition/',
      },
    ],
  },
  {
    slug: 'math-ar',
    title: { fr: 'Application mobile — Math AR', en: 'Mobile application — Math AR' },
    type: { fr: 'Stage', en: 'Internship' },
    summary: {
      fr: 'Jeu éducatif en réalité augmentée, primé par Niantic et Lenslist.',
      en: 'Educational augmented-reality game, awarded by Niantic and Lenslist.',
    },
    description: {
      fr: 'Application mobile utilisant la réalité augmentée et la géolocalisation pour créer des niveaux persistants aidant les enfants à progresser en mathématiques. Les joueurs attrapent les nombres autour d’eux pour compléter des équations ; les créateurs peuvent concevoir des niveaux en RA persistant. Primée dans un challenge international organisé par Niantic et Lenslist.',
      en: 'Mobile application using augmented reality and geolocation to create persistent levels helping children improve their maths skills. Players catch numbers around them to complete equations; creators can design persistent AR levels. Awarded in an international challenge organised by Niantic and Lenslist.',
    },
    context: {
      fr: '2022 · 2 mois · Ulster University · Irlande du Nord',
      en: '2022 · 2 months · Ulster University · Northern Ireland',
    },
    teamSize: 2,
    technologies: ['Unity3D', 'C#', 'AR'],
    skills: ['AR', 'Unity3D', 'C#', 'Niantic LightShip ARDK 2.0'],
    image: 'img/projects/math-ar.png',
    links: [
      {
        url: 'https://www.youtube.com/watch?v=yDg1uSqECLI',
        label: { fr: 'Vidéo de présentation', en: 'Presentation video' },
      },
      {
        url: 'https://lenslist.co/mathar',
        label: { fr: 'Description du projet', en: 'Project description' },
      },
    ],
    awards: [
      {
        label: {
          fr: 'Honorable Mention & prix — Lenslist × Niantic Lightship Templates Challenge',
          en: 'Honorable Mention & prize — Lenslist × Niantic Lightship Templates Challenge',
        },
        short: { fr: 'Prix — Niantic × Lenslist', en: 'Prize — Niantic × Lenslist' },
        url: 'https://blog.lenslist.co/2022/08/11/winners-announcement-templates-challenge-explore-the-real-world-metaverse/',
      },
    ],
  },
  {
    slug: 'findyourjob',
    title: { fr: 'Application web — TrouveTonJob', en: 'Web application — FindYourJob' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Plateforme de recommandation d’offres d’emploi en microservices.',
      en: 'Microservices-based job recommendation platform.',
    },
    description: {
      fr: 'Projet réalisé durant ma 5e année à Polytech Montpellier. Application web permettant de gérer des profils d’entreprise et de chercheur d’emploi avec leur CV. Les entreprises postent des offres recommandées à certains chercheurs via un algorithme. Architecture Spring Boot décomposée en microservices, avec une file de messages Kafka et stockage des recommandations abouties en base NoSQL.',
      en: 'Project carried out during my 5th year at Polytech Montpellier. Web application enabling users to manage company and job-seeker profiles with their CVs. Companies post job offers recommended to certain seekers through an algorithm. Spring Boot architecture split into microservices, with a Kafka message queue and successful recommendations stored in a NoSQL database.',
    },
    context: {
      fr: '2022 · 2 mois · Polytech Montpellier · France',
      en: '2022 · 2 months · Polytech Montpellier · France',
    },
    teamSize: 2,
    technologies: ['Java', 'Spring Boot', 'Angular', 'Kafka', 'Docker', 'CI/CD'],
    skills: ['Microservices', 'PostgreSQL', 'MongoDB', 'Scrum'],
    image: 'img/projects/findyourjob.png',
  },
  {
    slug: 'recipe-management-ios',
    title: {
      fr: 'Application mobile — Gestion de recette',
      en: 'Mobile application — Recipe management',
    },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Application iOS de gestion de fiches techniques et coûts de recettes.',
      en: 'iOS app for managing recipe technical sheets and costs.',
    },
    description: {
      fr: 'Projet de 4e année à Polytech : application mobile de gestion de fiches techniques représentant des recettes, réalisée en groupe de 2 sur un semestre. Permet de gérer tous les coûts d’une recette et de générer des ventes ou des étiquettes en PDF. Reprend le modèle du projet web associé, implémenté sur iOS avec le design pattern MVI.',
      en: '4th-year project at Polytech: mobile application for managing technical sheets representing recipes, built in a group of 2 over a semester. Manages all recipe costs and generates sales or labels in PDF format. Reuses the model from the related web project, implemented on iOS with the MVI design pattern.',
    },
    context: {
      fr: '2022 · 2 mois · Polytech Montpellier · France',
      en: '2022 · 2 months · Polytech Montpellier · France',
    },
    teamSize: 2,
    technologies: ['Swift', 'SwiftUI', 'Firebase', 'MVI'],
    skills: ['Swift', 'SwiftUI', 'Firebase', 'MVI', 'Scrum'],
    links: [
      {
        url: 'https://github.com/Sebastien-Gineste/ProjetAWI-IOS',
        label: { fr: 'Voir sur GitHub', en: 'View on GitHub' },
      },
    ],
  },
  {
    slug: 'recipe-management-web',
    title: {
      fr: 'Application web — Gestion de recette',
      en: 'Web application — Recipe management',
    },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Application web de gestion de fiches techniques et coûts de recettes.',
      en: 'Web application for managing recipe technical sheets and costs.',
    },
    description: {
      fr: 'Projet de 4e année à Polytech : application web de gestion de fiches techniques représentant des recettes, réalisée en groupe de 2 sur un semestre. Permet de gérer tous les coûts d’une recette et de générer des ventes ou des étiquettes en PDF.',
      en: '4th-year project at Polytech: web application for managing technical data sheets representing recipes, built in a group of 2 over a semester. Manages all recipe costs and generates sales or labels in PDF format.',
    },
    context: {
      fr: '2021 · 3 mois · Polytech Montpellier · France',
      en: '2021 · 3 months · Polytech Montpellier · France',
    },
    teamSize: 2,
    technologies: ['Angular', 'Firebase'],
    skills: ['HTML/CSS', 'Angular', 'Firebase', 'Bootstrap', 'Scrum'],
    image: 'img/projects/recipe-management-web.png',
  },
  {
    slug: 'recruitment-platform',
    title: {
      fr: 'Application — Plateforme de recrutement',
      en: 'Application — Recruitment platform',
    },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Plateforme de gestion d’offres d’emploi pour entreprises et candidats.',
      en: 'Job offer management platform for companies and job seekers.',
    },
    description: {
      fr: 'Projet de 4e année à Polytech permettant la gestion des offres d’emploi proposées par les entreprises pour les chercheurs d’emploi. Réalisé en Java avec JavaFX pour l’interface, en groupe de 3 sur un semestre.',
      en: '4th-year project at Polytech allowing the management of job offers proposed by companies for job seekers. Built in Java with JavaFX for the UI, in a group of 3 over a semester.',
    },
    context: {
      fr: '2021 · 3 mois · Polytech Montpellier · France',
      en: '2021 · 3 months · Polytech Montpellier · France',
    },
    teamSize: 3,
    technologies: ['Java', 'JavaFX', 'PostgreSQL'],
    skills: ['Java', 'JavaFX', 'Scrum', 'Design patterns'],
    image: 'img/projects/recruitment-platform.png',
  },
  {
    slug: 'exam-management',
    title: {
      fr: 'Application web — Gestion de soutenance',
      en: 'Web application — Exam management',
    },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Application web de gestion de soutenances de projet.',
      en: 'Web application for managing project defences.',
    },
    description: {
      fr: 'Projet de 3e année à Polytech : application web de gestion de soutenance de projet, réalisée en Vue.js pour le frontend et Node.js pour le backend, en groupe de 5 sur un semestre.',
      en: '3rd-year project at Polytech: web application for managing project defences, built with Vue.js for the frontend and Node.js for the backend, in a group of 5 over a semester.',
    },
    context: {
      fr: '2020 · 4 mois · Polytech Montpellier · France',
      en: '2020 · 4 months · Polytech Montpellier · France',
    },
    teamSize: 5,
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'HTML/CSS'],
    skills: ['HTML/CSS', 'Vue.js', 'Node.js', 'PostgreSQL', 'Scrum'],
    image: 'img/projects/exam-management.png',
  },
  {
    slug: 'escape-game-raspberry',
    title: {
      fr: 'Application Raspberry — Escape Game',
      en: 'Raspberry application — Escape Game',
    },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Escape game physique piloté par Raspberry Pi et capteurs.',
      en: 'Physical escape game driven by Raspberry Pi and sensors.',
    },
    description: {
      fr: 'Projet de 3e année à Polytech réalisé à 2. Création d’un escape game avec comme contrainte d’utiliser une Raspberry et plusieurs capteurs. Le jeu propose 6 énigmes avec l’utilisation de 9 capteurs.',
      en: '3rd-year project at Polytech completed with a teammate. Creation of an escape game with the constraint of using a Raspberry Pi and several sensors. The game features 6 puzzles using 9 sensors.',
    },
    context: {
      fr: '2020 · 4 mois · Polytech Montpellier · France',
      en: '2020 · 4 months · Polytech Montpellier · France',
    },
    teamSize: 2,
    technologies: ['Python', 'Raspberry Pi', 'Sensors'],
    skills: ['Python', 'Sensors'],
    image: 'img/projects/escape-game-raspberry.jpg',
  },
  {
    slug: 'ppe-management',
    title: {
      fr: 'Application web — Gestion EPIs',
      en: 'Web application — PPE management',
    },
    type: { fr: 'Stage', en: 'Internship' },
    summary: {
      fr: 'Application web de gestion d’équipements de protection individuelle.',
      en: 'Web application for managing personal protective equipment.',
    },
    description: {
      fr: 'Stage de 10 semaines au CREPS d’Auvergne-Rhône-Alpes. Conception et développement en autonomie d’une application web de gestion d’équipements de protection individuelle (EPI) pour un client.',
      en: '10-week internship at the CREPS of Auvergne-Rhône-Alpes. Autonomous design and development of a web application to manage personal protective equipment (PPE) for a client.',
    },
    context: {
      fr: '2020 · 3 mois · CREPS Auvergne-Rhône-Alpes · France',
      en: '2020 · 3 months · CREPS Auvergne-Rhône-Alpes · France',
    },
    teamSize: 1,
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    skills: ['HTML/CSS', 'JavaScript (jQuery, AJAX)', 'PHP', 'MySQL', 'MCD'],
    image: 'img/projects/ppe-management.png',
  },
  {
    slug: 'unity-game-jam',
    title: { fr: 'Jeu — Unity3D', en: 'Game — Unity3D' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Jeu réalisé en 30 h lors de la Code Game Jam 2020 (thème Cute & Creepy).',
      en: 'Game built in 30 hours at the 2020 Code Game Jam (Cute & Creepy theme).',
    },
    description: {
      fr: 'Projet réalisé durant la Code Game Jam 2020 à l’IUT de Montpellier (30 h en continu). Réalisé en groupe de 5, avec création des personnages, graphiques, code et musiques. Thème : Cute & Creepy, avec méthodes agiles.',
      en: 'Project completed during the 2020 Code Game Jam at the IUT of Montpellier (30 hours continuous). Built in a group of 5, creating characters, graphics, code and music. Theme: Cute & Creepy, using agile methods.',
    },
    context: {
      fr: '2020 · 30 h · IUT Montpellier-Sète · France',
      en: '2020 · 30 hours · IUT Montpellier · France',
    },
    teamSize: 5,
    technologies: ['Unity3D', 'C#'],
    skills: ['C#', 'Stress management', 'Team management', 'Unity3D'],
    image: 'img/projects/unity-game-jam.png',
  },
  {
    slug: 'triple-triad',
    title: { fr: 'Application web — Triple Triad', en: 'Web application — Triple Triad' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Jeu de cartes en ligne inspiré de Final Fantasy VIII.',
      en: 'Online card game inspired by Final Fantasy VIII.',
    },
    description: {
      fr: 'Projet de semestre 3 inspiré du célèbre jeu Final Fantasy VIII, réalisé en équipe de 4 avec la méthode agile et la structure MVC. Jeu de cartes à 2 joueurs avec possibilité de jouer en ligne et de créer des cartes via un générateur.',
      en: 'Semester 3 project inspired by the famous Final Fantasy VIII game, completed in a team of 4 with the agile method and MVC structure. Two-player card game with online play and a card generator.',
    },
    context: {
      fr: '2019 · 4 mois · IUT Montpellier-Sète · France',
      en: '2019 · 4 months · IUT Montpellier · France',
    },
    teamSize: 4,
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    skills: ['HTML/CSS', 'JavaScript (AJAX, jQuery)', 'PHP', 'MySQL'],
    image: 'img/projects/triple-triad.png',
  },
  {
    slug: 'conquest-project',
    title: { fr: 'Jeu — Projet Conquest', en: 'Game — Conquest Project' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Jeu console en Java avec IA MinMax.',
      en: 'Console game in Java with MinMax AI.',
    },
    description: {
      fr: 'Projet de semestre 3 : jeu en affichage console en Java avec 4 niveaux d’IA. Le dernier niveau utilise l’algorithme MinMax pour trouver le meilleur chemin possible. Ce projet m’a permis d’approfondir la récursivité en Java.',
      en: 'Semester 3 project: console game in Java with 4 AI levels. The last level uses the MinMax algorithm to find the best possible path. This project deepened my understanding of recursion in Java.',
    },
    context: {
      fr: '2020 · 1 mois · IUT Montpellier-Sète · France',
      en: '2020 · 1 month · IUT Montpellier · France',
    },
    teamSize: 5,
    technologies: ['Java', 'MinMax'],
    skills: ['Java', 'MinMax algorithm'],
    image: 'img/projects/conquest-project.png',
    links: [
      {
        url: 'https://github.com/IUTInfoMontProjetProgS3/ProjetConquest',
        label: { fr: 'Consignes du projet', en: 'Project instructions' },
      },
    ],
  },
  {
    slug: 'e-commerce',
    title: { fr: 'Site e-commerce', en: 'E-commerce website' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Site e-commerce simulé avec panier, commandes et comptes clients.',
      en: 'Simulated e-commerce site with cart, orders and customer accounts.',
    },
    description: {
      fr: 'Projet de semestre 3 réalisé en équipe de 2 avec la structure MVC et la méthode agile. Simule un site e-commerce de vente de produits avec un panier, des commandes, différents comptes clients et une barre de recherche.',
      en: 'Semester 3 project done in a team of 2 with MVC structure and agile method. Simulates a product sales e-commerce site with a shopping cart, orders, different customer accounts and a search bar.',
    },
    context: {
      fr: '2019 · 2 mois · IUT Montpellier-Sète · France',
      en: '2019 · 2 months · IUT Montpellier · France',
    },
    teamSize: 2,
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    skills: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL'],
    image: 'img/projects/e-commerce.png',
  },
  {
    slug: 'mixt-wordpress',
    title: { fr: 'WordPress — Projet MIXT', en: 'WordPress — MIXT Project' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Plateforme WordPress pour promouvoir les carrières féminines en informatique.',
      en: 'WordPress platform promoting women in computer science careers.',
    },
    description: {
      fr: 'Projet de semestre 2, créé avec WordPress en équipe de 5. Permet de créer divers événements pour encourager les carrières féminines en informatique, avec un forum, une gestion d’événements et d’articles, et 3 types de comptes (étudiant, professeur, admin).',
      en: 'Semester 2 project created with WordPress in a team of 5. Allows users to create various events to encourage female careers in computer science, with a forum, event and article management, and 3 account types (student, teacher, admin).',
    },
    context: {
      fr: '2019 · 3 mois · IUT Montpellier-Sète · France',
      en: '2019 · 3 months · IUT Montpellier · France',
    },
    teamSize: 5,
    technologies: ['WordPress'],
    skills: ['WordPress'],
    image: 'img/projects/mixt-wordpress.jpg',
  },
  {
    slug: 'dominion-game',
    title: { fr: 'Application — Jeu', en: 'Application — Game' },
    type: { fr: 'Projet', en: 'Project' },
    summary: {
      fr: 'Jeu de cartes au tour par tour en Java, inspiré de Dominion.',
      en: 'Turn-based card game in Java, inspired by Dominion.',
    },
    description: {
      fr: 'Projet de semestre 2 réalisé en équipe de 3 avec la méthode agile en 1 mois en Java. Jeu de cartes au tour par tour qui a consolidé mes connaissances en Java. Inspiré du jeu Dominion.',
      en: 'Semester 2 project completed in a team of 3 with the agile method in 1 month in Java. Turn-based card game that consolidated my Java knowledge. Inspired by the Dominion game.',
    },
    context: {
      fr: '2019 · 3 mois · IUT Montpellier-Sète · France',
      en: '2019 · 3 months · IUT Montpellier · France',
    },
    teamSize: 3,
    technologies: ['Java'],
    skills: ['Java'],
    image: 'img/projects/dominion-game.png',
    links: [
      {
        url: 'https://dominion.games/',
        label: { fr: 'Aperçu du jeu de référence', en: 'Reference game overview' },
      },
    ],
  },
];
