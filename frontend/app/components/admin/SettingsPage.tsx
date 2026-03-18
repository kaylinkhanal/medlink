"use client";

import React, { useState, memo } from "react";
import { Card, Btn, Field, Badge } from "./CommonComponents";
import { G, BadgeStyle } from "./Styles";

interface AdminProfile {
    name: string;
    email: string;
    phone: string;
    timezone: string;
}

interface SettingsPageProps {
    adminProfile: AdminProfile;
    setAdminProfile: React.Dispatch<React.SetStateAction<AdminProfile>>;
}

const SettingsPage = memo(({ adminProfile, setAdminProfile }: SettingsPageProps) => {
    const [tab, setTab] = useState("profile");
    const [form, setForm] = useState<AdminProfile>({ ...adminProfile });
    const [saved, setSaved] = useState(false);
    const [notifs, setNotifs] = useState<Record<string, boolean>>({ email: true, sms: false, highPriority: true, newUser: false, verification: true });
    const [security, setSecurity] = useState<{ twoFA: boolean; sessionTimeout: string; logActivity: boolean }>({ twoFA: false, sessionTimeout: "7d", logActivity: true });

    const save = () => {
        setAdminProfile(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Settings</div>
                <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>Manage admin preferences and platform configuration</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
                {["profile", "notifications", "security", "platform"].map(t => (
                    <button key={t} onClick={() => setTab(t)} style={{
                        padding: "8px 16px", borderRadius: 10,
                        border: `1px solid ${tab === t ? "rgba(255,77,109,0.3)" : G.border}`,
                        background: tab === t ? "rgba(255,77,109,0.1)" : "transparent",
                        color: tab === t ? G.red : G.muted, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                        textTransform: "capitalize", transition: "all 0.2s"
                    }}>{t}</button>
                ))}
            </div>

            {tab === "profile" && (
                <Card style={{ padding: "28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, paddingBottom: 24, borderBottom: `1px solid ${G.border}` }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                            boxShadow: "0 0 30px rgba(255,77,109,0.35)", display: "flex", alignItems: "center",
                            justifyContent: "center", fontSize: 28, fontWeight: 800, flexShrink: 0
                        }}>A</div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{adminProfile.name}</div>
                            <div style={{ fontSize: 12, color: G.muted, marginTop: 3 }}>{adminProfile.email}</div>
                            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                                <span style={{ fontSize: 9, fontWeight: 800, color: G.red, background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)", borderRadius: 6, padding: "3px 8px", letterSpacing: "0.1em" }}>Admin</span>
                                <span style={{ fontSize: 9, fontWeight: 700, color: G.green, background: "rgba(0,210,160,0.1)", border: "1px solid rgba(0,210,160,0.2)", borderRadius: 6, padding: "3px 8px" }}>● Online</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <Field label="Full Name" value={form.name} onChange={(v: string) => setForm(p => ({ ...p, name: v }))} />
                        <Field label="Email" value={form.email} onChange={(v: string) => setForm(p => ({ ...p, email: v }))} type="email" />
                        <Field label="Phone" value={form.phone} onChange={(v: string) => setForm(p => ({ ...p, phone: v }))} />
                        <Field label="Timezone" value={form.timezone} onChange={(v: string) => setForm(p => ({ ...p, timezone: v }))} options={["Asia/Kathmandu", "UTC", "Asia/Kolkata", "America/New_York"]} type="select" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22, paddingTop: 22, borderTop: `1px solid ${G.border}` }}>
                        {saved && <span style={{ fontSize: 11, color: G.green, alignSelf: "center" }}>✓ Saved successfully!</span>}
                        <Btn onClick={save} color="#fff" bg="rgba(0,210,160,0.15)" border="rgba(0,210,160,0.3)">Save Changes</Btn>
                    </div>
                </Card>
            )}

            {tab === "notifications" && (
                <Card style={{ padding: "28px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Notification Preferences</div>
                    {[
                        { key: "email", label: "Email Notifications", desc: "Receive alerts via email" },
                        { key: "sms", label: "SMS Notifications", desc: "Receive SMS for critical alerts" },
                        { key: "highPriority", label: "High Priority Reports", desc: "Immediate alerts for HIGH severity reports" },
                        { key: "newUser", label: "New User Registrations", desc: "Notify when new users sign up" },
                        { key: "verification", label: "Verification Requests", desc: "Alert on new document submissions" },
                    ].map(({ key, label, desc }) => (
                        <div key={key} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "16px 0", borderBottom: `1px solid ${G.border}`
                        }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{label}</div>
                                <div style={{ fontSize: 10, color: G.muted, marginTop: 2 }}>{desc}</div>
                            </div>
                            <div onClick={() => setNotifs((p: any) => ({ ...p, [key]: !p[key] }))} style={{
                                width: 42, height: 24, borderRadius: 99, cursor: "pointer", transition: "background 0.3s",
                                background: notifs[key] ? "rgba(0,210,160,0.3)" : "rgba(255,255,255,0.08)",
                                border: `1px solid ${notifs[key] ? "rgba(0,210,160,0.5)" : "rgba(255,255,255,0.1)"}`,
                                display: "flex", alignItems: "center", padding: "0 3px",
                            }}>
                                <div style={{
                                    width: 18, height: 18, borderRadius: "50%", background: notifs[key] ? G.green : "rgba(255,255,255,0.4)",
                                    transition: "all 0.3s", transform: notifs[key] ? "translateX(18px)" : "translateX(0)", boxShadow: `0 0 6px ${notifs[key] ? G.green : "transparent"}`
                                }} />
                            </div>
                        </div>
                    ))}
                </Card>
            )}

            {tab === "security" && (
                <Card style={{ padding: "28px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Security Settings</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${G.border}` }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: G.text }}>Two-Factor Authentication</div>
                            <div style={{ fontSize: 10, color: G.muted, marginTop: 2 }}>Add an extra layer of security</div>
                        </div>
                        <div onClick={() => setSecurity((p: any) => ({ ...p, twoFA: !p.twoFA }))} style={{
                            width: 42, height: 24, borderRadius: 99, cursor: "pointer", transition: "background 0.3s",
                            background: security.twoFA ? "rgba(0,210,160,0.3)" : "rgba(255,255,255,0.08)",
                            border: `1px solid ${security.twoFA ? "rgba(0,210,160,0.5)" : "rgba(255,255,255,0.1)"}`,
                            display: "flex", alignItems: "center", padding: "0 3px"
                        }}>
                            <div style={{
                                width: 18, height: 18, borderRadius: "50%", background: security.twoFA ? G.green : "rgba(255,255,255,0.4)",
                                transition: "all 0.3s", transform: security.twoFA ? "translateX(18px)" : "translateX(0)", boxShadow: `0 0 6px ${security.twoFA ? G.green : "transparent"}`
                            }} />
                        </div>
                    </div>
                    <div style={{ padding: "16px 0", borderBottom: `1px solid ${G.border}` }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: 10 }}>Session Timeout</div>
                        <div style={{ display: "flex", gap: 8 }}>
                            {["24h", "7d", "30d", "never"].map(v => (
                                <button key={v} onClick={() => setSecurity((p: any) => ({ ...p, sessionTimeout: v }))} style={{
                                    padding: "6px 14px", borderRadius: 9, fontFamily: "inherit", cursor: "pointer", fontSize: 11, fontWeight: 700,
                                    border: `1px solid ${security.sessionTimeout === v ? "rgba(84,160,255,0.35)" : G.border}`,
                                    background: security.sessionTimeout === v ? "rgba(84,160,255,0.12)" : "transparent",
                                    color: security.sessionTimeout === v ? G.blue : G.muted, transition: "all 0.2s"
                                }}>{v}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ padding: "16px 0" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: 12 }}>Active Sessions</div>
                        {[{ dev: "Chrome · Kathmandu, NP", t: "Current session" },
                        { dev: "Mobile Safari · Kathmandu, NP", t: "2h ago" }].map((s, i) => (
                            <div key={i} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.03)", marginBottom: 8
                            }}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: G.text }}>{s.dev}</div>
                                    <div style={{ fontSize: 9, color: G.muted, marginTop: 2 }}>{s.t}</div>
                                </div>
                                {i === 0 ? <span style={{ fontSize: 9, color: G.green, background: "rgba(0,210,160,0.1)", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>● Active</span>
                                    : <Btn style={{ fontSize: 10, padding: "4px 10px" }} color={G.red} bg="rgba(255,77,109,0.08)" border="rgba(255,77,109,0.2)">Revoke</Btn>}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {tab === "platform" && (
                <Card style={{ padding: "28px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Platform Configuration</div>
                    {[
                        { label: "Maintenance Mode", desc: "Put the platform in read-only mode", val: false },
                        { label: "Auto-verify Hospitals", desc: "Auto-approve verified hospital QR scans", val: true },
                        { label: "Trust Score Decay", desc: "Reduce trust scores for inactive users monthly", val: true },
                        { label: "Emergency Email Alerts", desc: "Send email to admin for every new emergency", val: false },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "16px 0", borderBottom: i < 3 ? `1px solid ${G.border}` : "none"
                        }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{item.label}</div>
                                <div style={{ fontSize: 10, color: G.muted, marginTop: 2 }}>{item.desc}</div>
                            </div>
                            <div style={{
                                width: 42, height: 24, borderRadius: 99, cursor: "pointer",
                                background: item.val ? "rgba(0,210,160,0.3)" : "rgba(255,255,255,0.08)",
                                border: `1px solid ${item.val ? "rgba(0,210,160,0.5)" : "rgba(255,255,255,0.1)"}`,
                                display: "flex", alignItems: "center", padding: "0 3px"
                            }}>
                                <div style={{
                                    width: 18, height: 18, borderRadius: "50%", background: item.val ? G.green : "rgba(255,255,255,0.4)",
                                    transition: "all 0.3s", transform: item.val ? "translateX(18px)" : "translateX(0)"
                                }} />
                            </div>
                        </div>
                    ))}
                </Card>
            )}
        </div>
    );
});

SettingsPage.displayName = "SettingsPage";

export default SettingsPage;
