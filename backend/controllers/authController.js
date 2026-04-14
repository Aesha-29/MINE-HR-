import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is required");
}
const normalizeIdentifier = (value) => String(value ?? "").trim();
const findAuthUser = async (identifier) => {
    const employee = await prisma.employee.findFirst({
        where: {
            OR: [
                { employeeId: identifier },
                { email: identifier },
                { personalEmail: identifier }
            ]
        }
    });
    if (employee) {
        return { user: employee, type: "Employee" };
    }
    const manager = await prisma.manager.findFirst({
        where: { email: identifier }
    });
    if (manager) {
        return { user: manager, type: "Manager" };
    }
    return { user: null, type: null };
};
export const login = async (req, res) => {
    const identifier = normalizeIdentifier(req.body?.identifier);
    const password = String(req.body?.password ?? "");
    try {
        if (!identifier || !password) {
            res.status(400).json({ error: "Identifier and password are required." });
            return;
        }
        const { user, type } = await findAuthUser(identifier);
        if (!user || !type) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }
        const storedPassword = user.password || "";
        if (!storedPassword) {
            res.status(403).json({ error: "Password is not set for this account. Please complete registration first." });
            return;
        }
        const isPasswordValid = storedPassword.startsWith("$2")
            ? await bcrypt.compare(password, storedPassword)
            : storedPassword === password;
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials." });
            return;
        }
        const payload = {
            id: user.id,
            email: user.email || user.personalEmail || "",
            role: user.role, // 'Employee', 'HR', 'Admin', 'Manager'
            type
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: type === "Employee" ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || identifier : user.name || identifier,
                email: user.email || user.personalEmail,
                role: user.role,
                type
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: "Authentication failed." });
    }
};
export const register = async (req, res) => {
    const identifier = normalizeIdentifier(req.body?.identifier);
    const password = String(req.body?.password ?? "");
    try {
        if (!identifier || !password) {
            res.status(400).json({ error: "Identifier and password are required." });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ error: "Password must be at least 6 characters long." });
            return;
        }
        const { user, type } = await findAuthUser(identifier);
        if (!user || !type) {
            res.status(404).json({ error: "No account found for that employee ID or email." });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (type === "Employee") {
            await prisma.employee.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });
        }
        else {
            await prisma.manager.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });
        }
        res.status(201).json({
            message: "Password set successfully. You can now sign in."
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to set up access." });
    }
};
export const me = async (req, res) => {
    res.json({ user: req.user });
};
//# sourceMappingURL=authController.js.map