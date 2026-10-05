export const projectData = {
  'veldra': {
    title: 'Veldra',
    subtitle: 'Smart Document Verification for Student Visa Workflows',
    role: 'Full Stack AI Software Developer',
    type: 'Document Verification',
    year: '2026',
    status: 'Production',
    heroImage: '/veldra_preview.png',
    overview: 'Veldra is an operational document-verification system built to help staff review student visa documentation consistently across applicants, sponsors, and supporting records.',
    problem: 'Manual verification of student visa documents, sponsor cross-referencing, and discrepancy identification is error-prone and time-consuming. Applicant records span multiple documents, sponsor information needs to remain consistent across financial and legal records, and discrepancies must be surfaced for review rather than manually hunted down.',
    workflow: [
      { step: '01', title: 'INPUT DOCUMENTS', desc: 'Bank Statements, Proof of Income, Affidavits' },
      { step: '02', title: 'VERIFY FIELDS', desc: 'Deterministic extraction of entities and claims' },
      { step: '03', title: 'CROSS-REFERENCE SPONSORS', desc: 'Match names, relationships, and financial capacity' },
      { step: '04', title: 'FLAG DIFFERENCES', desc: 'Highlight inconsistencies across the document set' },
      { step: '05', title: 'REVIEWER WORKFLOW', desc: 'Generate discrepancy reports or explanation letters' }
    ],
    engineering: [
      { id: '01', title: 'Sponsor Cross-Referencing', desc: 'Checks sponsor information (Parent, Guardian, Relative, Company, or Scholarship Provider) across related supporting documents.' },
      { id: '02', title: 'Mismatch Handling', desc: 'The system detects and flags inconsistencies for reviewer attention. It does not automatically reject applicants, preserving human-in-the-loop operational accuracy.' },
      { id: '03', title: 'Document Generation', desc: 'Automatically drafts Affidavit of Discrepancy and Explanation Letters based on flagged data points.' }
    ],
    screens: [
      { type: 'full', src: '/veldra_preview.png', caption: 'DOCUMENT VERIFICATION INTERFACE' }
    ],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'LangChain', 'PostgreSQL'],
    responsibilities: [
      { id: '01', task: 'Frontend application architecture' },
      { id: '02', task: 'Backend verification workflow' },
      { id: '03', task: 'Data modeling for multiple sponsors' },
      { id: '04', task: 'Deterministic validation logic' }
    ],
    outcome: 'The system centralizes document checking and makes discrepancies visible to staff before final review, accelerating the verification pipeline while maintaining strict compliance.',
    nextProject: 'studflow',
    nextTitle: 'StudFlow'
  },
  'studflow': {
    title: 'StudFlow',
    subtitle: 'AI-Powered, Document-Grounded Study Platform',
    role: 'Full Stack AI Developer',
    type: 'Document-Grounded Study Platform',
    year: '2025',
    coreSystem: 'Retrieval / AI',
    heroImage: '/studflow_preview.png',
    groundingFocus: {
      title: 'Source Grounding vs. Generic AI',
      desc: 'Generic AI models respond primarily from pre-trained knowledge, which can lead to hallucinated or generalized answers. StudFlow fundamentally changes this by using the student\'s own uploaded materials as the strict context for every response, intentionally reducing unsupported claims and tying generation directly to the source.'
    },
    overview: 'StudFlow is a study platform built around uploaded learning materials. Instead of generating generic responses from an AI model, the system processes the user\'s documents, retrieves relevant source material, and uses that context to produce responses grounded in what the user actually uploaded.',
    problem: 'An answer can only be as reliable as the context supplied to the model. A failure at any earlier stage can damage the final response: poor extraction leads to missing content, poor sectioning breaks meaning, poor retrieval supplies wrong context, and poor grounding results in a generic or unsupported answer.',
    workflow: [
      { step: '01', title: 'UPLOAD', desc: 'Learning material enters the system.' },
      { step: '02', title: 'EXTRACT', desc: 'Document content becomes machine-readable.' },
      { step: '03', title: 'SECTION', desc: 'Searchable units are generated.' },
      { step: '04', title: 'RETRIEVE', desc: 'Relevant source sections are selected.' },
      { step: '05', title: 'GROUND', desc: 'Selected content becomes AI context.' },
      { step: '06', title: 'GENERATE', desc: 'The system generates the source-grounded response.' },
      { step: '07', title: 'VALIDATE', desc: 'Ensures output aligns with provided context.' }
    ],
    engineering: [
      { id: '01', title: 'Document Extraction', desc: 'Converting uploaded learning material into usable text reliably.' },
      { id: '02', title: 'Chunking / Sectioning', desc: 'Breaking long documents into meaningful units without destroying useful context.' },
      { id: '03', title: 'Retrieval', desc: 'Selecting the right source content for the current request. Finding relevant material is critical because unrelated context can produce misleading output.' },
      { id: '04', title: 'Grounding', desc: 'Providing retrieved material to the model so the response remains tied to the uploaded source.' },
      { id: '05', title: 'Validation / Fallback', desc: 'Handling cases where retrieval quality or available source material is insufficient.' }
    ],
    screens: [
      { type: 'full', src: '/studflow_preview.png', caption: 'DOCUMENT-GROUNDED LEARNING WORKSPACE' }
    ],
    techGroups: [
      { group: 'FRONTEND', items: ['Next.js', 'React'] },
      { group: 'BACKEND', items: ['Node.js'] },
      { group: 'DATABASE', items: ['PostgreSQL'] },
      { group: 'AI / RETRIEVAL', items: ['RAG', 'LangChain'] },
      { group: 'INFRASTRUCTURE', items: ['Docker'] }
    ],
    responsibilities: [
      { id: '01', task: 'Frontend experience' },
      { id: '02', task: 'Backend application flow' },
      { id: '03', task: 'Data / authentication' },
      { id: '04', task: 'Document pipeline' },
      { id: '05', task: 'Retrieval and AI integration' }
    ],
    outcome: 'StudFlow brings document ingestion, retrieval and AI-assisted study workflows into one full-stack application, allowing learning outputs to be generated from the materials supplied by the user.',
    nextProject: 'chodams-web',
    nextTitle: 'CHoDaMS Web'
  },
  'chodams-web': {
    title: 'CHoDaMS Web',
    subtitle: 'City Housing Data Management System',
    role: 'Full Stack Developer',
    type: 'Government Data Platform',
    year: '2024',
    heroImage: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    overview: 'An award-winning platform for local government housing operations, featuring automated eligibility scoring and geospatial analytics.',
    problem: 'Manual housing beneficiary evaluation lacks standardization and geospatial context.',
    technologies: ['React', 'Geospatial Analytics', 'SQL', 'PHP', 'Laravel'],
    nextProject: 'chodams-mobile',
    nextTitle: 'CHoDaMS Mobile'
  },
  'chodams-mobile': {
    title: 'CHoDaMS Mobile',
    subtitle: 'Offline-first field census collection',
    role: 'Mobile Developer',
    type: 'Mobile App',
    year: '2024',
    heroImage: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    overview: 'Companion mobile app for CHoDaMS designed to collect reliable field information in low-connectivity areas.',
    problem: 'Field census workers often lose internet connectivity, breaking standard data collection tools.',
    technologies: ['Dart', 'Flutter', 'Local DB', 'REST APIs'],
    nextProject: 'veldra',
    nextTitle: 'Veldra'
  }
};
