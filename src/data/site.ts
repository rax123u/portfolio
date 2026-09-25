/**
 * Site-wide facts.
 * Replace the empty contact fields with real URLs before launch.
 * Also update the canonical domain in index.html, public/robots.txt, and public/sitemap.xml.
 */

export const site = {
  name: "Muhammad Rayyan",
  title: "Full Stack Developer",
  secondary: "DevOps & Backend Engineer",
  positioning: "Full Stack Developer · Backend Engineer · DevOps · Creative Web Experiences",
  location: "Pakistan",
  phoneDisplay: "+92 318 952 4077",
  phoneHref: "tel:+923189524077",
  availability: "Available for freelance, remote and collaborative opportunities.",
  statement: "I build fast, scalable digital experiences — from interface to infrastructure.",
  aboutLead: "I build digital products where engineering meets interaction.",
  year: "2026",
  
  email: "rayyanmuhammad224@gmail.com",
 
  github: "https://github.com/rax123u",
 
  linkedin: "https://www.linkedin.com/in/muhammad1rayyan/?isSelfProfile=true",
} as const;

export const disciplines = [
  { number: "01", label: "Frontend" },
  { number: "02", label: "Backend" },
  { number: "03", label: "DevOps" },
  { number: "04", label: "APIs" },
  { number: "05", label: "E-commerce" },
  { number: "06", label: "CMS" },
  { number: "07", label: "Performance" },
  { number: "08", label: "Interactive experiences" },
] as const;

export const facts = [
  { label: "Based in", value: "Pakistan" },
  { label: "Practice", value: "Full Stack Developer" },
  { label: "Focus", value: "Backend Engineer" },
  { label: "Systems", value: "DevOps" },
] as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;
