
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not found in backend/.env');
    process.exit(1);
  }
  
  console.log(`Testing connection to TiDB Cloud...`);
  const prisma = new PrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ SUCCESS: Connected to TiDB Cloud!');
    const count = await prisma.employee.count();
    console.log(`📊 Data Check: Found ${count} employees.`);
  } catch (err) {
    console.error('❌ FAILED: Could not connect to TiDB Cloud.', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
