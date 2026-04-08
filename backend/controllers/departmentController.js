import {} from "express";
import prisma from '../config/prisma.js';
export const getDepartments = async (req, res) => {
    try {
        const items = await prisma.department.findMany({
            include: { _count: { select: { employees: true } } }
        });
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch departments" });
    }
};
export const createDepartment = async (req, res) => {
    try {
        const { departmentName, departmentCode, description, status } = req.body;
        const item = await prisma.department.create({
            data: { departmentName, departmentCode, description, status: status || 'Active' }
        });
        res.status(201).json(item);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create department" });
    }
};
export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentName, departmentCode, description, status } = req.body;
        const item = await prisma.department.update({
            where: { id: Number(id) },
            data: { departmentName, departmentCode, description, status }
        });
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update department" });
    }
};
export const bulkTransferDepartment = async (req, res) => {
    try {
        const { employeeIds, newDepartmentId, effectiveDate, remarks } = req.body;
        if (!employeeIds || !employeeIds.length || !newDepartmentId || !effectiveDate) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const date = new Date(effectiveDate);
        await prisma.$transaction(async (tx) => {
            for (const empId of employeeIds) {
                const emp = await tx.employee.findUnique({ where: { id: empId } });
                if (!emp)
                    continue;
                const oldVal = emp.departmentId || null;
                // Create history log
                await tx.employeeStructureHistory.create({
                    data: {
                        employeeId: empId,
                        transferType: 'Department',
                        oldValueId: oldVal,
                        newValueId: newDepartmentId,
                        effectiveDate: date,
                        remarks: remarks || null
                    }
                });
                // Update employee
                await tx.employee.update({
                    where: { id: empId },
                    data: { departmentId: newDepartmentId }
                });
            }
        });
        res.json({ message: "Successfully transferred employees" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to transfer employees" });
    }
};
//# sourceMappingURL=departmentController.js.map