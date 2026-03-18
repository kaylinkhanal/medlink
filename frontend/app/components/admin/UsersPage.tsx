"use client";

import React, { useState, memo } from "react";
import { Card, Badge, TrustRing, SearchBar, Modal, Btn, Field } from "./CommonComponents";
import { G, statusStyle, BadgeStyle } from "./Styles";

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

interface UsersPageProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersPage = memo(({ users, setUsers }: UsersPageProps) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState<Partial<User>>({});

    const filtered = users.filter(u => {
        const matchR = filter === "all" || u.role.toLowerCase() === filter;
        const matchQ = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.id.toLowerCase().includes(search.toLowerCase());
        return matchR && matchQ;
    });

    const toggleBan = (id: string) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "banned" ? "active" : "banned" } : u));
    };

    const saveEdit = () => {
        if (!editData.id) return;
        setUsers(prev => prev.map(u => u.id === editData.id ? { ...u, ...editData as User } : u));
        setSelected(editData as User);
        setEditMode(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Users</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{users.length} registered · {users.filter(u => u.status === "banned").length} banned</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
                    <div style={{ display: "flex", gap: 6 }}>
                        {["all", "user", "doctor", "ngo"].map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                padding: "7px 12px", borderRadius: 9, border: `1px solid ${filter === f ? "rgba(84,160,255,0.3)" : G.border}`,
                                background: filter === f ? "rgba(84,160,255,0.1)" : "transparent",
                                color: filter === f ? G.blue : G.muted, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                                textTransform: "capitalize", transition: "all 0.2s"
                            }}>{f}</button>
                        ))}
                    </div>
                </div>
            </div>

            <Card style={{ padding: "0 0 8px" }}>
                <div style={{
                    display: "grid", gridTemplateColumns: "80px 1fr 140px 80px 70px 50px 80px",
                    gap: 8, padding: "14px 20px 12px", borderBottom: `1px solid ${G.border}`
                }}>
                    {["ID", "USER", "EMAIL", "ROLE", "STATUS", "TRUST", "ACTIONS"].map((h, i) => (
                        <span key={i} style={{ fontSize: 9, fontWeight: 700, color: G.dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{h}</span>
                    ))}
                </div>
                {filtered.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", color: G.muted, fontSize: 12 }}>No users found</div>}
                {filtered.map((u, i) => {
                    const s: BadgeStyle = statusStyle[u.status] || statusStyle.active;
                    return (
                        <div key={i} className="rh" style={{
                            display: "grid", gridTemplateColumns: "80px 1fr 140px 80px 70px 50px 80px",
                            gap: 8, padding: "11px 20px", alignItems: "center", transition: "background 0.2s",
                            borderBottom: i < filtered.length - 1 ? `1px solid rgba(255,255,255,0.03)` : "none"
                        }}>
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: G.muted }}>{u.id}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 9, flexShrink: 0,
                                    background: `linear-gradient(135deg,${G.blue}40,${G.violet}40)`,
                                    border: `1px solid ${G.blue}25`, display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 11, fontWeight: 800, color: G.blue
                                }}>{u.name[0]}</div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: G.text, display: "flex", alignItems: "center", gap: 5 }}>
                                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</span>
                                        {u.verified && <span title="Verified" style={{ fontSize: 9, color: G.green }}>✓</span>}
                                    </div>
                                    <div style={{ fontSize: 9, color: G.muted }}>Joined {u.joined}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: 10, color: G.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</span>
                            <span style={{ fontSize: 10, color: G.text, fontWeight: 600 }}>{u.role}</span>
                            <Badge {...s} />
                            <TrustRing val={u.trust} />
                            <div style={{ display: "flex", gap: 5 }}>
                                <button className="abtn" onClick={() => { setSelected(u); setEditMode(false); }}
                                    style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(84,160,255,0.1)", border: "1px solid rgba(84,160,255,0.2)", color: G.blue, fontSize: 11, cursor: "pointer" }}>👁</button>
                                <button className="abtn" onClick={() => toggleBan(u.id)}
                                    style={{
                                        width: 26, height: 26, borderRadius: 7,
                                        background: u.status === "banned" ? "rgba(0,210,160,0.1)" : "rgba(255,77,109,0.1)",
                                        border: `1px solid ${u.status === "banned" ? "rgba(0,210,160,0.2)" : "rgba(255,77,109,0.2)"}`,
                                        color: u.status === "banned" ? G.green : G.red, fontSize: 11, cursor: "pointer"
                                    }}>
                                    {u.status === "banned" ? "✓" : "⊘"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </Card>

            {selected && (
                <Modal title={editMode ? "Edit User" : selected.name} onClose={() => { setSelected(null); setEditMode(false); }} width={500}>
                    {!editMode ? (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 14 }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${G.blue}40,${G.violet}40)`,
                                    border: `1px solid ${G.blue}25`, display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 20, fontWeight: 800, color: G.blue, flexShrink: 0
                                }}>{selected.name[0]}</div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{selected.name}</div>
                                    <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{selected.email}</div>
                                    <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
                                        <Badge {...(statusStyle[selected.status] || statusStyle.active)} />
                                        <span style={{ fontSize: 10, color: G.text, background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 6 }}>{selected.role}</span>
                                        {selected.verified && <span style={{ fontSize: 10, color: G.green, background: "rgba(0,210,160,0.1)", border: "1px solid rgba(0,210,160,0.2)", padding: "2px 8px", borderRadius: 6 }}>✓ Verified</span>}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                                {[["ID", selected.id], ["Joined", selected.joined], ["Emergencies", selected.emergencies], ["Trust Score", selected.trust + "%"]].map(([l, v]) => (
                                    <div key={l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px" }}>
                                        <div style={{ fontSize: 9, fontWeight: 700, color: G.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{l}</div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: `1px solid ${G.border}`, paddingTop: 18 }}>
                                <Btn onClick={() => { setEditData({ ...selected }); setEditMode(true); }}>✏ Edit</Btn>
                                <Btn onClick={() => { toggleBan(selected.id); if (selected) setSelected({ ...selected, status: selected.status === "banned" ? "active" : "banned" }); }}
                                    color={selected.status === "banned" ? G.green : G.red}
                                    bg={selected.status === "banned" ? "rgba(0,210,160,0.1)" : "rgba(255,77,109,0.1)"}
                                    border={selected.status === "banned" ? "rgba(0,210,160,0.25)" : "rgba(255,77,109,0.25)"}>
                                    {selected.status === "banned" ? "✓ Unban" : "⊘ Ban User"}
                                </Btn>
                            </div>
                        </>
                    ) : (
                        <>
                            <Field label="Full Name" value={editData.name} onChange={(v: string) => setEditData((p: any) => ({ ...p, name: v }))} />
                            <Field label="Email" value={editData.email} onChange={(v: string) => setEditData((p: any) => ({ ...p, email: v }))} type="email" />
                            <Field label="Role" value={editData.role} onChange={(v: string) => setEditData((p: any) => ({ ...p, role: v }))} options={["User", "Doctor", "NGO", "Admin"]} type="select" />
                            <Field label="Trust Score" value={editData.trust} onChange={(v: string) => setEditData((p: any) => ({ ...p, trust: Number(v) }))} type="number" />
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, borderTop: `1px solid ${G.border}`, paddingTop: 18, marginTop: 8 }}>
                                <Btn onClick={() => setEditMode(false)}>Cancel</Btn>
                                <Btn onClick={saveEdit} color="#fff" bg="rgba(0,210,160,0.15)" border="rgba(0,210,160,0.3)">Save Changes</Btn>
                            </div>
                        </>
                    )}
                </Modal>
            )}
        </div>
    );
});

UsersPage.displayName = "UsersPage";

export default UsersPage;
