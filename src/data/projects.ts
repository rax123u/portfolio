export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  /**
   * PLACEHOLDER — set this to the live project URL when you have one.
   * An empty string renders the project without a fake link.
   */
  url: string;
};

export const projects: Project[] = [
  {
    id: "ethicwear",
    number: "01",
    name: "EthicWear",
    category: "E-commerce / Custom Website / Orbit CMS / Full Stack API handling / Frontend Engineering / Backend Engineering / CMS integration / Responsive UI / Advanced animations / SEO optimization",
    description:
      "A premium Pakistani fashion and beauty e-commerce experience built with a custom frontend and integrated with the Orbit CMS ecosystem. The architecture respects Orbit's static custom-site requirements.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Orbit Public API",
      "CMS integration",
      "Responsive UI",
      "Advanced animations",
    ],
    image: "/projects/ethicwear.png",
    imageAlt:
      "Editorial cover for EthicWear, a terracotta and ink composition for a fashion e-commerce site",
    url: "https://ethicwear.zypherorbit.name/",
  },
  {
    id: "apex-college",
    number: "02",
    name: "Apex College Website",
    category: "Education / Web Platform / Frontend Engineering / Full Stack API handling",
    description:
      "A redesigned modern college website focused on responsive UX, modern visual design, API integration, permissions-aware frontend architecture, and polished interactions. This was frontend engineering and redesign work — the backend was not rebuilt.",
    technologies: [
      "React",
      "Ant Design",
      "API integration",
      "Context",
      "Permission handling",
      "Responsive design",
      "GSAP / Lenis",
      "Laravel",
      "Laravel Sanctum",
      "MySQL",
    ],
    image: "/projects/apex.png",
    imageAlt:
      "Editorial cover for the Apex College website, a deep teal grid composition",
    url: "https://apex-work.vercel.app/",
  },
  {
    id: "real-estate",
    number: "03",
    name: "Real Estate Platform",
    category: "Real Estate / Full Stack / Full Stack API handling / Frontend Engineering  /Backend engineering / Responsive UI / Advanced animations ",
    description:
      "A full-stack real estate platform with property listings, authentication, API integration, database architecture, and a modern responsive interface.",
    technologies: [
      "Laravel",
      "Laravel Sanctum",
      "MySQL",
      "React",
      "REST API",
      "Authentication",
    ],
    image: "/projects/aurelius.png",
    imageAlt:
      "Editorial cover for a real estate platform, an architectural elevation on stone",
    url: "https://realestate-rouge-two.vercel.app/",
  },
  {
    id: "aurix",
    number: "04",
    name: "AURIX",
    category: "E-commerce / React / Full Stack API handling / Frontend Engineering  / Responsive UI / Advanced animations ",
    description:
      "A modern Apple-inspired digital retail experience with product browsing, state management, API-driven product data, responsive UI, and polished interactions.",
    technologies: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "Framer Motion",
      "DummyJSON API",
    ],
    image: "/projects/aurix.png",
    imageAlt: "Editorial cover for AURIX, a dark product-grid composition",
    url: "https://digital-retail-store.vercel.app/",
  },
 
  
  {
    id: "win-global",
    number: "05",
    name: "WIN Global Impact Club",
    category: "Organization / Web Development /Frontend Engineering / Responsive UI / Advanced animations ",
    description:
      "A modern responsive website created for WIN Global Impact Club with a strong visual identity and responsive experience.",
    technologies: ["Next js", "Vite", "Responsive UI", "Modern CSS"],
    image: "/projects/winglobal.png",
    imageAlt:
      "Editorial cover for WIN Global Impact Club, overlapping circle marks on forest green",
    url: "https://winglobalbusiness.com/",
  },
  {
    id: "spinalis",
    number: "06",
    name: "Spinalis Wellness / AlignWell",
    category: "Healthcare / CMS / Full Stack Integration /Frontend Engineering / Responsive UI / Advanced animations / English and Urdu language support",
    description:
      "A bilingual wellness platform with CMS integration, content management, testimonials, gallery functionality, SEO considerations and responsive frontend architecture.",
    technologies: [
      "React",
      "TypeScript",
      "Express",
      "Prisma",
      "SQLite",
      "CMS",
      "Responsive UI",
    ],
    image: "/projects/spinal.png",
    imageAlt:
      "Editorial cover for Spinalis Wellness, a calm arc on a sage field",
    url: "https://spinaliswellness.com/",
  },
];
