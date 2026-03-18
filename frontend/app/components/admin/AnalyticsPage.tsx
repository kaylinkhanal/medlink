"use client";

import React, { memo } from "react";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from "recharts";
import { G } from "./Styles";
import { Card, StatCard, Tip } from "./CommonComponents";
import { userGrowth, pieData } from "./Data";

// Data specific to analytics page
const analyticsMonthly = [
    { m: "Aug", fulfilled: 45, cancelled: 8, avgTime: 12.4 },
    { m: "Sep", fulfilled: 58, cancelled: 6, avgTime: 11.2 },
    { m: "Oct", fulfilled: 72, cancelled: 11, avgTime: 9.8 },
    { m: "Nov", fulfilled: 65, cancelled: 9, avgTime: 10.5 },
    { m: "Dec", fulfilled: 94, cancelled: 14, avgTime: 8.4 },
    { m: "Jan", fulfilled: 128, cancelled: 12, avgTime: 7.2 },
];

const AnalyticsPage = memo(() => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Analytics</div>
                <div style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>Platform performance · Aug 2025 – Jan 2026</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                {[
                    { icon: "📈", label: "Total Fulfilled", value: "462", delta: 18, accent: G.green },
                    { icon: "❌", label: "Cancellation Rate", value: "7.4%", delta: -2, accent: G.red },
                    { icon: "⏱", label: "Best Response", value: "5.4m", delta: 12, accent: G.blue },
                    { icon: "👥", label: "User Growth", value: "+391%", delta: 22, accent: G.violet },
                ].map((s, i) => <StatCard key={i} {...s} spark={[1, 2, 3, 4, 5, 6].map(v => ({ v: v * 10 + Math.random() * 20 }))} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Monthly Fulfillment vs Cancellations</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>Emergency outcomes over 6 months</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={analyticsMonthly} barSize={14} barCategoryGap="30%" margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="m" tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            <Bar dataKey="fulfilled" name="Fulfilled" fill={G.green} radius={[4, 4, 0, 0]} opacity={0.9} />
                            <Bar dataKey="cancelled" name="Cancelled" fill={G.red} radius={[4, 4, 0, 0]} opacity={0.9} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Avg Response Time Trend</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>Minutes per dispatch — improving over time</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={analyticsMonthly} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                            <defs><linearGradient id="rtG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={G.blue} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={G.blue} stopOpacity={0} />
                            </linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="m" tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            <Area type="monotone" dataKey="avgTime" name="Avg Response (min)" stroke={G.blue} strokeWidth={2} fill="url(#rtG)" dot={false} activeDot={{ r: 4, fill: G.blue, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>User Growth</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>Cumulative registrations</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={userGrowth} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                            <defs><linearGradient id="ugG" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={G.violet} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={G.violet} stopOpacity={0} />
                            </linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="m" tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: G.dim, fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<Tip />} />
                            <Area type="monotone" dataKey="u" name="Users" stroke={G.violet} strokeWidth={2} fill="url(#ugG)" dot={false} activeDot={{ r: 4, fill: G.violet, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                <Card style={{ padding: "22px 24px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.02em" }}>Emergency Distribution</div>
                    <div style={{ fontSize: 10, color: G.muted, marginBottom: 18 }}>By type — all time</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<Tip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                            {pieData.map((p, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, flexShrink: 0, boxShadow: `0 0 6px ${p.color}` }} />
                                    <span style={{ fontSize: 11, color: G.muted, flex: 1 }}>{p.name}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: G.text }}>{p.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
});

AnalyticsPage.displayName = "AnalyticsPage";

export default AnalyticsPage;
