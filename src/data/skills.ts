export type SkillGroup = {
  id: string;
  number: string;
  label: string;
  summary: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    number: "01",
    label: "Frontend",
    summary: "Interfaces, state, and interaction",
    items: [

          "React",
          "JavaScript",
          "TypeScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Redux Toolkit",
          "Next.js",
          "Vite",
          "Framer Motion",
          "GSAP",
          "Lenis",
          "Three.js",
          "WebGL",
          "Chart.js",



    
      
    ],
  },
  {
    id: "backend",
    number: "02",
    label: "Backend",
    summary: "APIs, auth, and data",
    items: [
      
        "Node.js",
        "Express.js",
        "Laravel",
        "REST APIs",
        "Authentication & Authorization",
        "JWT",
        "OAuth 2.0",
        "Prisma ORM",
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "CORS",
        "API Security",
        "Database Design",
        "CRUD Operations",
        "Middleware",
        "Server-Side Development"
      ]

  },
  {
    id: "devops",
    number: "03",
    label: "DevOps",
    summary: "Shipping and server setup",
    items: [
      
        "Git",
        "GitHub",
        "GitLab",
        "Docker",
        "CI/CD",
        "Nginx",
        "Kubernetes",
        "GitHub Actions",
        "GitLab CI/CD",
        "Linux",
        "Server Deployment",
        "Environment Configuration",
        "Deployment Automation",
        "Vercel",
        "Railway"
      
    ],
  },
];

/** Kinetic typography — technologies called out as a moving line. */
export const kineticStack = [
  
    "Frontend Architecture",
    "React.js",
    "TypeScript",
    "Backend Development",
    "Node.js",
    "Laravel",
    "REST APIs",
    "Database Design",
    "MySQL",
    "Prisma ORM",
    "State Management",
    "Redux Toolkit",
    "UI Engineering",
    "Tailwind CSS",
    "GSAP & Lenis",
    "Git & GitHub",
    "Linux"
  

] as const;


export const services = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Responsive, high-performance interfaces built with React, TypeScript, Tailwind CSS and modern UI patterns.",
  },
  {
    number: "02",
    title: "Full-Stack Development",
    description:
      "Complete web applications connecting polished frontends with reliable backends, APIs and databases.",
  },
  {
    number: "03",
    title: "Backend Engineering",
    description:
      "Scalable REST APIs, authentication, database architecture, server-side logic and third-party integrations.",
  },
  {
    number: "04",
    title: "DevOps & Deployment",
    description:
      "Production-ready deployments using Git, Linux, Vercel, Railway, environment configuration and deployment workflows.",
  },
  {
    number: "05",
    title: "Interactive Web Experiences",
    description:
      "Engaging digital experiences with smooth animations, micro-interactions, immersive transitions and thoughtful motion design.",
  },



] as const;

export const practice = [
  "Responsive web development",
  "Performance optimization",
  "CMS integration",
  "E-commerce development",
  "API-driven applications",
  "Modern UI/UX",
  "Animation and interaction design",
] as const;
