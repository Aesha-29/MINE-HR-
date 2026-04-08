import prisma from "../config/prisma.js";
export const getFinances = async (req, res) => {
    try {
        const finances = await prisma.finance.findMany();
        res.status(200).json(finances);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const createFinance = async (req, res) => {
    try {
        const data = req.body;
        const finance = await prisma.finance.create({
            data,
        });
        res.status(201).json(finance);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const getFinanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const finance = await prisma.finance.findFirst({
            where: { employeeId: id },
        });
        if (!finance) {
            res.status(404).json({ message: "Finance record not found" });
            return;
        }
        res.status(200).json(finance);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
//# sourceMappingURL=financeController.js.map