"use client";

import { useState, useEffect, useRef } from "react";
import DigitalClock from "../../components/admin/DigitalClock";
import { G } from "../../components/admin/Styles";
import {
    initEmergencies, initUsers, initHospitals, initVerifications, initReports
} from "../../components/admin/Data";
import OverviewPage from "../../components/admin/OverviewPage";
import EmergenciesPage from "../../components/admin/EmergenciesPage";
import UsersPage from "../../components/admin/UsersPage";
import HospitalsPage from "../../components/admin/HospitalsPage";
import VerificationPage from "../../components/admin/VerificationPage";
import ReportsPage from "../../components/admin/ReportsPage";
import AnalyticsPage from "../../components/admin/AnalyticsPage";
import SettingsPage from "../../components/admin/SettingsPage";

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const navItems = [
    { id: "overview", label: "Overview", icon: "▦" },
    { id: "emergency", label: "Emergencies", icon: "◈" },
    { id: "users", label: "Users", icon: "◉" },
    { id: "hospitals", label: "Hospitals", icon: "✚" },
    { id: "verify", label: "Verification", icon: "◎" },
    { id: "reports", label: "Reports", icon: "⚑" },
    { id: "analytics", label: "Analytics", icon: "◫" },
    { id: "settings", label: "Settings", icon: "◌" },
];

const pageTitles: Record<string, string> = {
    overview: "System Overview",
    emergency: "Emergencies",
    users: "Users",
    hospitals: "Hospitals",
    verify: "Verification",
    reports: "Reports",
    analytics: "Analytics",
    settings: "Settings"
};

export default function MedLinkAdmin() {
    const [nav, setNav] = useState("overview");
    const [collapsed, setCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const [emergencies, setEmergencies] = useState(initEmergencies);
    const [users, setUsers] = useState(initUsers);
    const [hospitals, setHospitals] = useState(initHospitals);
    const [verifications, setVerifications] = useState(initVerifications);
    const [reports, setReports] = useState(initReports);
    const [adminProfile, setAdminProfile] = useState({
        name: "Admin",
        email: "admin@medlink.np",
        phone: "+977-9800000001",
        timezone: "Asia/Kathmandu"
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    const badges: Record<string, number> = {
        emergency: emergencies.filter(e => e.status === "live").length,
        verify: verifications.filter(v => v.status === "pending").length,
        reports: reports.filter(r => r.status === "open").length,
    };

    if (!mounted) return <div style={{ background: G.bg, height: "100vh" }} />;

    return (
        <div style={{ display: "flex", height: "100vh", background: G.bg, color: "#fff", fontFamily: "'Outfit',sans-serif", overflow: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.07);border-radius:99px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        .anim{animation:fadeUp 0.45s ease both;}
        .live{animation:blink 1.8s ease-in-out infinite;}
        .nbtn{transition:all 0.2s;border:1px solid transparent;cursor:pointer;font-family:inherit;}
        .nbtn:hover{background:rgba(255,255,255,0.05)!important;}
        .nbtn.act{background:rgba(255,77,109,0.09)!important;border-color:rgba(255,77,109,0.18)!important;color:#fff!important;}
        .rh:hover{background:rgba(255,255,255,0.028)!important;}
        .abtn{transition:all 0.15s;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;}
        .abtn:hover{opacity:0.75;transform:scale(0.97);}
        input,select{color:#e5e7eb;}
        input::placeholder{color:#4b5563;}
        select option{background:#0d0f18;}
      `}</style>

            {/* SIDEBAR */}
            <aside style={{
                width: collapsed ? 62 : 218, flexShrink: 0, display: "flex", flexDirection: "column",
                background: "rgba(6,8,15,0.95)", borderRight: `1px solid ${G.border}`,
                backdropFilter: "blur(30px)", transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                overflow: "hidden", position: "relative", zIndex: 20,
            }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,77,109,0.6),transparent)" }} />
                <div style={{ padding: collapsed ? "18px 13px" : "18px 18px", display: "flex", alignItems: "center", gap: 11, borderBottom: `1px solid ${G.border}`, flexShrink: 0 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 11, flexShrink: 0, background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                        boxShadow: "0 0 22px rgba(255,77,109,0.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800
                    }}>✚</div>
                    {!collapsed && <div>
                        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.025em", color: "#fff" }}>MedLink</div>
                        <div style={{ fontSize: 9, color: G.red, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85 }}>Admin Console</div>
                    </div>}
                </div>
                <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto", overflowX: "hidden" }}>
                    {navItems.map(item => {
                        const badge = badges[item.id] || 0;
                        return (
                            <button key={item.id} className={`nbtn${nav === item.id ? " act" : ""}`} onClick={() => setNav(item.id)}
                                style={{
                                    width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
                                    gap: 11, padding: collapsed ? "10px 11px" : "10px 13px", borderRadius: 11, marginBottom: 2,
                                    background: "transparent", color: nav === item.id ? "#fff" : G.muted, fontSize: 12, fontWeight: 600, position: "relative"
                                }}>
                                <span style={{ fontSize: 14, flexShrink: 0, opacity: nav === item.id ? 1 : 0.55 }}>{item.icon}</span>
                                {!collapsed && <span style={{ flex: 1, textAlign: "left", whiteSpace: "nowrap" }}>{item.label}</span>}
                                {!collapsed && badge > 0 && <span style={{ fontSize: 9, fontWeight: 800, background: G.red, color: "#fff", borderRadius: 6, padding: "2px 6px" }}>{badge}</span>}
                                {collapsed && badge > 0 && <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: G.red, boxShadow: `0 0 6px ${G.red}` }} />}
                            </button>
                        );
                    })}
                </nav>
                <div style={{ padding: "8px 8px 12px", borderTop: `1px solid ${G.border}`, flexShrink: 0 }}>
                    <button className="nbtn" onClick={() => setCollapsed(!collapsed)} style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
                        gap: 11, padding: "9px 13px", borderRadius: 11, background: "transparent", color: G.dim, fontSize: 12, fontWeight: 600
                    }}>
                        <span style={{ transition: "transform 0.3s", transform: collapsed ? "rotate(180deg)" : "none", fontSize: 11 }}>◀</span>
                        {!collapsed && "Collapse"}
                    </button>
                    {!collapsed && (
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 13px 0" }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0
                            }}>A</div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: G.text }}>{adminProfile.name}</div>
                                <div style={{ fontSize: 9, color: G.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin</div>
                            </div>
                            <span className="live" style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 6px ${G.green}`, marginLeft: "auto", flexShrink: 0 }} />
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header */}
                <header style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 28px", background: "rgba(5,6,10,0.85)", backdropFilter: "blur(30px)",
                    borderBottom: `1px solid ${G.border}`, flexShrink: 0, position: "relative",
                }}>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,77,109,0.15),transparent)" }} />
                    <div>
                        <h1 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>{pageTitles[nav]}</h1>
                        {mounted && <DigitalClock dimColor={G.dim} mutedColor={G.muted} />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(0,210,160,0.07)", border: "1px solid rgba(0,210,160,0.15)", borderRadius: 11, padding: "7px 14px" }}>
                            <span className="live" style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, display: "block", boxShadow: `0 0 8px ${G.green}` }} />
                            <span style={{ fontSize: 10, fontWeight: 800, color: G.green, letterSpacing: "0.1em" }}>ALL SYSTEMS GO</span>
                        </div>

                        {/* Admin Profile Button */}
                        <div ref={profileRef} style={{ position: "relative" }}>
                            <button onClick={() => setProfileOpen(!profileOpen)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 8, padding: "6px 10px 6px 6px",
                                    borderRadius: 11, background: profileOpen ? "rgba(255,77,109,0.1)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${profileOpen ? "rgba(255,77,109,0.3)" : G.border}`, cursor: "pointer", transition: "all 0.2s"
                                }}>
                                <div style={{
                                    width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                                    boxShadow: "0 0 12px rgba(255,77,109,0.35)", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff", flexShrink: 0
                                }}>A</div>
                                <div style={{ textAlign: "left" }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: G.text, whiteSpace: "nowrap" }}>{adminProfile.name}</div>
                                    <div style={{ fontSize: 9, color: G.muted, whiteSpace: "nowrap" }}>Admin</div>
                                </div>
                                <span style={{ fontSize: 10, color: G.muted, transition: "transform 0.2s", transform: profileOpen ? "rotate(180deg)" : "none" }}>▾</span>
                            </button>

                            {profileOpen && (
                                <div style={{
                                    position: "absolute", top: "calc(100% + 8px)", right: 0, width: 220,
                                    background: "#0d0f18", border: `1px solid ${G.border}`, borderRadius: 16,
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden", zIndex: 100
                                }}>
                                    <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${G.border}` }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#ff4d6d,#c9184a)",
                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0
                                            }}>A</div>
                                            <div>
                                                <div style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{adminProfile.name}</div>
                                                <div style={{ fontSize: 10, color: G.muted }}>{adminProfile.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {[
                                        { icon: "◌", label: "Settings", action: () => { setNav("settings"); setProfileOpen(false); } },
                                        { icon: "◫", label: "Analytics", action: () => { setNav("analytics"); setProfileOpen(false); } },
                                        { icon: "◈", label: "View Emergencies", action: () => { setNav("emergency"); setProfileOpen(false); } },
                                    ].map((item, i) => (
                                        <button key={i} onClick={item.action} style={{
                                            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px",
                                            background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit",
                                            color: G.muted, fontSize: 12, fontWeight: 500, textAlign: "left", transition: "background 0.2s"
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                            <span style={{ fontSize: 13 }}>{item.icon}</span>{item.label}
                                        </button>
                                    ))}
                                    <div style={{ padding: "8px 8px", borderTop: `1px solid ${G.border}` }}>
                                        <button onClick={() => setProfileOpen(false)} style={{
                                            width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 10px", borderRadius: 10,
                                            background: "rgba(255,77,109,0.08)", border: "1px solid rgba(255,77,109,0.2)", cursor: "pointer",
                                            fontFamily: "inherit", color: G.red, fontSize: 12, fontWeight: 700, transition: "background 0.2s"
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,77,109,0.15)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,77,109,0.08)"}>
                                            <span>⊗</span> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px 32px" }}>
                    <div className="anim" key={nav}>
                        {nav === "overview" && (
                            <OverviewPage
                                emergencies={emergencies}
                                users={users}
                                reports={reports}
                                verifications={verifications}
                            />
                        )}
                        {nav === "emergency" && (
                            <EmergenciesPage
                                emergencies={emergencies}
                                setEmergencies={setEmergencies}
                            />
                        )}
                        {nav === "users" && (
                            <UsersPage
                                users={users}
                                setUsers={setUsers}
                            />
                        )}
                        {nav === "hospitals" && (
                            <HospitalsPage
                                hospitals={hospitals}
                                setHospitals={setHospitals}
                            />
                        )}
                        {nav === "verify" && (
                            <VerificationPage
                                verifications={verifications}
                                setVerifications={setVerifications}
                                setUsers={setUsers}
                            />
                        )}
                        {nav === "reports" && (
                            <ReportsPage
                                reports={reports}
                                setReports={setReports}
                            />
                        )}
                        {nav === "analytics" && <AnalyticsPage />}
                        {nav === "settings" && (
                            <SettingsPage
                                adminProfile={adminProfile}
                                setAdminProfile={setAdminProfile}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}