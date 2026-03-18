"use client";

import React, { useState, memo } from "react";
import { Card, Badge, TrustRing, Btn } from "./CommonComponents";
import { G, BadgeStyle } from "./Styles";

interface Verification {
    id: string;
    userId: string;
    name: string;
    role: string;
    doc: string;
    ago: string;
    trust: number;
    status: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    trust: number;
    joined: string;
    emergencies: number;
    verified: boolean;
}

interface VerificationPageProps {
    verifications: Verification[];
    setVerifications: React.Dispatch<React.SetStateAction<Verification[]>>;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const VerificationPage = memo(({ verifications, setVerifications, setUsers }: VerificationPageProps) => {
    const [filter, setFilter] = useState("pending");
    const filtered = verifications.filter(v => filter === "all" || v.status === filter);

    const decide = (id: string, decision: string) => {
        setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: decision } : v));
        if (decision === "approved") {
            const userId = verifications.find(v => v.id === id)?.userId;
            if (userId) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: true, trust: Math.min(100, u.trust + 20) } : u));
            }
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Verification Queue</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{verifications.filter(v => v.status === "pending").length} pending review</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {["all", "pending", "approved", "rejected"].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: "7px 12px", borderRadius: 9,
                            border: `1px solid ${filter === f ? "rgba(162,155,254,0.3)" : G.border}`,
                            background: filter === f ? "rgba(162,155,254,0.1)" : "transparent",
                            color: filter === f ? G.violet : G.muted, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                            textTransform: "capitalize", transition: "all 0.2s"
                        }}>{f}</button>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.length === 0 && (
                    <Card style={{ padding: "40px", textAlign: "center" }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: G.text }}>No {filter} verifications</div>
                        <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>All caught up!</div>
                    </Card>
                )}
                {filtered.map((v, i) => (
                    <Card key={i} style={{ padding: "20px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                                background: `linear-gradient(135deg,${G.blue}30,${G.violet}30)`,
                                border: `1px solid ${G.blue}20`, display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: 16, fontWeight: 800, color: G.blue
                            }}>{v.name[0]}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{v.name}</span>
                                    <span style={{ fontSize: 9, background: "rgba(255,255,255,0.06)", color: G.muted, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{v.role}</span>
                                    {v.status !== "pending" && <Badge {...(v.status === "approved" ? { label: "APPROVED", color: G.green, bg: "rgba(0,210,160,0.1)", border: "rgba(0,210,160,0.2)" } as BadgeStyle : { label: "REJECTED", color: G.red, bg: "rgba(255,77,109,0.1)", border: "rgba(255,77,109,0.2)" } as BadgeStyle)} />}
                                </div>
                                <div style={{ fontSize: 11, color: G.muted }}>📄 {v.doc} · Submitted {v.ago}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <TrustRing val={v.trust} />
                                {v.status === "pending" && (
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Btn onClick={() => decide(v.id, "approved")} color={G.green} bg="rgba(0,210,160,0.1)" border="rgba(0,210,160,0.25)">✓ Approve</Btn>
                                        <Btn onClick={() => decide(v.id, "rejected")} color={G.red} bg="rgba(255,77,109,0.1)" border="rgba(255,77,109,0.25)">✕ Reject</Btn>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{
                            marginTop: 16, padding: "12px 14px", background: "rgba(255,255,255,0.025)", borderRadius: 10,
                            display: "flex", gap: 16, alignItems: "center"
                        }}>
                            <span style={{ fontSize: 10, color: G.muted }}>📎 Document preview not available in demo</span>
                            <Btn style={{ padding: "4px 10px", fontSize: 10 }} color={G.blue} bg="rgba(84,160,255,0.08)" border="rgba(84,160,255,0.2)">View Document</Btn>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
});

VerificationPage.displayName = "VerificationPage";

export default VerificationPage;
