"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
    id: string;
    fullName: string;
    phone: string;
    role: string;
}

export function useAuth(requireAuth = true) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const stored = localStorage.getItem("user");

        if (!token || !stored) {
            if (requireAuth) {
                router.replace("/login");
            }
            setLoading(false);
            return;
        }

        try {
            const parsed: AuthUser = JSON.parse(stored);
            setUser(parsed);
        } catch {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (requireAuth) {
                router.replace("/login");
            }
        } finally {
            setLoading(false);
        }
    }, [requireAuth, router]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.replace("/login");
    };

    return { user, loading, logout };
}
