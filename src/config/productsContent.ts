// Products section content — Phase 3C. Category structure and every
// "typical products supplied" entry is transcribed verbatim from
// docs/INFORMATION_ARCHITECTURE.md §3 (the authoritative product taxonomy) —
// no invented subcategories or SKUs (docs/CONTENT_STRATEGY.md §10). Brand
// associations ("keyTechnologies") are limited to the explicit pairings in
// docs/INFORMATION_ARCHITECTURE.md §4.4 — categories with no explicit
// mapping there (Power, Accessories, Facility) simply have an empty list
// rather than an inferred one. Every brand name is product-category
// association only, never authorization/partnership language
// (docs/CONTENT_STRATEGY.md §7).
//
// The brief's 12-category list is reconciled against the approved 10-item
// nav taxonomy the same way Phase 3B reconciled Solutions: "Cloud &
// Virtualization" folds into Software & Licensing (cloud/virtualization
// tooling is licensing-adjacent, not a separate profile-stated category),
// "Data Centre" folds into Server, Storage & Data Infrastructure (already
// named for it), and "Audio Visual" folds into Collaboration, Display &
// Audio (already covers projectors/displays/audio per IA §3).

export type ProductCategoryDetail = {
  overview: string;
  typicalProducts: string[];
  useCases: string[];
  deploymentScenarios: string[];
  keyTechnologies: string[];
  commonConfigurations: string[];
};

export const productCategoryDetails: Record<string, ProductCategoryDetail> = {
  computing: {
    overview:
      "Laptops, desktops and end-user computing devices, sourced and supplied for offices, institutions and government departments.",
    typicalProducts: ["Laptops", "Desktops", "All-in-One PCs", "Workstations", "Mini PCs", "Tablets", "Monitors"],
    useCases: [
      "Equipping a new office or department with standard end-user devices",
      "Refreshing an aging desktop or laptop fleet",
      "Supplying workstations for design, engineering or data-intensive roles",
      "Standardizing devices across multiple locations",
    ],
    deploymentScenarios: [
      "Bulk device rollout for a new office, campus or department",
      "Phased replacement of an existing device fleet",
      "Mixed procurement of standard and high-performance devices for different user groups",
    ],
    keyTechnologies: ["HP", "Samsung"],
    commonConfigurations: [
      "Standard office laptops and desktops",
      "High-performance workstations for design or engineering use",
      "All-in-one PCs and mini PCs for space-constrained setups",
      "Bulk device procurement for institutional rollouts",
    ],
  },
  "servers-storage": {
    overview:
      "Servers and enterprise storage infrastructure, sourced and deployed to support the systems an organization depends on — from a single departmental server to a multi-node storage environment.",
    typicalProducts: [
      "Servers",
      "Enterprise Storage",
      "NAS Storage",
      "SAN",
      "SAN Switches",
      "Tape Libraries",
      "Tape Drives",
      "Backup Storage",
      "Portable Storage",
    ],
    useCases: [
      "Standing up or replacing core server infrastructure",
      "Expanding centralized storage as data volumes grow",
      "Consolidating backup and archival infrastructure",
      "Building storage for data center or server room deployments",
    ],
    deploymentScenarios: [
      "New data center or server room build-out",
      "Storage consolidation across multiple departments",
      "Backup infrastructure refresh for disaster-recovery readiness",
    ],
    keyTechnologies: ["HPE"],
    commonConfigurations: [
      "Rack servers for departmental or data center use",
      "Enterprise and NAS storage for centralized data",
      "SAN infrastructure for larger storage environments",
      "Backup and tape-based storage for archival needs",
    ],
  },
  networking: {
    overview:
      "Switching, routing, wireless networking and structured cabling, designed and supplied to connect the rest of an organization's technology environment.",
    typicalProducts: [
      "Layer 2 Switches",
      "Layer 3 Switches",
      "Routers",
      "Wireless Access Points",
      "Wireless Controllers",
      "Firewalls",
      "CAT6 Cabling",
      "Fiber Optic Cabling",
      "Patch Panels",
      "Patch Cords",
      "Transceivers",
      "Server Racks",
    ],
    useCases: [
      "Setting up networking for a new office or campus",
      "Expanding wired and wireless coverage across a facility",
      "Upgrading network security with firewall appliances",
      "Structuring cabling and rack infrastructure for a new site",
    ],
    deploymentScenarios: [
      "New office or campus network build-out",
      "Network security upgrade alongside existing infrastructure",
      "Multi-site connectivity standardization",
    ],
    keyTechnologies: ["HPE", "Digisol"],
    commonConfigurations: [
      "Core and access-layer switching",
      "Wireless networking for office or campus coverage",
      "Firewall and network security appliances",
      "Structured cabling and rack infrastructure for new sites",
    ],
  },
  "printing-imaging": {
    overview:
      "Printers, scanners and imaging devices, supplied for offices, institutions and document-intensive government workflows.",
    typicalProducts: [
      "Printers",
      "Multifunction Printers",
      "Dot Matrix Printers",
      "Scanners",
      "Barcode Scanners",
      "Plotters",
      "Toner",
      "Ink",
      "Consumables",
    ],
    useCases: [
      "Equipping departments with printing and scanning capability",
      "Supporting document-heavy institutional workflows",
      "Barcode scanning for inventory or attendance processes",
      "Large-format plotting for design and engineering output",
    ],
    deploymentScenarios: [
      "Departmental printer and scanner rollout",
      "Centralized multifunction device deployment across a facility",
      "Ongoing consumables supply alongside hardware",
    ],
    keyTechnologies: ["HP", "Canon", "Epson"],
    commonConfigurations: [
      "Departmental and multifunction printers",
      "High-volume scanning for document-heavy workflows",
      "Barcode scanning for inventory or attendance use",
      "Large-format plotting for design or engineering output",
    ],
  },
  "security-biometrics": {
    overview:
      "CCTV, video surveillance, biometric attendance and access control technology, sourced and supplied for institutional and government facilities.",
    typicalProducts: [
      "CCTV Cameras",
      "Video Surveillance",
      "Biometric Attendance",
      "Face Recognition",
      "RFID Attendance",
      "Access Control",
      "Aadhaar-enabled Biometric Devices",
    ],
    useCases: [
      "Adding or upgrading surveillance coverage for a facility",
      "Introducing biometric attendance for staff time tracking",
      "Controlling physical access to restricted areas",
      "Combining surveillance and access control in one deployment",
    ],
    deploymentScenarios: [
      "Facility-wide surveillance rollout",
      "Biometric attendance deployment across departments",
      "Access-control upgrade for sensitive or restricted zones",
    ],
    keyTechnologies: ["Matrix"],
    commonConfigurations: [
      "CCTV and video surveillance for facility coverage",
      "Biometric attendance for staff time tracking",
      "Access control for restricted areas",
      "Combined surveillance and access-control deployments",
    ],
  },
  "collaboration-display": {
    overview:
      "Video conferencing, interactive displays and audio systems, supplied for meeting rooms, classrooms and institutional halls.",
    typicalProducts: [
      "Video Conferencing",
      "Web Cameras",
      "Interactive Panels",
      "LED Displays",
      "Large Format Displays",
      "Video Walls",
      "Projectors",
      "Public Address Systems",
      "Microphones",
      "Amplifiers",
      "Speakers",
    ],
    useCases: [
      "Equipping meeting rooms for hybrid work and video conferencing",
      "Installing interactive panels for classrooms or training rooms",
      "Deploying large-format displays and video walls",
      "Setting up public address and audio systems for halls or campuses",
    ],
    deploymentScenarios: [
      "Meeting-room technology standardization across locations",
      "Classroom or training-room technology rollout",
      "Hall or auditorium audio-visual setup",
    ],
    keyTechnologies: ["Samsung"],
    commonConfigurations: [
      "Meeting-room video conferencing setups",
      "Interactive panels for classrooms or boardrooms",
      "Large-format displays and video walls",
      "Public address and audio systems for halls or campuses",
    ],
  },
  power: {
    overview:
      "UPS, power backup and voltage stabilization, sourced and supplied to protect servers and critical systems from power interruption.",
    typicalProducts: ["Online UPS", "Line Interactive UPS", "Power Backup", "Voltage Stabilizers"],
    useCases: [
      "Protecting servers and data center loads from power interruption",
      "Backing up departmental or desktop equipment",
      "Stabilizing voltage for facility-wide power quality",
    ],
    deploymentScenarios: [
      "Data center or server room power backup installation",
      "Facility-wide UPS deployment across departments",
      "Power infrastructure upgrade alongside a broader infrastructure project",
    ],
    keyTechnologies: [],
    commonConfigurations: [
      "Online UPS for critical server and data center loads",
      "Line-interactive UPS for departmental or desktop protection",
      "Voltage stabilizers for facility-wide power quality",
    ],
  },
  software: {
    overview:
      "Operating system, productivity, security and enterprise software licensing, supplied alongside the hardware it runs on.",
    typicalProducts: [
      "Operating Systems",
      "Productivity Software",
      "Server Software",
      "Design Software",
      "Architecture/Engineering Software",
      "PDF Tools",
      "Antivirus",
      "Security Software",
      "Enterprise Licensing",
    ],
    useCases: [
      "Licensing new devices with operating systems and productivity software",
      "Deploying server and enterprise software licensing",
      "Adding security and antivirus coverage across a device fleet",
      "Licensing design and engineering software for specialized teams",
    ],
    deploymentScenarios: [
      "Licensing bundled with a hardware rollout",
      "Fleet-wide security software deployment",
      "Enterprise licensing consolidation across departments",
    ],
    keyTechnologies: ["Microsoft", "Autodesk"],
    commonConfigurations: [
      "Operating system and productivity licensing for new devices",
      "Server and enterprise software licensing",
      "Security and antivirus licensing across a device fleet",
      "Design and engineering software licensing",
    ],
  },
  accessories: {
    overview:
      "Peripherals and components — mouse, keyboard, storage upgrades and printer consumables — supplied alongside larger hardware deployments or on their own.",
    typicalProducts: ["Mouse", "Keyboard", "SSD", "IT Accessories", "Printer Consumables"],
    useCases: [
      "Equipping devices with standard peripherals",
      "Upgrading existing devices with additional storage",
      "Ongoing consumables supply for printers already in use",
    ],
    deploymentScenarios: [
      "Peripheral bundling alongside a device rollout",
      "Standalone accessory or consumables order",
    ],
    keyTechnologies: [],
    commonConfigurations: [
      "Peripheral bundles (mouse, keyboard) for device rollouts",
      "SSD upgrades for existing device fleets",
      "Printer consumables for ongoing supply",
    ],
  },
  "facility-solutions": {
    overview:
      "Air conditioning, office and medical furniture — adjacent, non-IT facility needs supplied alongside technology deployments where required, not framed as core IT products.",
    typicalProducts: ["Air Conditioning", "Office Furniture", "Medical Furniture"],
    useCases: [
      "Fitting out server rooms with air conditioning",
      "Furnishing new or expanding office space",
      "Supplying furniture for healthcare or institutional facilities",
    ],
    deploymentScenarios: [
      "Server room climate-control setup alongside an infrastructure project",
      "Office furniture supply for a new or expanding site",
    ],
    keyTechnologies: [],
    commonConfigurations: [
      "Server room air conditioning",
      "Office furniture for new or expanding workspaces",
      "Medical furniture for healthcare and institutional facilities",
    ],
  },
};

export type ProductFAQ = { question: string; answer: string };

// Honest, non-committal answers throughout — no fabricated turnaround times
// or SLAs (docs/CONTENT_STRATEGY.md §14).
export const productFaqs: ProductFAQ[] = [
  {
    question: "Do you sell individual products, or only bulk orders?",
    answer:
      "We work with the requirement you bring us, whether that's a single item or a large institutional order.",
  },
  {
    question: "Can I get a specific brand or model?",
    answer:
      "We source across a broad, multi-brand portfolio and can work with brand or category preferences — share your requirement and we'll confirm availability.",
  },
  {
    question: "Do you provide installation and setup?",
    answer:
      "Installation and deployment support is available as part of our infrastructure and integration work — scope is confirmed per engagement.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery timelines depend on the product, quantity and sourcing involved — we confirm a timeline as part of the quotation.",
  },
  {
    question: "Do you support government procurement through GeM?",
    answer:
      "Yes — we are a registered seller on the Government e-Marketplace (GeM), supporting transparent procurement for government and public-sector buyers.",
  },
  {
    question: "Is pricing listed on the website?",
    answer:
      "No — pricing is confirmed through a quotation matched to your specific requirement. Request a quote and we'll respond with details.",
  },
  {
    question: "Do you offer support after delivery?",
    answer:
      "Technical support is available after deployment, not only at the point of sale — scope and terms are confirmed per engagement.",
  },
];
