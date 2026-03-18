export const G = {
    bg: "#05060a", card: "rgba(255,255,255,0.032)", border: "rgba(255,255,255,0.07)",
    red: "#ff4d6d", amber: "#ff9f43", blue: "#54a0ff", green: "#00d2a0", violet: "#a29bfe",
    text: "#e5e7eb", muted: "#6b7280", dim: "#374151",
};

export interface BadgeStyle {
    label?: string;
    color: string;
    bg: string;
    border: string;
}

export const statusStyle: Record<string, BadgeStyle> = {
    live: { label: "LIVE", color: G.green, bg: "rgba(0,210,160,0.08)", border: "rgba(0,210,160,0.2)" },
    fulfilled: { label: "DONE", color: G.blue, bg: "rgba(84,160,255,0.08)", border: "rgba(84,160,255,0.2)" },
    cancelled: { label: "CANCELLED", color: G.red, bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
    pending: { label: "PENDING", color: G.amber, bg: "rgba(255,159,67,0.08)", border: "rgba(255,159,67,0.2)" },
    resolved: { label: "RESOLVED", color: G.green, bg: "rgba(0,210,160,0.08)", border: "rgba(0,210,160,0.2)" },
    open: { label: "OPEN", color: G.red, bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
    active: { label: "ACTIVE", color: G.green, bg: "rgba(0,210,160,0.08)", border: "rgba(0,210,160,0.2)" },
    full: { label: "FULL", color: G.red, bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
    banned: { label: "BANNED", color: G.red, bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
    dismissed: { label: "DISMISSED", color: G.muted, bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.2)" },
};

export const typeColor: Record<string, string> = { Blood: "#ff4d6d", Ambulance: "#ff9f43", ICU: "#54a0ff", Organ: "#a29bfe", Fundraise: "#00d2a0" };

export interface SevStyle {
    color: string;
    bg: string;
    border: string;
}

export const sevStyle: Record<string, SevStyle> = {
    HIGH: { color: "#ff4d6d", bg: "rgba(255,77,109,0.08)", border: "rgba(255,77,109,0.2)" },
    MED: { color: "#ff9f43", bg: "rgba(255,159,67,0.08)", border: "rgba(255,159,67,0.2)" },
    LOW: { color: "#54a0ff", bg: "rgba(84,160,255,0.08)", border: "rgba(84,160,255,0.2)" },
};
