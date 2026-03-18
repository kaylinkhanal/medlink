"use client";

import React, { useState, memo } from "react";
import { Card, Badge, TrustRing, SearchBar, Modal, Btn } from "./CommonComponents";
import { G, statusStyle, typeColor, BadgeStyle } from "./Styles";

interface Emergency {
    id: string;
    type: string;
    pt: string;
    loc: string;
    status: string;
    time: string;
    trust: number;
    blood?: string | null;
    helpers: number;
    reported: boolean;
}

interface EmergenciesPageProps {
    emergencies: Emergency[];
    setEmergencies: React.Dispatch<React.SetStateAction<Emergency[]>>;
}

const EmergenciesPage = memo(({ emergencies, setEmergencies }: EmergenciesPageProps) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState<Emergency | null>(null);

    const filtered = emergencies.filter(e => {
        const matchS = filter === "all" || e.status === filter;
        const matchQ = e.pt.toLowerCase().includes(search.toLowerCase()) ||
            e.id.toLowerCase().includes(search.toLowerCase()) ||
            e.type.toLowerCase().includes(search.toLowerCase());
        return matchS && matchQ;
    });

    const updateStatus = (id: string, status: string) => {
        setEmergencies(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    };

    const deleteEm = (id: string) => {
        setEmergencies(prev => prev.filter(e => e.id !== id));
        setSelected(null);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Emergencies</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{emergencies.length} total · {emergencies.filter(e => e.status === "live").length} live</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <SearchBar value={search} onChange={setSearch} placeholder="Search emergencies..." />
                    <div style={{ display: "flex", gap: 6 }}>
                        {["all", "live", "pending", "fulfilled", "cancelled"].map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                padding: "7px 12px", borderRadius: 9, border: `1px solid ${filter === f ? "rgba(255,77,109,0.3)" : G.border}`,
                                background: filter === f ? "rgba(255,77,109,0.1)" : "transparent",
                                color: filter === f ? G.red : G.muted, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                                textTransform: "capitalize", transition: "all 0.2s"
                            }}>{f}</button>
                        ))}
                    </div>
                </div>
            </div>

            <Card style={{ padding: "0 0 8px" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "80px 90px 1fr 90px 110px 50px 80px",
                    gap: 8, padding: "14px 20px 12px", borderBottom: `1px solid ${G.border}`
                }}>
                    {["ID", "TYPE", "PATIENT", "LOCATION", "STATUS", "TRUST", "ACTIONS"].map((h, i) => (
                        <span key={i} style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</span>
                    ))}
                </div>
                {filtered.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: G.muted, fontSize: 12 }}>No emergencies found</div>}
                {filtered.map((em, i) => {
                    const s: BadgeStyle = statusStyle[em.status] || statusStyle.pending;
                    const tc: string = typeColor[em.type] || G.muted;
                    return (
                        <div key={i} className="rh" style={{
                            display: "grid", gridTemplateColumns: "80px 90px 1fr 90px 110px 50px 80px",
                            gap: 8, padding: "11px 20px", borderRadius: 0, alignItems: "center", transition: "background 0.2s",
                            borderBottom: i < filtered.length - 1 ? `1px solid rgba(255,255,255,0.03)` : "none"
                        }}>
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: G.muted }}>{em.id}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", background: tc, boxShadow: `0 0 5px ${tc}`, flexShrink: 0 }} />
                                <span style={{ fontSize: 11, fontWeight: 600, color: tc }}>{em.type}</span>
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 500, color: G.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{em.pt}</div>
                                <div style={{ fontSize: 9, color: G.muted }}>{em.time} ago</div>
                            </div>
                            <span style={{ fontSize: 10, color: G.muted }}>{em.loc}</span>
                            <Badge {...s} />
                            <TrustRing val={em.trust} />
                            <div style={{ display: "flex", gap: 5 }}>
                                <button className="abtn" onClick={() => setSelected(em)}
                                    style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(84,160,255,0.1)", border: "1px solid rgba(84,160,255,0.2)", color: G.blue, fontSize: 11, cursor: "pointer" }}>👁</button>
                                <button className="abtn" onClick={() => deleteEm(em.id)}
                                    style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)", color: G.red, fontSize: 11, cursor: "pointer" }}>🗑</button>
                            </div>
                        </div>
                    );
                })}
            </Card>

            {selected && (
                <Modal title={`Emergency ${selected.id}`} onClose={() => setSelected(null)} width={520}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                        {[["Type", selected.type], ["Patient", selected.pt], ["Location", selected.loc],
                        ["Blood Group", selected.blood || "N/A"], ["Helpers", selected.helpers], ["Time", selected.time + " ago"]
                        ].map(([l, v]) => (
                            <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px" }}>
                                <div style={{ fontSize: 9, fontWeight: 700, color: G.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{l}</div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{v}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        {selected.status !== "fulfilled" && <Btn onClick={() => { updateStatus(selected.id, "fulfilled"); setSelected(null); }} bg="rgba(0,210,160,0.12)" border="rgba(0,210,160,0.25)" color={G.green}>Mark Resolved</Btn>}
                        {selected.status !== "cancelled" && <Btn onClick={() => { updateStatus(selected.id, "cancelled"); setSelected(null); }} bg="rgba(255,77,109,0.12)" border="rgba(255,77,109,0.25)" color={G.red}>Dismiss Issue</Btn>}
                    </div>
                </Modal>
            )}
        </div>
    );
});

EmergenciesPage.displayName = "EmergenciesPage";

export default EmergenciesPage;
