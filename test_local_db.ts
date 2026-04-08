import { PrismaClient } from '@prisma/client';

async function main() {
  const url = 'mysql://root@localhost:3306/minehr_db';
  console.log(`Testing connection to ${url}...`);
  const prisma = new PrismaClient({
    datasources: { db: { url } }
  });
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('SUCCESS: Connected to local MySQL!');
    const employees = await prisma.employee.count();
    console.log(`Found ${employees} employees in local DB.`);
  } catch (err) {
    console.error('FAILED: could not connect to local MySQL.', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
