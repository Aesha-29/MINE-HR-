import { PrismaClient } from "@prisma/client";
const prismaOptions = {
    log: ["error", "warn"],
};
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}
const prisma = new PrismaClient({
    ...prismaOptions,
    datasources: {
        db: {
            url: DATABASE_URL,
        },
    },
});
export default prisma;
//# sourceMappingURL=prisma.js.map