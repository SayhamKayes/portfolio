const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const reviewsDir = path.join(__dirname, 'src', 'assets', 'reviews');
  const publicReviewsDir = path.join(__dirname, 'public', 'reviews');

  if (!fs.existsSync(publicReviewsDir)) {
    fs.mkdirSync(publicReviewsDir, { recursive: true });
  }

  for (let i = 1; i <= 17; i++) {
    const desktopFile = `Review_${i}.png`;

    if (fs.existsSync(path.join(reviewsDir, desktopFile))) {
      fs.copyFileSync(path.join(reviewsDir, desktopFile), path.join(publicReviewsDir, desktopFile));
    }
    
    // We will just use the desktop file as screenshotUrl.
    await prisma.testimonial.create({
      data: {
        name: `Screenshot Review ${i}`,
        designation: 'Fiverr',
        screenshotUrl: `/reviews/${desktopFile}`
      }
    });
  }

  console.log('Seeded testimonials');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
