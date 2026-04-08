import prisma from "../config/prisma.js";
export const getOnboardingByEmployeeId = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const onboarding = await prisma.onboarding.findFirst({
            where: { employeeId },
        });
        if (!onboarding) {
            res.status(404).json({ message: "Onboarding record not found" });
            return;
        }
        res.status(200).json(onboarding);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const createOnboarding = async (req, res) => {
    try {
        const data = req.body;
        const onboarding = await prisma.onboarding.create({
            data,
        });
        res.status(201).json(onboarding);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
export const updateOnboarding = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const data = req.body;
        // We update by employeeId. Since there could be multiple or one, we update the first one found or use updateMany.
        // Using updateMany is safer when not updating by unique ID.
        const onboarding = await prisma.onboarding.updateMany({
            where: { employeeId },
            data,
        });
        res.status(200).json(onboarding);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
//# sourceMappingURL=onboardingController.js.map