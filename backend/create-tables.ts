import getPrismaClient from './config/db.js';

const prisma = getPrismaClient();

async function main() {
  console.log("Checking and creating tables manually via raw SQL...");
  
  try {
    // Create Template table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Template (
        id VARCHAR(191) PRIMARY KEY,
        templateId VARCHAR(191) NOT NULL UNIQUE,
        name VARCHAR(191) NOT NULL,
        description TEXT,
        groupName VARCHAR(191),
        templateType VARCHAR(191) NOT NULL,
        allowMultiplePerShift BOOLEAN DEFAULT FALSE,
        requiredOnPunchIn BOOLEAN DEFAULT FALSE,
        requiredOnPunchOut VARCHAR(191) DEFAULT 'Optional',
        needReportingPerson BOOLEAN DEFAULT FALSE,
        status VARCHAR(191) DEFAULT 'Active',
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)
      )
    `);
    console.log("✅ Template table ensured.");

    // Create TemplateQuestion table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS TemplateQuestion (
        id VARCHAR(191) PRIMARY KEY,
        templateId VARCHAR(191) NOT NULL,
        questionText TEXT NOT NULL,
        questionType VARCHAR(191) NOT NULL,
        options TEXT,
        required BOOLEAN DEFAULT FALSE,
        orderIndex INT DEFAULT 0,
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
        CONSTRAINT TemplateQuestion_templateId_fkey FOREIGN KEY (templateId) REFERENCES Template(templateId) ON DELETE CASCADE
      )
    `);
    console.log("✅ TemplateQuestion table ensured.");

  } catch (error) {
    console.error("❌ Error creating tables:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
