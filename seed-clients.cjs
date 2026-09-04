const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultDominatedCountries = [
  'United States of America',
  'Canada',
  'United Kingdom',
  'Portugal',
  'France',
  'Spain',
  'Belgium',
  'Netherlands',
  'Germany',
  'Switzerland',
  'Czech Republic',
  'Poland',
  'Serbia',
  'South Africa',
  'South Korea',
  'Australia',
  'Bangladesh',
];

async function main() {
  for (const country of defaultDominatedCountries) {
    await prisma.globalClient.create({
      data: { country }
    });
  }
  console.log('Seeded global clients');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
