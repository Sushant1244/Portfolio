
import { Project, Experience, Skill } from './types';

export const PORTFOLIO_DATA = {
  name: "Sumit Shah",
  role: "Senior Full Stack Engineer",
  location: "San Francisco, CA",
  bio: "Passionate developer specialized in building scalable high-performance web applications with React, Node.js, and Cloud architectures. I love bridging the gap between design and robust engineering.",
  email: "sushantsha985@gmail.com",
  phone: "9766325733",
  github: "https://github.com/Sushant1244",
  linkedin: "https://www.linkedin.com/in/sumit-shah-216569388/",
  twitter: "https://twitter.com"
};

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "QuantumSaaS Dashboard",
    description: "Enterprise-grade analytics platform for tracking real-time cloud infrastructure performance.",
    longDescription: "A massive multi-tenant SaaS platform featuring real-time WebSocket updates, complex D3.js visualizations, and a micro-frontend architecture. Built to handle millions of metrics per second with sub-second latency.",
    image: "https://picsum.photos/seed/dash/800/450",
    tags: ["React", "TypeScript", "D3.js", "Node.js", "Redis"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  },
  {
    id: "2",
    title: "EcoStream Mobile",
    description: "Sustainability tracking app with social integration and real-time carbon footprint calculation.",
    longDescription: "Mobile-first application leveraging React Native to help users track their environmental impact. Includes complex offline sync capabilities and integration with multiple IoT utility providers.",
    image: "https://picsum.photos/seed/eco/800/450",
    tags: ["React Native", "Firebase", "Node.js", "GraphQL"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  },
  {
    id: "3",
    title: "HyperCommerce",
    description: "High-performance e-commerce engine with AI-driven recommendations.",
    longDescription: "An headless commerce solution focusing on Core Web Vitals and SEO optimization. Implements custom caching strategies and an AI recommendation engine using Gemini for personalized shopping experiences.",
    image: "https://picsum.photos/seed/shop/800/450",
    tags: ["Next.js", "PostgreSQL", "Tailwind", "Gemini API"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true
  }
  ,
  {
    id: "4",
    title: "Electrocart E-commerce",
    description: "A full-featured online store platform focused on seamless shopping experiences and fast performance.",
    longDescription: "Electrocart is an e-commerce platform built with a modern React frontend and a scalable Node.js backend. It features product search, cart, checkout integrations, and an admin dashboard for inventory and order management.",
    image: "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=1200&q=80&auto=format&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/Sushant1244",
    liveUrl: "https://www.linkedin.com/in/sumit-shah-216569388/",
    featured: true
  },
  {
    id: "5",
    title: "Connunity",
    description: "A community platform for creators and shoppers to connect, share, and collaborate.",
    longDescription: "Connunity brings social commerce features together: user profiles, community posts, product recommendations, and direct messaging. Built with scalable APIs and real-time features for engagement.",
    image: "https://images.unsplash.com/photo-1520975698511-3f3f6b8a6f4d?w=1200&q=80&auto=format&fit=crop",
    tags: ["React", "Firebase", "Realtime"],
    githubUrl: "https://github.com/Sushant1244",
    liveUrl: "https://www.linkedin.com/in/sumit-shah-216569388/",
    featured: false
  },
  {
    id: "6",
    title: "Electrocart App",
    description: "Mobile companion app for Electrocart focused on quick ordering and personalized recommendations.",
    longDescription: "A performant mobile app built with React Native that mirrors Electrocart's storefront. Features push notifications, saved payment methods, and a streamlined checkout flow optimized for conversions.",
    image: "https://images.unsplash.com/photo-1520975680549-6b3b3f8b6a5d?w=1200&q=80&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Stripe"],
    githubUrl: "https://github.com/Sushant1244",
    liveUrl: "https://www.linkedin.com/in/sumit-shah-216569388/",
    featured: false
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "TechGiant Corp",
    role: "Senior Software Engineer",
    period: "2021 - Present",
    description: [
      "Leading the modernization of legacy financial systems to a modern React/Node stack.",
      "Mentoring a team of 12 junior and mid-level developers.",
      "Optimized build pipelines, reducing CI/CD time by 45%."
    ],
    skills: ["React", "TypeScript", "AWS", "Kubernetes"]
  },
  {
    company: "Innovate Labs",
    role: "Full Stack Developer",
    period: "2018 - 2021",
    description: [
      "Developed and launched 5 greenfield projects for Fortune 500 clients.",
      "Implemented a custom UI library used across all company products.",
      "Built high-traffic API services handling 10k+ requests per second."
    ],
    skills: ["Vue.js", "Node.js", "MongoDB", "Docker"]
  }
];

export const SKILLS: Skill[] = [
  { name: "React", category: "frontend", icon: "⚛️" },
  { name: "TypeScript", category: "frontend", icon: "📘" },
  { name: "Tailwind CSS", category: "frontend", icon: "🎨" },
  { name: "Next.js", category: "frontend", icon: "🚀" },
  { name: "Node.js", category: "backend", icon: "🟢" },
  { name: "PostgreSQL", category: "backend", icon: "🐘" },
  { name: "Redis", category: "backend", icon: "🔴" },
  { name: "GraphQL", category: "backend", icon: "📊" },
  { name: "AWS", category: "devops", icon: "☁️" },
  { name: "Docker", category: "devops", icon: "🐳" },
  { name: "GitHub Actions", category: "devops", icon: "🔄" },
  { name: "Figma", category: "tools", icon: "✒️" }
];
