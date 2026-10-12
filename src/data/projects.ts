export type Project = {
  slug: string;
  name: string;
  logo?: string;
  tagline: string;
  links: {
    live?: string;
    source?: string;
  };
  meta: {
    role: string;
    type: string;
    year: string;
    stack: string[];
  };
  brief: {
    problem: string;
    approach: string;
    outcome?: string;
  };
  built: {
    title: string;
    text: string;
  }[]; // 3-4 items
  workflow: {
    step: string;
    text: string;
  }[]; // 5-7 items, <= 6 words each
  failureChain?: {
    stage: string;
    consequence: string;
  }[];
  role?: string[];
  decisions?: string[];
  writeUp?: string[]; // long text, collapsed by default
  heroImage?: string;
  nextProject?: string;
  nextTitle?: string;
  nextLogo?: string;
};

export const projectData: Record<string, Project> = {
  'studflow': {
    slug: 'studflow',
    name: 'StudFlow',
    logo: '/logos/studflow.png',
    tagline: 'AI-powered learning platform grounded strictly in user-supplied documents',
    links: {
      live: 'https://studflow.webcris.dev/',
      source: undefined,
    },
    meta: {
      role: 'Full Stack AI Developer',
      type: 'AI Learning Workspace',
      year: '2025',
      stack: ['Next.js 15', 'FastAPI', 'PostgreSQL', 'LangChain', 'Docker', 'Tailwind CSS'],
    },
    brief: {
      problem: 'An answer can only be as reliable as the context supplied to the model. Generic models hallucinate when responding without strict grounding in student materials.',
      approach: 'Ingest PDFs and DOCX, extract machine-readable text, chunk into semantic units, retrieve relevant passages, and supply them as strict grounding context.',
      outcome: undefined, // Intentionally undefined (do not invent)
    },
    built: [
      {
        title: 'Document Extraction & Chunking',
        text: 'Converts uploaded learning material into structured units without destroying context.',
      },
      {
        title: 'Vector Retrieval & Grounding',
        text: 'Selects the exact relevant source passages to anchor generative model responses.',
      },
      {
        title: 'Full-Stack Study Workspace',
        text: 'Interactive summaries, flashcards, annotations, and chat interfaces built with Next.js.',
      },
      {
        title: 'Validation & Fallbacks',
        text: 'Monitors retrieval confidence and handles low-context queries without hallucinating.',
      },
    ],
    workflow: [
      { step: '01', text: 'Upload learning material' },
      { step: '02', text: 'Extract machine-readable text' },
      { step: '03', text: 'Section into searchable units' },
      { step: '04', text: 'Retrieve relevant source passages' },
      { step: '05', text: 'Ground model in context' },
      { step: '06', text: 'Generate verified response' },
      { step: '07', text: 'Validate output against sources' },
    ],
    failureChain: [
      { stage: 'Extraction failure', consequence: 'Missing content in pipeline' },
      { stage: 'Chunking failure', consequence: 'Broken semantic boundaries' },
      { stage: 'Retrieval failure', consequence: 'Wrong context supplied to LLM' },
      { stage: 'Grounding failure', consequence: 'Hallucinated, ungrounded answer' },
    ],
    role: undefined, // Intentionally undefined (do not invent)
    decisions: undefined, // Intentionally undefined (do not invent)
    writeUp: [
      "StudFlow is a study platform built around uploaded learning materials. Instead of generating generic responses from an AI model, the system processes the user's documents, retrieves relevant source material, and uses that context to produce responses grounded in what the user actually uploaded.",
      "Generic AI models respond primarily from pre-trained knowledge, which can lead to hallucinated or generalized answers. StudFlow fundamentally changes this by using the student's own uploaded materials as the strict context for every response, intentionally reducing unsupported claims and tying generation directly to the source.",
      // TODO: StudFlow-specific side note
      "Key engineering considerations included: reliable document extraction from raw PDF and DOCX formats without format corruption, sectioning long materials into semantic chunks, building high-precision retrieval mechanisms to avoid supplying irrelevant context, and fallback mechanisms when student queries fell outside the uploaded materials.",
      "The full architecture brings document ingestion, vector retrieval, and AI-assisted study workflows into one unified full-stack application, ensuring study aids remain traceable directly back to the student's source records."
    ],
    heroImage: '/studflow_preview.webp',
    nextProject: 'veldra',
    nextTitle: 'Veldra',
    nextLogo: '/logos/veldra.png',
  },
  'veldra': {
    slug: 'veldra',
    name: 'Veldra',
    logo: '/logos/veldra.png',
    tagline: 'Deterministic document verification and discrepancy detection for visa workflows',
    links: {
      live: 'https://veldra-sand.vercel.app/',
      source: undefined,
    },
    meta: {
      role: 'Full Stack AI Software Developer',
      type: 'Verification Platform',
      year: '2026',
      stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'LangChain', 'PostgreSQL'],
    },
    brief: {
      problem: 'Manual verification of student visa documents, sponsor cross-referencing, and discrepancy identification is error-prone and time-consuming across disparate records.',
      approach: 'Deterministic document entity extraction, multi-sponsor cross-referencing, and human-in-the-loop discrepancy reporting.',
      outcome: 'Centralizes document checking and surfaces discrepancies to staff before final review, accelerating verification while maintaining strict compliance.',
    },
    built: [
      {
        title: 'Sponsor Cross-Referencing',
        text: 'Validates relationships and financial capacity across supporting legal documents.',
      },
      {
        title: 'Deterministic Extraction',
        text: 'Extracts entities and verified claims without relying on generative hallucinations.',
      },
      {
        title: 'Mismatch Detection',
        text: 'Surfaces anomalies and discrepancies directly to review staff for verification.',
      },
      {
        title: 'Automated Document Drafting',
        text: 'Drafts explanation letters and discrepancy affidavits from verified audit points.',
      },
    ],
    workflow: [
      { step: '01', text: 'Upload application documents' },
      { step: '02', text: 'Extract entities deterministically' },
      { step: '03', text: 'Cross-reference sponsor records' },
      { step: '04', text: 'Flag dataset inconsistencies' },
      { step: '05', text: 'Generate discrepancy report' },
    ],
    failureChain: [
      { stage: 'Extraction error', consequence: 'Incomplete financial claims' },
      { stage: 'Cross-reference failure', consequence: 'Undetected sponsor discrepancies' },
      { stage: 'Verification failure', consequence: 'Non-compliant visa audit' },
    ],
    role: undefined, // Intentionally undefined (do not invent)
    decisions: undefined, // Intentionally undefined (do not invent)
    writeUp: [
      "Veldra is an operational document-verification system built to help staff review student visa documentation consistently across applicants, sponsors, and supporting records.",
      "Applicant records span multiple documents, sponsor information needs to remain consistent across financial and legal records, and discrepancies must be surfaced for review rather than manually hunted down.",
      "This project focuses on operational efficiency and deterministic verification, ensuring reliable data extraction and cross-referencing without relying on non-deterministic AI hallucinations for critical visa decisions.",
      "Key architectural modules include multi-sponsor cross-referencing across relatives and financial institutions, human-in-the-loop mismatch handling that flags discrepancies without automated rejection, and automated drafting of discrepancy affidavits and explanation letters."
    ],
    heroImage: '/veldra_preview.png',
    nextProject: 'chodams-web',
    nextTitle: 'CHoDaMS Web',
  },
  'chodams-web': {
    slug: 'chodams-web',
    name: 'CHoDaMS Web',
    logo: undefined,
    tagline: 'Centralized municipal housing registry, eligibility scoring, and GIS platform',
    links: {
      live: undefined,
      source: undefined,
    },
    meta: {
      role: 'Full Stack Developer',
      type: 'Municipal Housing Registry',
      year: '2024',
      stack: ['React', 'PHP', 'Laravel', 'MySQL', 'Leaflet GIS', 'CSS'],
    },
    brief: {
      problem: 'Beneficiary census information was fragmented across manual records, making living conditions and relocation priority difficult to evaluate consistently.',
      approach: 'Centralized database with RA 7279 deterministic eligibility scoring, administrative dashboards, and geospatial mapping.',
      outcome: 'Standardized eligibility evaluation for 6,100+ censused households, reducing repetitive manual computation and improving location visibility.',
    },
    built: [
      {
        title: 'Eligibility Scoring Engine',
        text: 'Automates RA 7279 beneficiary qualification scoring across income and housing categories.',
      },
      {
        title: 'Geospatial Mapping',
        text: 'Visualizes household coordinates, relocation project sites, and lot allocations.',
      },
      {
        title: 'Centralized Registry',
        text: 'Tracks displaced and vulnerable households across all city barangays in one ledger.',
      },
      {
        title: 'Allocation Management',
        text: 'Maintains occupancy tracking, lot awards, and resettlement records.',
      },
    ],
    workflow: [
      { step: '01', text: 'Receive field census data' },
      { step: '02', text: 'Register household beneficiaries' },
      { step: '03', text: 'Score RA 7279 eligibility' },
      { step: '04', text: 'Verify geographic coordinates' },
      { step: '05', text: 'Validate classification score' },
      { step: '06', text: 'Allocate housing resettlement lot' },
    ],
    failureChain: undefined,
    role: undefined, // Intentionally undefined (do not invent)
    decisions: undefined, // Intentionally undefined (do not invent)
    writeUp: [
      "CHoDaMS is a housing data system designed to organize household and beneficiary information, apply consistent eligibility rules, and provide housing personnel with a clearer view of applicant data, locations, and evaluation results.",
      "The CHoDaMS ecosystem relies on two integrated systems: Field Collection (CHoDaMS Mobile) captures household and census information offline in low-connectivity areas. This data synchronizes to the Data Layer, which powers the Office Review (CHoDaMS Web) where administrators handle evaluation, scoring, mapping, and management.",
      "The system utilizes deterministic scoring rules based on RA 7279 beneficiary criteria (income priority, property ownership, and classification) to provide repeatable, consistent evaluation of household applicants without relying on opaque models."
    ],
    heroImage: '/images/projects/chodams-web/chodams-portfolio-cover-v2.webp',
    nextProject: 'chodams-mobile',
    nextTitle: 'CHoDaMS Mobile',
  },
  'chodams-mobile': {
    slug: 'chodams-mobile',
    name: 'CHoDaMS Mobile',
    logo: undefined,
    tagline: 'Offline-first field census collection with GPS tagging and sync queues',
    links: {
      live: undefined,
      source: undefined,
    },
    meta: {
      role: 'Mobile Developer',
      type: 'Field Collection App',
      year: '2024',
      stack: ['Flutter', 'Dart', 'SQLite', 'REST APIs', 'GPS & Camera'],
    },
    brief: {
      problem: 'Field workers in remote or informal settlements lose internet connectivity, causing standard web surveys to crash or drop census submissions.',
      approach: 'Offline-first mobile application with local SQLite caching, camera photo capture, GPS coordinate logging, and sync queues.',
      outcome: 'Eliminated fieldwork data loss by ensuring seamless offline data collection and reliable background syncing when reconnected.',
    },
    built: [
      {
        title: 'Offline Field Collection',
        text: 'Records household surveys locally without requiring cellular connectivity.',
      },
      {
        title: 'GPS & Media Attachment',
        text: 'Tags survey records with hardware GPS coordinates and captured structure photos.',
      },
      {
        title: 'Synchronization Engine',
        text: 'Detects network availability and queues pending records for batch API sync.',
      },
      {
        title: 'Sync State Dashboard',
        text: 'Provides field surveyors real-time visibility into synced and unsynced records.',
      },
    ],
    workflow: [
      { step: '01', text: 'Capture survey data offline' },
      { step: '02', text: 'Log GPS and photos' },
      { step: '03', text: 'Store locally on device' },
      { step: '04', text: 'Detect stable network connection' },
      { step: '05', text: 'Sync to central database' },
    ],
    failureChain: undefined,
    role: undefined, // Intentionally undefined (do not invent)
    decisions: undefined, // Intentionally undefined (do not invent)
    writeUp: [
      "Companion mobile app for CHoDaMS designed to reliably collect field census information, including photos and geographic coordinates, in low-connectivity environments.",
      "Field workers operating in remote or informal settlements frequently lose internet connectivity. Standard web-based collection tools fail or lose data under these conditions, breaking the housing evaluation workflow and causing redundant fieldwork.",
      "The application implements an offline-first architecture with local SQLite persistence, GPS coordinate logging, camera photo capture, and an unsynced/synced transmission state engine for batch syncing when connectivity is restored."
    ],
    heroImage: '/images/projects/chodams-mobile/cover-dashboard-gps.webp',
    nextProject: 'studflow',
    nextTitle: 'StudFlow',
    nextLogo: '/logos/studflow.png',
  },
};
