"use client";

import React, { useState, memo } from "react";
import { Card, SearchBar, Btn, Field, Badge, Modal } from "./CommonComponents";
import { G, statusStyle, BadgeStyle } from "./Styles";

interface Hospital {
    id: string;
    name: string;
    loc: string;
    beds: number;
    icuFree: number;
    status: string;
    contact: string;
    verified: boolean;
}

interface HospitalsPageProps {
    hospitals: Hospital[];
    setHospitals: React.Dispatch<React.SetStateAction<Hospital[]>>;
}

const HospitalsPage = memo(({ hospitals, setHospitals }: HospitalsPageProps) => {
    const [search, setSearch] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [newH, setNewH] = useState({ name: "", loc: "", beds: "", icuFree: "", contact: "" });
    const filtered = hospitals.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.loc.toLowerCase().includes(search.toLowerCase()));

    const addHospital = () => {
        if (!newH.name || !newH.loc) return;
        setHospitals(prev => [...prev, {
            id: `HSP-00${prev.length + 1}`, name: newH.name, loc: newH.loc,
            beds: Number(newH.beds) || 0, icuFree: Number(newH.icuFree) || 0, status: "active", contact: newH.contact, verified: false
        }]);
        setNewH({ name: "", loc: "", beds: "", icuFree: "", contact: "" });
        setShowAdd(false);
    };

    const toggleVerify = (id: string) => setHospitals(prev => prev.map(h => h.id === id ? { ...h, verified: !h.verified } : h));
    const removeHospital = (id: string) => setHospitals(prev => prev.filter(h => h.id !== id));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Hospitals</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{hospitals.length} partner hospitals · {hospitals.filter(h => h.icuFree > 0).length} with ICU availability</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <SearchBar value={search} onChange={setSearch} placeholder="Search hospitals..." />
                    <Btn onClick={() => setShowAdd(true)} color="#fff" bg="rgba(255,77,109,0.15)" border="rgba(255,77,109,0.3)">+ Add Hospital</Btn>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[["🏥", "Total Hospitals", hospitals.length, G.blue], [" 🛏️", "ICU Available", hospitals.reduce((a, h) => a + h.icuFree, 0), G.green], ["⚠️", "Fully Occupied", hospitals.filter(h => h.icuFree === 0).length, G.red]].map(([icon, label, val, col], i) => (
                    <Card key={i} style={{ padding: "20px 22px", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -30, right: -30, width: 80, height: 80, borderRadius: "50%", background: col as string, filter: "blur(35px)", opacity: 0.15 }} />
                        <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{val}</div>
                        <div style={{ fontSize: 10, color: G.muted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                    </Card>
                ))}
            </div>

            <Card style={{ padding: "0 0 8px" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "80px 1fr 100px 70px 70px 80px 90px",
                    gap: 8, padding: "14px 20px 12px", borderBottom: `1px solid ${G.border}`
                }}>
                    {["ID", "HOSPITAL", "LOCATION", "BEDS", "ICU FREE", "STATUS", "ACTIONS"].map((h, i) => (
                        <span key={i} style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</span>
                    ))}
                </div>
                {filtered.map((h, i) => {
                    const s: BadgeStyle = statusStyle[h.status] || statusStyle.active;
                    return (
                        <div key={i} className="rh" style={{
                            display: "grid", gridTemplateColumns: "80px 1fr 100px 70px 70px 80px 90px",
                            gap: 8, padding: "11px 20px", alignItems: "center", transition: "background 0.2s",
                            borderBottom: i < filtered.length - 1 ? `1px solid rgba(255,255,255,0.03)` : "none"
                        }}>
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: G.muted }}>{h.id}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: G.text, display: "flex", alignItems: "center", gap: 5 }}>
                                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.name}</span>
                                        {h.verified && <span title="Verified" style={{ fontSize: 9, color: G.green }}>✓</span>}
                                    </div>
                                    <div style={{ fontSize: 9, color: G.muted }}>Contact: {h.contact}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: 10, color: G.muted }}>{h.loc}</span>
                            <span style={{ fontSize: 10, color: G.text, fontWeight: 600 }}>{h.beds}</span>
                            <span style={{ fontSize: 10, color: h.icuFree > 0 ? G.green : G.red, fontWeight: 700 }}>{h.icuFree}</span>
                            <Badge {...s} />
                            <div style={{ display: "flex", gap: 5 }}>
                                <button className="abtn" onClick={() => toggleVerify(h.id)}
                                    style={{ width: 26, height: 26, borderRadius: 7, background: h.verified ? "rgba(0,210,160,0.1)" : "rgba(84,160,255,0.1)", border: `1px solid ${h.verified ? "rgba(0,210,160,0.2)" : "rgba(84,160,255,0.2)"}`, color: h.verified ? G.green : G.blue, fontSize: 11, cursor: "pointer" }}>{h.verified ? "✓" : "⬆"}</button>
                                <button className="abtn" onClick={() => removeHospital(h.id)}
                                    style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)", color: G.red, fontSize: 11, cursor: "pointer" }}>🗑</button>
                            </div>
                        </div>
                    );
                })}
            </Card>

            {showAdd && (
                <Modal title="Add New Hospital" onClose={() => setShowAdd(false)} width={450}>
                    <Field label="Hospital Name" value={newH.name} onChange={(v: string) => setNewH(p => ({ ...p, name: v }))} />
                    <Field label="Location" value={newH.loc} onChange={(v: string) => setNewH(p => ({ ...p, loc: v }))} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <Field label="Total Beds" value={newH.beds} onChange={(v: string) => setNewH(p => ({ ...p, beds: v }))} type="number" />
                        <Field label="ICU Vacancy" value={newH.icuFree} onChange={(v: string) => setNewH(p => ({ ...p, icuFree: v }))} type="number" />
                    </div>
                    <Field label="Contact Number" value={newH.contact} onChange={(v: string) => setNewH(p => ({ ...p, contact: v }))} />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
                        <Btn onClick={() => setShowAdd(false)}>Cancel</Btn>
                        <Btn onClick={addHospital} color="#fff" bg="rgba(0,210,160,0.15)" border="rgba(0,210,160,0.3)">Add Hospital</Btn>
                    </div>
                </Modal>
            )}
        </div>
    );
});

HospitalsPage.displayName = "HospitalsPage";

export default HospitalsPage;
