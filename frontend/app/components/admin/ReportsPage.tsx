"use client";

import React, { useState, memo } from "react";
import { Card, Badge, Btn } from "./CommonComponents";
import { G, sevStyle, statusStyle, BadgeStyle, SevStyle } from "./Styles";

interface Report {
    id: string;
    target: string;
    targetType: string;
    reason: string;
    reporter: string;
    time: string;
    sev: string;
    status: string;
}

interface ReportsPageProps {
    reports: Report[];
    setReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

const ReportsPage = memo(({ reports, setReports }: ReportsPageProps) => {
    const [filter, setFilter] = useState("open");
    const filtered = reports.filter(r => filter === "all" || r.status === filter);

    const act = (id: string, action: string) => {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Reports Queue</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{reports.filter(r => r.status === "open").length} open · {reports.filter(r => r.sev === "HIGH" && r.status === "open").length} high severity</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {["all", "open", "resolved", "dismissed"].map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: "7px 12px", borderRadius: 9,
                            border: `1px solid ${filter === f ? "rgba(255,77,109,0.3)" : G.border}`,
                            background: filter === f ? "rgba(255,77,109,0.1)" : "transparent",
                            color: filter === f ? G.red : G.muted, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                            textTransform: "capitalize", transition: "all 0.2s"
                        }}>{f}</button>
                    ))}
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.length === 0 && (
                    <Card style={{ padding: "40px", textAlign: "center" }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>🎉</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: G.text }}>No {filter} reports</div>
                    </Card>
                )}
                {filtered.map((r, i) => {
                    const sc: SevStyle = sevStyle[r.sev] || sevStyle.LOW;
                    const rs: BadgeStyle = statusStyle[r.status] || statusStyle.open;
                    return (
                        <Card key={i} style={{ padding: "20px 24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                <div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                                        <span style={{ fontFamily: "monospace", fontSize: 10, color: G.muted }}>{r.id}</span>
                                        <span style={{ fontSize: 10, color: G.dim }}>→</span>
                                        <span style={{ fontFamily: "monospace", fontSize: 10, color: G.blue }}>{r.target}</span>
                                        <span style={{ fontSize: 9, color: G.muted, background: "rgba(255,255,255,0.05)", padding: "1px 6px", borderRadius: 5 }}>{r.targetType}</span>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{r.reason}</div>
                                    <div style={{ fontSize: 10, color: G.muted }}>Reported by {r.reporter} · {r.time}</div>
                                </div>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <Badge {...sc} label={r.sev} />
                                    <Badge {...rs} />
                                </div>
                            </div>
                            {r.status === "open" && (
                                <div style={{ display: "flex", gap: 8, paddingTop: 14, borderTop: `1px solid ${G.border}` }}>
                                    {[["✓ Resolve", "resolved", G.green, "rgba(0,210,160,0.1)", "rgba(0,210,160,0.25)"],
                                    ["✕ Dismiss", "dismissed", G.muted, "rgba(107,114,128,0.1)", "rgba(107,114,128,0.25)"],
                                    ["🔍 Investigate", "open", G.blue, "rgba(84,160,255,0.1)", "rgba(84,160,255,0.25)"]
                                    ].map(([l, a, c, bg, b]) => (
                                        <Btn key={l} onClick={() => a !== "open" && act(r.id, a)} color={c as string} bg={bg as string} border={b as string}>{l}</Btn>
                                    ))}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
});

ReportsPage.displayName = "ReportsPage";

export default ReportsPage;
