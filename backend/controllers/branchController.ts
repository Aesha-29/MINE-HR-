import { type Request, type Response } from "express";
import prisma from '../config/prisma.js';

export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await prisma.branch.findMany({
            include: { _count: { select: { employees: true } } }
        });
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch branches" });
    }
};

export const createBranch = async (req: Request, res: Response) => {
    try {
        const { branchName, branchCode, address, city, state, status } = req.body;
        const branch = await prisma.branch.create({
            data: { branchName, branchCode, address, city, state, status: status || 'Active' }
        });
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ error: "Failed to create branch" });
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { branchName, branchCode, address, city, state, status } = req.body;
        const branch = await prisma.branch.update({
            where: { id: Number(id as string) },
            data: { branchName, branchCode, address, city, state, status }
        });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: "Failed to update branch" });
    }
};

export const bulkTransferBranch = async (req: Request, res: Response) => {
    try {
        const { employeeIds, newBranchId, effectiveDate, remarks } = req.body;
        if (!employeeIds || !employeeIds.length || !newBranchId || !effectiveDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const date = new Date(effectiveDate);

        await prisma.$transaction(async (tx) => {
            for (const empId of employeeIds) {
                const emp = await tx.employee.findUnique({ where: { id: empId } });
                if (!emp) continue;

                const oldVal = emp.branchId || null;

                // Create history log
                await tx.employeeStructureHistory.create({
                    data: {
                        employeeId: empId,
                        transferType: 'Branch',
                        oldValueId: oldVal,
                        newValueId: newBranchId,
                        effectiveDate: date,
                        remarks: remarks || null
                    }
                });

                // Update employee
                await tx.employee.update({
                    where: { id: empId },
                    data: { branchId: newBranchId }
                });
            }
        });

        res.json({ message: "Successfully transferred employees" });
    } catch (error) {
        res.status(500).json({ error: "Failed to transfer employees" });
    }
};
