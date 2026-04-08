import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getDashboardStats = async (_req: Request, res: Response) => {
    try {
        const todayStr = new Date().toISOString().split('T')[0] || "";
        const todayDate = new Date(todayStr);

        const [
            totalEmployees,
            activeEmployees,
            pendingLeaves,
            upcomingEvents,
            openLostFound,
            totalAssets,
            presentToday
        ] = await Promise.all([
            prisma.employee.count(),
            prisma.employee.count({ where: { status: "Active" } }),
            prisma.leaveRequest.count({ where: { status: "Pending" } }),
            prisma.event.count({ where: { startDate: { gte: new Date() } } }),
            prisma.lostFoundItem.count({ where: { status: "Open" } }),
            prisma.asset.count(),
            prisma.attendanceLog.count({
                where: {
                    date: todayDate,
                    clockIn: { not: null },
                },
            })
        ]);

        const deptStats = await prisma.employee.groupBy({
            by: ['department'],
            _count: {
                id: true
            },
            where: {
                department: { not: null }
            }
        });

        const deptData = deptStats.map(d => ({
            name: d.department || 'Unknown',
            value: d._count.id
        }));

        res.status(200).json({
            totalEmployees,
            activeEmployees,
            presentToday,
            pendingLeaves,
            upcomingEvents,
            openLostFound,
            totalAssets,
            deptData
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
