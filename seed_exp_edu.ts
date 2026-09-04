import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const workItems = [
  {
    title: "Web Developer",
    company: "Dynamite IT Solution",
    duration: "Jan 2026 - Present",
    description: "Administered web server environments using WHM / cPanel with routine backups.\nResolved critical front-end bugs and optimized WordPress load times by 15%.",
  },
  {
    title: "Front End Developer",
    company: "Fiverr (Self-Employed)",
    duration: "Feb 2021 - Present",
    description: "Achieved Level 2 Seller status (top 20%) with 4.9/5.0 rating across 80+ projects.\nDelivered 50+ developed custom email signatures and 15+ WordPress landing pages.\nManaged international clients across 15+ countries (USA, Canada, EU).",
  },
];

const educationItems = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Daffodil International University",
    duration: "Jan 2023 - Dec 2026",
    description: "Major: Artificial Intelligence\nKey Coursework: OOP, Data Structures & Algorithms, DBMS, System Analysis & Design, Software Engineering.",
  },
];

async function main() {
  console.log('Seeding Experiences and Educations...');
  
  const existingExp = await prisma.experience.count();
  if (existingExp === 0) {
    for (const exp of workItems) {
      await prisma.experience.create({ data: exp });
    }
    console.log('Experiences seeded.');
  } else {
    console.log('Experiences already seeded.');
  }

  const existingEdu = await prisma.education.count();
  if (existingEdu === 0) {
    for (const edu of educationItems) {
      await prisma.education.create({ data: edu });
    }
    console.log('Educations seeded.');
  } else {
    console.log('Educations already seeded.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
