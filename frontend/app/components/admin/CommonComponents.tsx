"use client";

import React from "react";
import { G } from "./Styles";

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

export const Card = ({ children, style = {}, onClick }: any) => (
    <div onClick={onClick} style={{
        background: G.card, border: `1px solid ${G.border}`, borderRadius: 20,
        backdropFilter: "blur(20px)", transition: "all 0.3s ease", position: "relative",
        overflow: "hidden", ...style
    }} className={onClick ? "abtn" : ""}>
        {children}
    </div>
);

export const Badge = ({ label, color, bg, border, size = 9 }: any) => (
    <div style={{
        fontSize: size, fontWeight: 800, color, background: bg, border: `1px solid ${border}`,
        borderRadius: 7, padding: "3px 9px", letterSpacing: "0.05em", textTransform: "uppercase",
        display: "inline-flex", alignItems: "center"
    }}>
        {label}
    </div>
);

export const Btn = ({ children, color = "#fff", bg = "rgba(255,255,255,0.08)", border = "rgba(255,255,255,0.15)", onClick, style = {} }: any) => (
    <button onClick={onClick} className="abtn" style={{
        padding: "8px 16px", borderRadius: 10, background: bg, border: `1px solid ${border}`,
        color, fontSize: 11, fontWeight: 700, ...style
    }}>
        {children}
    </button>
);

export const TrustRing = ({ val }: any) => {
    const c = val > 75 ? G.green : val > 40 ? G.amber : G.red;
    return (
        <div style={{ position: "relative", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={c} strokeWidth="3" strokeDasharray={`${val}, 100`} strokeLinecap="round" />
            </svg>
            <span style={{ position: "absolute", fontSize: 8, fontWeight: 800, color: c }}>{val}</span>
        </div>
    );
};

export const SearchBar = ({ value, onChange, placeholder = "Search..." }: any) => (
    <div style={{ position: "relative", flex: 1 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: 0.4 }}>🔍</span>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder}
            style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`,
                borderRadius: 14, padding: "11px 16px 11px 40px", fontSize: 12, outline: "none", color: "#fff"
            }} />
    </div>
);

// StatCard depends on Recharts, maybe keep it separate or pass as prop if needed
// For now let's keep it here but we need to import Recharts components
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export const StatCard = ({ icon, label, value, delta, accent, spark }: any) => {
    return (
        <Card style={{ padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `rgba(${accent === G.red ? '255,77,109' : accent === G.blue ? '84,160,255' : accent === G.green ? '0,210,160' : '255,159,67'},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: delta > 0 ? G.green : G.red, background: delta > 0 ? "rgba(0,210,160,0.1)" : "rgba(255,77,109,0.1)", padding: "3px 8px", borderRadius: 6 }}>
                    {delta > 0 ? "+" : ""}{delta}%
                </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 10, color: G.muted, marginTop: 5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            {spark && (
                <div style={{ marginTop: 14 }}>
                    <ResponsiveContainer width="100%" height={34}>
                        <AreaChart data={spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs><linearGradient id={`sg-${label}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
                                <stop offset="100%" stopColor={accent} stopOpacity={0} />
                            </linearGradient></defs>
                            <Area type="monotone" dataKey="v" stroke={accent} strokeWidth={1.5} fill={`url(#sg-${label})`} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    );
};
export const Tip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: "#0d0f18", border: `1px solid ${G.border}`, padding: "8px 12px", borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, marginBottom: 4, textTransform: "uppercase" }}>{payload[0].payload.m || payload[0].payload.t}</p>
                {payload.map((p: any, i: number) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>{p.value}{p.unit || ""}</span>
                        <span style={{ fontSize: 10, color: G.muted }}>{p.name}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export const Modal = ({ title, children, onClose, width = 400 }: any) => (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }} />
        <Card style={{ width: "100%", maxWidth: width, padding: 0, zIndex: 1, animation: "fadeUp 0.3s ease", border: `1px solid rgba(255,255,255,0.12)`, boxShadow: "0 30px 60px rgba(0,0,0,0.8)" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{title}</div>
                <button onClick={onClose} style={{ background: "transparent", border: "none", color: G.muted, fontSize: 18, cursor: "pointer", padding: 4 }}>✕</button>
            </div>
            <div style={{ padding: "22px" }}>{children}</div>
        </Card>
    </div>
);

export const Field = ({ label, value, onChange, type = "text", options = [] }: any) => (
    <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: G.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, marginLeft: 2 }}>{label}</div>
        {type === "select" ? (
            <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", cursor: "pointer" }}>
                {options.map((o: any) => <option key={o} value={o}>{o}</option>)}
            </select>
        ) : (
            <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none" }} />
        )}
    </div>
);
