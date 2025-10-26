import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const roles = [
  'Senior Software Engineer',
  'UX Designer',
  'DevOps Engineer',
  'Product Manager',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Scientist',
  'Tech Lead',
  'Engineering Manager',
];

const techTags = [
  'Node.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Docker',
  'Kubernetes',
  'AWS',
  'DevOps',
  'CI/CD',
  'Microservices',
  'GraphQL',
  'REST API',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Next.js',
  'Tailwind CSS',
  'Design Systems',
  'UI/UX',
  'Figma',
  'Product Management',
  'Agile',
  'Scrum',
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users with Faker
  const userCount = 10;
  const users = await Promise.all(
    Array.from({ length: userCount }, async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = faker.internet.username({ firstName, lastName }).toLowerCase();

      return prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          role: faker.helpers.arrayElement(roles),
          bio: faker.person.bio(),
          location: `${faker.location.city()}, ${faker.location.country()}`,
          joinedDate: faker.date.past({ years: 5 }),
          website: faker.internet.url(),
          github: username,
          twitter: username,
        },
      });
    })
  );

  console.log(`✅ Created ${users.length} users`);

  // Create posts with Faker
  const postsPerUser = 2;
  const posts = await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: postsPerUser }, () => {
        const tags = faker.helpers.arrayElements(techTags, { min: 2, max: 5 });
        
        return prisma.post.create({
          data: {
            title: faker.helpers.arrayElement([
              `Building ${faker.helpers.arrayElement(techTags)} Applications`,
              `Getting Started with ${faker.helpers.arrayElement(techTags)}`,
              `Advanced ${faker.helpers.arrayElement(techTags)} Techniques`,
              `${faker.helpers.arrayElement(techTags)} Best Practices`,
              `The Future of ${faker.helpers.arrayElement(techTags)}`,
              `Mastering ${faker.helpers.arrayElement(techTags)}`,
              `${faker.helpers.arrayElement(techTags)}: A Complete Guide`,
            ]),
            excerpt: faker.lorem.sentence({ min: 15, max: 25 }),
            content: faker.lorem.paragraphs({ min: 3, max: 6 }, '\n\n'),
            publishedDate: faker.date.recent({ days: 90 }),
            readTime: faker.number.int({ min: 3, max: 15 }),
            tags: JSON.stringify(tags),
            authorId: user.id,
          },
        });
      })
    )
  );

  console.log(`✅ Created ${posts.length} posts`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
