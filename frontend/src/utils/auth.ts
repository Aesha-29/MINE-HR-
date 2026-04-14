export interface SessionUser {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    type?: string;
}

export const getStoredUser = (): SessionUser | null => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const getCurrentUserId = (): number | null => {
    const user = getStoredUser();
    if (!user?.id || Number.isNaN(Number(user.id))) return null;
    return Number(user.id);
};

export const isSessionAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    const user = getStoredUser();
    return Boolean(token && user);
};
