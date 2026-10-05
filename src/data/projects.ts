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
    type: 'Housing Data Management System',
    year: '2024',
    heroImage: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png',
    overview: 'CHoDaMS is a housing data system designed to organize household and beneficiary information, apply consistent eligibility rules, and provide housing personnel with a clearer view of applicant data, locations, and evaluation results.',
    problem: 'Beneficiary information is often spread across manual records, making household conditions difficult to evaluate consistently. Field data needs centralized review, and location information is critically important to housing decisions, but relocation records are traditionally difficult to manage without a centralized system.',
    workflow: [
      { step: '01', title: 'CENSUS', desc: 'Household data collected from the field.' },
      { step: '02', title: 'REGISTRATION', desc: 'Beneficiary information entered into the system.' },
      { step: '03', title: 'EVALUATION', desc: 'Eligibility scoring based on RA 7279 beneficiary criteria.' },
      { step: '04', title: 'GEOGRAPHIC REVIEW', desc: 'Spatial verification of household locations.' },
      { step: '05', title: 'VALIDATION', desc: 'Review of evaluation points and classification.' },
      { step: '06', title: 'ASSIGNMENT', desc: 'Housing or relocation site allocation.' }
    ],
    systemModules: [
      { id: '01', title: 'Eligibility Scoring', desc: 'The system utilizes deterministic scoring rules based on RA 7279 beneficiary criteria (income priority, property ownership, and classification) to provide repeatable, consistent evaluation of household applicants without relying on opaque models.' },
      { id: '02', title: 'Geospatial Review', desc: 'Interactive map view allowing administrative users to visualize beneficiary locations, project sites, and assignments.' },
      { id: '03', title: 'Beneficiary Registry', desc: 'Centralized database tracking displaced, homeless, and double-up households across barangays.' },
      { id: '04', title: 'Housing Records', desc: 'Management of project sites, lot allocations, and occupancy tracking.' }
    ],
    systemRelationship: {
      title: 'Web & Mobile Integration',
      desc: 'The CHoDaMS ecosystem relies on two integrated systems: Field Collection (CHoDaMS Mobile) captures household and census information offline in low-connectivity areas. This data synchronizes to the Data Layer, which powers the Office Review (CHoDaMS Web) where administrators handle evaluation, scoring, mapping, and management.'
    },
    screens: [
      { type: 'full', src: '/images/projects/chodams-web/chodams-portfolio-cover-v2.png', caption: 'CITY HOUSING DATA MANAGEMENT DASHBOARD' },
      { type: 'inset', src: '/chodams_web_preview.png', caption: 'ELIGIBILITY CRITERIA & ACCOMPLISHMENTS' }
    ],
    techGroups: [
      { group: 'FRONTEND', items: ['React', 'JavaScript', 'CSS'] },
      { group: 'BACKEND', items: ['PHP', 'Laravel'] },
      { group: 'DATABASE', items: ['SQL'] },
      { group: 'GEOSPATIAL', items: ['Geospatial Analytics'] }
    ],
    responsibilities: [
      { id: '01', task: 'Frontend dashboard development' },
      { id: '02', task: 'Backend PHP/Laravel architecture' },
      { id: '03', task: 'Database design for census data' },
      { id: '04', task: 'Geospatial mapping functionality' },
      { id: '05', task: 'Eligibility scoring logic' }
    ],
    outcome: 'The system centralizes housing records, reduces repetitive manual computation, standardizes eligibility evaluation using RA 7279 criteria, and improves visibility into household information for over 6,100 censused households.',
    recognition: {
      award: 'Top 5',
      category: 'Best Project'
    },
    nextProject: 'chodams-mobile',
    nextTitle: 'CHoDaMS Mobile'
  },
  'chodams-mobile': {
    title: 'CHoDaMS Mobile',
    subtitle: 'Offline-First Field Census Collection',
    role: 'Mobile Developer',
    type: 'Mobile App',
    year: '2024',
    heroImage: '/images/projects/chodams-mobile/cover-dashboard-gps.png',
    overview: 'Companion mobile app for CHoDaMS designed to reliably collect field census information, including photos and precise GPS coordinates, in low-connectivity environments.',
    problem: 'Field workers operating in remote or informal settlements frequently lose internet connectivity. Standard web-based collection tools fail or lose data under these conditions, breaking the housing evaluation workflow and causing redundant fieldwork.',
    workflow: [
      { step: '01', title: 'OFFLINE CAPTURE', desc: 'Workers record household information without a network connection.' },
      { step: '02', title: 'GPS & MEDIA', desc: 'System attaches exact coordinates and survey photos locally.' },
      { step: '03', title: 'LOCAL STORAGE', desc: 'Records are held securely on the device as Unsynced Data.' },
      { step: '04', title: 'CONNECTIVITY', desc: 'Device detects an active, stable network connection.' },
      { step: '05', title: 'SYNCHRONIZATION', desc: 'The app securely pushes pending surveys to the CHoDaMS Web data layer.' }
    ],
    systemModules: [
      { id: '01', title: 'Field Survey Capture', desc: 'Interface for collecting standardized household information, ensuring required evidence like resident and house photos are captured before saving.' },
      { id: '02', title: 'Offline Persistence', desc: 'Local database architecture that ensures survey progress is securely stored and never lost when networks drop unexpectedly.' },
      { id: '03', title: 'GPS Logging', desc: 'Hardware integration that attaches exact geospatial coordinates to every household record for administrative mapping.' },
      { id: '04', title: 'Synchronization State', desc: 'Dashboard interface managing Synced and Unsynced data states to provide field workers clear visibility into their data transmission progress.' }
    ],
    screens: [
      { type: 'full', src: '/images/projects/chodams-mobile/cover-dashboard-gps.png', caption: 'FIELD CENSUS DASHBOARD & GPS CAPTURE' },
      { type: 'inset', src: '/images/projects/chodams-mobile/login-cover.png', caption: 'VALIDATOR AUTHENTICATION' }
    ],
    techGroups: [
      { group: 'FRAMEWORK', items: ['Flutter', 'Dart'] },
      { group: 'STORAGE', items: ['Local DB'] },
      { group: 'INTEGRATION', items: ['REST APIs'] },
      { group: 'HARDWARE', items: ['GPS', 'Camera'] }
    ],
    responsibilities: [
      { id: '01', task: 'Mobile application architecture' },
      { id: '02', task: 'Offline-first data persistence' },
      { id: '03', task: 'Hardware integration (GPS & Camera)' },
      { id: '04', task: 'API synchronization logic' }
    ],
    outcome: 'Ensures field workers can reliably capture household census data in any environment, completely bridging the gap between disconnected field operations and the centralized CHoDaMS Web platform.',
    nextProject: 'veldra',
    nextTitle: 'Veldra'
  }
};
