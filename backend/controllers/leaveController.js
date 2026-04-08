import prisma from "../config/prisma.js";
const db = prisma;
// ─────────────────────────────────────────────
// LEAVE TYPES
// ─────────────────────────────────────────────
export const getLeaveTypes = async (_req, res) => {
    try {
        const types = await db.leaveType.findMany({ orderBy: { name: "asc" } });
        res.json(types);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const createLeaveType = async (req, res) => {
    try {
        const body = { ...req.body };
        if (body.leaveCode === "")
            body.leaveCode = null;
        const t = await db.leaveType.create({ data: body });
        res.status(201).json(t);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const updateLeaveType = async (req, res) => {
    try {
        const body = { ...req.body };
        if (body.leaveCode === "")
            body.leaveCode = null;
        const t = await db.leaveType.update({ where: { id: parseInt(req.params.id) }, data: body });
        res.json(t);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const deleteLeaveType = async (req, res) => {
    try {
        await db.leaveType.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE POLICY
// ─────────────────────────────────────────────
export const getLeavePolicies = async (_req, res) => {
    try {
        const policies = await db.leavePolicy.findMany({ include: { leaveType: true } });
        res.json(policies);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const upsertLeavePolicy = async (req, res) => {
    try {
        const { leaveTypeId, ...rest } = req.body;
        const policy = await db.leavePolicy.upsert({
            where: { leaveTypeId: parseInt(leaveTypeId) },
            create: { leaveTypeId: parseInt(leaveTypeId), ...rest },
            update: rest
        });
        res.json(policy);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE BALANCE
// ─────────────────────────────────────────────
export const getAllLeaveBalances = async (req, res) => {
    try {
        const year = parseInt(req.query.year || String(new Date().getFullYear()));
        const balances = await db.leaveBalance.findMany({
            where: { year },
            include: { employee: true, leaveType: true },
            orderBy: [{ employee: { firstName: "asc" } }]
        });
        res.json(balances);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const getLeaveBalances = async (req, res) => {
    const { employeeId } = req.params;
    const empId = parseInt(employeeId);
    const currentYear = new Date().getFullYear();
    try {
        let balances = await db.leaveBalance.findMany({
            where: { employeeId: empId, year: currentYear },
            include: { leaveType: true }
        });
        if (balances.length === 0) {
            const types = await db.leaveType.findMany({ where: { status: "Active" } });
            const newBalances = types.map((t) => ({
                employeeId: empId, leaveTypeId: t.id,
                year: currentYear, total: t.defaultDays, used: 0, pending: 0
            }));
            if (newBalances.length > 0) {
                await db.leaveBalance.createMany({ data: newBalances, skipDuplicates: true });
                balances = await db.leaveBalance.findMany({
                    where: { employeeId: empId, year: currentYear },
                    include: { leaveType: true }
                });
            }
        }
        res.json(balances);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const adjustLeaveBalance = async (req, res) => {
    try {
        const { employeeId, leaveTypeId, year, adjustment, type } = req.body;
        const y = parseInt(year) || new Date().getFullYear();
        const existing = await db.leaveBalance.findUnique({
            where: { employeeId_leaveTypeId_year: { employeeId: parseInt(employeeId), leaveTypeId: parseInt(leaveTypeId), year: y } }
        });
        if (!existing) {
            res.status(404).json({ error: "Balance not found" });
            return;
        }
        let data = {};
        if (type === "add")
            data = { total: { increment: parseFloat(adjustment) } };
        else if (type === "deduct")
            data = { used: { increment: parseFloat(adjustment) } };
        else if (type === "reset")
            data = { used: 0, pending: 0 };
        const updated = await db.leaveBalance.update({ where: { id: existing.id }, data });
        res.json(updated);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const initBalancesForAll = async (req, res) => {
    try {
        const year = parseInt(req.body.year || String(new Date().getFullYear()));
        const [employees, types] = await Promise.all([
            db.employee.findMany({ where: { status: "Active" }, select: { id: true } }),
            db.leaveType.findMany({ where: { status: "Active" } })
        ]);
        let created = 0;
        for (const emp of employees) {
            for (const t of types) {
                try {
                    await db.leaveBalance.create({
                        data: { employeeId: emp.id, leaveTypeId: t.id, year, total: t.defaultDays, used: 0, pending: 0 }
                    });
                    created++;
                }
                catch { /* skip duplicates */ }
            }
        }
        res.json({ message: `Initialized ${created} balance records for year ${year}` });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE REQUESTS
// ─────────────────────────────────────────────
export const submitLeaveRequest = async (req, res) => {
    const { employeeId, leaveTypeId, startDate, endDate, days, reason, isHalfDay } = req.body;
    const year = new Date(startDate).getFullYear();
    try {
        const balance = await db.leaveBalance.findUnique({
            where: { employeeId_leaveTypeId_year: { employeeId: parseInt(employeeId), leaveTypeId: parseInt(leaveTypeId), year } }
        });
        if (!balance) {
            res.status(404).json({ error: "Leave balance not initialized for this employee/type" });
            return;
        }
        const available = balance.total - balance.used - balance.pending;
        if (available < parseFloat(days)) {
            res.status(400).json({ error: `Insufficient balance. Available: ${available}` });
            return;
        }
        const request = await db.leaveRequest.create({
            data: {
                employeeId: parseInt(employeeId), leaveTypeId: parseInt(leaveTypeId),
                startDate: new Date(startDate), endDate: new Date(endDate),
                days: parseFloat(days), reason,
                reviewDocs: isHalfDay ? "halfDay" : null
            }
        });
        await db.leaveBalance.update({ where: { id: balance.id }, data: { pending: { increment: parseFloat(days) } } });
        res.status(201).json(request);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const getLeaveRequests = async (req, res) => {
    try {
        const { status, employeeId } = req.query;
        const where = {};
        if (status && status !== "All")
            where.status = status;
        if (employeeId)
            where.employeeId = parseInt(employeeId);
        const requests = await db.leaveRequest.findMany({
            where, include: { employee: true, leaveType: true }, orderBy: { createdAt: "desc" }
        });
        res.json(requests);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const reviewLeaveRequest = async (req, res) => {
    const { id } = req.params;
    const requestId = parseInt(id);
    const { status, remarks } = req.body;
    try {
        const request = await db.leaveRequest.findUnique({ where: { id: requestId } });
        if (!request) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        if (request.status !== "Pending") {
            res.status(400).json({ error: `Already ${request.status}` });
            return;
        }
        const year = request.startDate.getFullYear();
        const updated = await db.leaveRequest.update({
            where: { id: requestId },
            data: { status, reviewDate: new Date(), reviewDocs: remarks || request.reviewDocs }
        });
        if (status === "Approved") {
            await db.leaveBalance.updateMany({
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
                data: { pending: { decrement: request.days }, used: { increment: request.days } }
            });
        }
        else if (status === "Rejected" || status === "Cancelled") {
            await db.leaveBalance.updateMany({
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId, year },
                data: { pending: { decrement: request.days } }
            });
        }
        res.json(updated);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const cancelLeaveRequest = async (req, res) => {
    try {
        const request = await db.leaveRequest.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!request) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        const updated = await db.leaveRequest.update({
            where: { id: parseInt(req.params.id) }, data: { status: "Cancelled" }
        });
        if (request.status === "Pending") {
            await db.leaveBalance.updateMany({
                where: { employeeId: request.employeeId, leaveTypeId: request.leaveTypeId },
                data: { pending: { decrement: request.days } }
            });
        }
        res.json(updated);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE CALENDAR
// ─────────────────────────────────────────────
export const getLeaveCalendar = async (req, res) => {
    try {
        const month = parseInt(req.query.month || String(new Date().getMonth() + 1));
        const year = parseInt(req.query.year || String(new Date().getFullYear()));
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59);
        const leaves = await db.leaveRequest.findMany({
            where: { status: "Approved", startDate: { lte: end }, endDate: { gte: start } },
            include: { employee: true, leaveType: true }
        });
        res.json(leaves);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE REPORTS
// ─────────────────────────────────────────────
export const getLeaveReport = async (req, res) => {
    try {
        const year = parseInt(req.query.year || String(new Date().getFullYear()));
        const [balances, requests, types] = await Promise.all([
            db.leaveBalance.findMany({ where: { year }, include: { employee: true, leaveType: true } }),
            db.leaveRequest.findMany({
                where: { startDate: { gte: new Date(year, 0, 1) }, endDate: { lte: new Date(year, 11, 31) } },
                include: { employee: true, leaveType: true }
            }),
            db.leaveType.findMany()
        ]);
        res.json({ balances, requests, types, year });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE SETTINGS
// ─────────────────────────────────────────────
export const getLeaveSettings = async (_req, res) => {
    try {
        let settings = await db.leaveSettings.findFirst();
        if (!settings)
            settings = await db.leaveSettings.create({ data: {} });
        res.json(settings);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const updateLeaveSettings = async (req, res) => {
    try {
        let settings = await db.leaveSettings.findFirst();
        const body = { ...req.body };
        const allowed = ["sandwichRule", "minLeaveDays", "maxLeaveDays", "noticePeriodDays", "allowCancelBefore", "allowCancelAfter", "autoApproveAfterDays"];
        const data = {};
        allowed.forEach(f => { if (body[f] !== undefined)
            data[f] = body[f]; });
        if (!settings) {
            settings = await db.leaveSettings.create({ data });
        }
        else {
            settings = await db.leaveSettings.update({ where: { id: settings.id }, data });
        }
        res.json(settings);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE REASONS
// ─────────────────────────────────────────────
export const getLeaveReasons = async (_req, res) => {
    try {
        const reasons = await db.leaveReason.findMany({ orderBy: { name: "asc" } });
        res.json(reasons);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const createLeaveReason = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const t = await db.leaveReason.create({ data: { name, description, status } });
        res.status(201).json(t);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const updateLeaveReason = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const t = await db.leaveReason.update({
            where: { id: parseInt(req.params.id) },
            data: { name, description, status }
        });
        res.json(t);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const deleteLeaveReason = async (req, res) => {
    try {
        await db.leaveReason.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE GROUPS & ACCRUAL RULES
// ─────────────────────────────────────────────
export const getLeaveGroups = async (_req, res) => {
    try {
        const groups = await db.leaveGroup.findMany({
            include: { rules: { include: { leaveType: true } } },
            orderBy: { groupName: "asc" }
        });
        res.json(groups);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const createLeaveGroup = async (req, res) => {
    try {
        const { groupName, description, rules } = req.body;
        const g = await db.leaveGroup.create({
            data: { groupName, description, rules: { create: rules } },
            include: { rules: true }
        });
        res.status(201).json(g);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const updateLeaveGroup = async (req, res) => {
    try {
        const { groupName, description, rules } = req.body;
        const groupId = parseInt(req.params.id);
        await db.leaveGroupRule.deleteMany({ where: { leaveGroupId: groupId } });
        const g = await db.leaveGroup.update({
            where: { id: groupId },
            data: { groupName, description, rules: { create: rules } },
            include: { rules: true }
        });
        res.json(g);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const deleteLeaveGroup = async (req, res) => {
    try {
        await db.leaveGroup.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const assignLeaveGroup = async (req, res) => {
    try {
        const { employeeId, leaveGroupId, effectiveDate } = req.body;
        const assignment = await db.employeeLeaveGroup.upsert({
            where: { employeeId: parseInt(employeeId) },
            create: { employeeId: parseInt(employeeId), leaveGroupId: parseInt(leaveGroupId), effectiveDate: new Date(effectiveDate) },
            update: { leaveGroupId: parseInt(leaveGroupId), effectiveDate: new Date(effectiveDate) }
        });
        res.json(assignment);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// AUTO LEAVES
// ─────────────────────────────────────────────
export const getAutoLeaves = async (_req, res) => {
    try {
        const autoLeaves = await db.autoLeave.findMany({
            include: { employee: true },
            orderBy: { leaveDate: "desc" }
        });
        res.json(autoLeaves);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const deleteAutoLeave = async (req, res) => {
    try {
        await db.autoLeave.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Deleted" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// LEAVE PAYOUTS
// ─────────────────────────────────────────────
export const getLeavePayouts = async (_req, res) => {
    try {
        const payouts = await db.leavePayoutRequest.findMany({
            include: { employee: true, leaveType: true },
            orderBy: { createdAt: "desc" }
        });
        res.json(payouts);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const submitLeavePayout = async (req, res) => {
    try {
        const { employeeId, leaveTypeId, availableBalance, payoutLeaveDays, payoutAmount, reason, status } = req.body;
        const p = await db.leavePayoutRequest.create({
            data: {
                employeeId: parseInt(employeeId),
                leaveTypeId: parseInt(leaveTypeId),
                availableBalance: parseFloat(availableBalance),
                payoutLeaveDays: parseFloat(payoutLeaveDays),
                payoutAmount: payoutAmount ? parseFloat(payoutAmount) : null,
                reason,
                status
            }
        });
        res.status(201).json(p);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const reviewLeavePayout = async (req, res) => {
    try {
        const p = await db.leavePayoutRequest.update({
            where: { id: parseInt(req.params.id) },
            data: { status: req.body.status }
        });
        res.json(p);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
// ─────────────────────────────────────────────
// SHORT LEAVES
// ─────────────────────────────────────────────
export const getShortLeaves = async (_req, res) => {
    try {
        const leaves = await db.shortLeaveRequest.findMany({
            include: { employee: true },
            orderBy: { date: "desc" }
        });
        res.json(leaves);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const submitShortLeave = async (req, res) => {
    try {
        const { employeeId, date, fromTime, toTime, totalHours, reason, status } = req.body;
        const l = await db.shortLeaveRequest.create({
            data: {
                employeeId: parseInt(employeeId),
                date: new Date(date),
                fromTime,
                toTime,
                totalHours: parseFloat(totalHours),
                reason,
                status
            }
        });
        res.status(201).json(l);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
export const reviewShortLeave = async (req, res) => {
    try {
        const l = await db.shortLeaveRequest.update({
            where: { id: parseInt(req.params.id) },
            data: { status: req.body.status }
        });
        res.json(l);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
//# sourceMappingURL=leaveController.js.map