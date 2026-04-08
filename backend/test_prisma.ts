import getPrismaClient from "./config/db.js";

const prisma = getPrismaClient();

async function main() {
    try {
        console.log("Checking surveys...");
        const surveys = await prisma.survey.findMany();
        console.log("Surveys found:", surveys.length);
    } catch (error: any) {
        console.error("Error:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
