import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProjects = [
  {
    title: "Expensee — Offline Expense Tracker App",
    description: "A privacy-first, mobile expense tracker featuring a modern glassmorphism UI, intelligent voice input, and interactive charts.",
    technologies: "React, TypeScript, Tailwind CSS, Capacitor (Android SDK), Bun",
    imageUrl: "/projects_preview_1.jpg",
  },
  {
    title: "SignCrafter — Email Signature Generator",
    description: "An automated SaaS platform for generating sleek, responsive email signatures that work seamlessly across all major email clients.",
    technologies: "React (Vite), Vanilla CSS, Zustand, Capacitor (Android SDK), Cloudinary",
    imageUrl: "/projects_preview_2.jpg",
  },
  {
    title: "AI-Powered Fish Detection App",
    description: "Automated fish identification for local farmers using CNN with TensorFlow — high accuracy detection in varied aquatic conditions.",
    technologies: "Python, Streamlit, TensorFlow, CNN",
    imageUrl: "/projects_preview_3.jpg",
  },
  {
    title: "CodeWriters — Blog Website",
    description: "Dynamic blog with secure user authentication, post CRUD and commenting. RESTful API backend with Django and responsive React frontend.",
    technologies: "Django, React.js, SQLite, REST API",
    imageUrl: "/projects_preview_4.jpg",
  },
  {
    title: "TaskCrafter — Utility Application",
    description: "A modern, comprehensive web utility application designed to streamline productivity and manage daily tasks efficiently.",
    technologies: "TypeScript, React.js, Tailwind CSS, Vite, shadcn/ui",
    imageUrl: "/projects_preview_5.jpg",
  },
];

const initialSkills = [
  { name: "JavaScript", category: "Language", level: 90 },
  { name: "TypeScript", category: "Language", level: 85 },
  { name: "Python", category: "Language", level: 80 },
  { name: "React", category: "Frontend", level: 95 },
  { name: "Tailwind CSS", category: "Frontend", level: 90 },
  { name: "Next.js", category: "Frontend", level: 80 },
  { name: "Node.js", category: "Backend", level: 85 },
  { name: "Django", category: "Backend", level: 75 },
  { name: "Prisma", category: "Backend", level: 80 },
  { name: "TensorFlow", category: "AI / ML", level: 70 },
  { name: "Docker", category: "DevOps", level: 65 },
];

async function main() {
  console.log('Start seeding...');
  
  for (const p of initialProjects) {
    const project = await prisma.portfolioItem.create({
      data: p,
    });
    console.log(`Created project with id: ${project.id}`);
  }

  for (const s of initialSkills) {
    const skill = await prisma.skill.create({
      data: s,
    });
    console.log(`Created skill with id: ${skill.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
