"use client";

import React, { memo } from "react";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";
import { G, statusStyle, typeColor, BadgeStyle } from "./Styles";
import { Card, StatCard, Tip, Badge, TrustRing } from "./CommonComponents";
import { userGrowth, ambulanceData, pieData, trendData, activityFeed } from "./Data";

interface Emergency {
    id: string;
    type: string;
    pt: string;
    loc: string;
    status: string;
    time: string;
    trust: number;
}

interface User {
    id: string;
    trust: number;
}

interface OverviewPageProps {
    emergencies: Emergency[];
    users: User[];
    reports: any[];
    verifications: any[];
}

const OverviewPage = memo(({ emergencies, users, reports, verifications }: OverviewPageProps) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                {[
                    { icon: "👥", label: "Total Users", value: users.length.toString(), delta: 12, accent: G.blue, spark: userGrowth.map(d => ({ v: d.u })) },
                    { icon: "🚨", label: "Active Emergencies", value: emergencies.filter(e => e.status === "live").length.toString(), delta: -3, accent: G.red, spark: [8, 12, 9, 14, 11, 14].map(v => ({ v })) },
                    { icon: "⏱", label: "Avg Response", value: "9.4m", delta: -5, accent: G.amber, spark: ambulanceData.slice(0, 6).map(d => ({ v: d.v })) },
                    { icon: "✅", label: "Fulfilled Today", value: "1,248", delta: 8, accent: G.green, spark: [30, 38, 45, 50, 55, 60].map(v => ({ v })) },
                ].map((s, i) => (
                    <div key={i} className="anim" style={{ animationDelay: `${i * 0.07}s` }}><StatCard {...s} /></div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 14 }}>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.025em" }}>Ambulance Response Timeline</div>
                            <div style={{ fontSize: 10, color: G.muted, marginTop: 3 }}>24h average dispatch minutes · Target: 8 min</div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={175}>
                        <AreaChart data={ambulanceData} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                            <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={G.amber} stopOpacity={0.32} />
                                <stop offset="100%" stopColor={G.amber} stopOpacity={0} />
                            </linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="t" tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            <Area type="monotone" dataKey="v" name="Avg (min)" stroke={G.amber} strokeWidth={2} fill="url(#ag)" dot={false} activeDot={{ r: 4, fill: G.amber, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 3 }}>Emergency Types</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>Distribution this month</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ flexShrink: 0 }}>
                            <ResponsiveContainer width={118} height={118}>
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={34} outerRadius={54} paddingAngle={3} dataKey="value" stroke="none">
                                        {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <Tooltip content={<Tip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
                            {pieData.map((p, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0, boxShadow: `0 0 5px ${p.color}` }} />
                                    <span style={{ fontSize: 10, color: G.muted, flex: 1 }}>{p.name}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: G.text }}>{p.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Emergency Trends</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>Monthly volume by category</div>
                    <ResponsiveContainer width="100%" height={158}>
                        <BarChart data={trendData} barSize={5} barCategoryGap="38%" margin={{ top: 0, right: 4, bottom: 0, left: -22 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="m" tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            {[["blood", "Blood", "#ff4d6d"], ["amb", "Ambulance", "#ff9f43"], ["icu", "ICU", "#54a0ff"], ["organ", "Organ", "#a29bfe"]].map(([k, n, c]) => (
                                <Bar key={k} dataKey={k} name={n} fill={c} radius={[3, 3, 0, 0]} opacity={0.9} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Trust Score Distribution</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 22 }}>All registered users · {users.length} total</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                            { label: "High Trust", range: "80–100", n: users.filter(u => u.trust >= 80).length, col: G.green },
                            { label: "Medium", range: "60–79", n: users.filter(u => u.trust >= 60 && u.trust < 80).length, col: G.amber },
                            { label: "Low Trust", range: "40–59", n: users.filter(u => u.trust >= 40 && u.trust < 60).length, col: G.amber },
                            { label: "At-Risk", range: "<40", n: users.filter(u => u.trust < 40).length, col: G.red },
                        ].map((b, i) => {
                            const pct = users.length > 0 ? Math.round((b.n / users.length) * 100) : 0;
                            return (
                                <div key={i}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                            <span style={{ fontSize: 11, fontWeight: 600, color: G.text }}>{b.label}</span>
                                            <span style={{ fontSize: 9, color: G.dim, fontFamily: "monospace" }}>{b.range}%</span>
                                        </div>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: b.col }}>{b.n}</span>
                                            <span style={{ fontSize: 10, color: G.dim }}>{pct}%</span>
                                        </div>
                                    </div>
                                    <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${pct}%`, background: b.col, borderRadius: 99, boxShadow: `0 0 8px ${b.col}50` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 14 }}>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Recent Emergencies</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 16 }}>Latest activity across the platform</div>
                    {emergencies.slice(0, 5).map((em, i) => {
                        const s: BadgeStyle = statusStyle[em.status] || statusStyle.pending;
                        const tc: string = typeColor[em.type] || G.muted;
                        return (
                            <div key={i} className="rh" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, transition: "background 0.2s", marginBottom: 2 }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", background: tc, boxShadow: `0 0 5px ${tc}`, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 500, color: G.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{em.pt}</div>
                                    <div style={{ fontSize: 9, color: G.muted }}>{em.type} · {em.loc} · {em.time} ago</div>
                                </div>
                                <Badge {...s} />
                                <TrustRing val={em.trust} />
                            </div>
                        );
                    })}
                </Card>
                <Card style={{ padding: "22px 24px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Activity Feed</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 20 }}>Real-time system events</div>
                    <div style={{ flex: 1, overflowY: "auto" }}>
                        {activityFeed.map((a, i) => (
                            <div key={i} style={{ display: "flex", gap: 11, marginBottom: 16 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, border: `1px solid ${G.border}` }}>{a.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 11, color: G.text, lineHeight: 1.4 }}>{a.text}</div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                                        <span style={{ fontSize: 9, color: a.tag, fontWeight: 800 }}>{a.tag === "#ff4d6d" ? "ALERT" : "SYSTEM"}</span>
                                        <span style={{ fontSize: 8, color: G.dim }}>{a.t}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
});

OverviewPage.displayName = "OverviewPage";

export default OverviewPage;
