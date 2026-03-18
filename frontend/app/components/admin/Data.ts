export interface Emergency {
    id: string;
    type: string;
    pt: string;
    loc: string;
    status: string;
    time: string;
    trust: number;
    blood: string | null;
    helpers: number;
    reported: boolean;
}

export interface User {
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

export interface Hospital {
    id: string;
    name: string;
    loc: string;
    beds: number;
    icuFree: number;
    status: string;
    contact: string;
    verified: boolean;
}

export interface Verification {
    id: string;
    name: string;
    role: string;
    doc: string;
    ago: string;
    trust: number;
    userId: string | null;
    status: string;
}

export interface Report {
    id: string;
    target: string;
    targetType: string;
    reason: string;
    reporter: string;
    time: string;
    sev: string;
    status: string;
}

export const initEmergencies: Emergency[] = [
    { id: "EM-1042", type: "Blood", pt: "Ravi Thapa", loc: "Kathmandu", status: "live", time: "3m", trust: 92, blood: "O+", helpers: 2, reported: false },
    { id: "EM-1041", type: "Ambulance", pt: "Sita Sharma", loc: "Lalitpur", status: "fulfilled", time: "18m", trust: 87, blood: null, helpers: 1, reported: false },
    { id: "EM-1040", type: "ICU", pt: "Kiran Poudel", loc: "Bhaktapur", status: "pending", time: "35m", trust: 74, blood: null, helpers: 0, reported: false },
    { id: "EM-1039", type: "Organ", pt: "Mina Gurung", loc: "Pokhara", status: "live", time: "1h", trust: 95, blood: "AB−", helpers: 3, reported: false },
    { id: "EM-1038", type: "Blood", pt: "Hari KC", loc: "Kathmandu", status: "cancelled", time: "2h", trust: 55, blood: "B+", helpers: 0, reported: true },
    { id: "EM-1037", type: "ICU", pt: "Priya Adhikari", loc: "Lalitpur", status: "live", time: "45m", trust: 88, blood: null, helpers: 1, reported: false },
    { id: "EM-1036", type: "Blood", pt: "Suresh Panta", loc: "Pokhara", status: "fulfilled", time: "3h", trust: 79, blood: "A−", helpers: 2, reported: false },
    { id: "EM-1036", type: "Fundraise", pt: "Ram Bahadur", loc: "Chitwan", status: "pending", time: "5h", trust: 61, blood: null, helpers: 0, reported: false },
];

export const initUsers: User[] = [
    { id: "USR-001", name: "Dr. Anisha Rai", email: "anisha@doc.np", role: "Doctor", status: "active", trust: 78, joined: "Jan 12, 2026", emergencies: 3, verified: false },
    { id: "USR-002", name: "HelpNepal NGO", email: "help@nepalngo.org", role: "NGO", status: "active", trust: 65, joined: "Jan 8, 2026", emergencies: 7, verified: false },
    { id: "USR-003", name: "Bikash Tamang", email: "bikash@email.com", role: "User", status: "active", trust: 42, joined: "Dec 30, 2025", emergencies: 1, verified: false },
    { id: "USR-004", name: "Ravi Thapa", email: "ravi@email.com", role: "User", status: "active", trust: 92, joined: "Nov 15, 2025", emergencies: 5, verified: true },
    { id: "USR-005", name: "Dr. Priya Adhikari", email: "priya@doc.np", role: "Doctor", status: "active", trust: 88, joined: "Oct 20, 2025", emergencies: 12, verified: true },
    { id: "USR-006", name: "Sita Sharma", email: "sita@email.com", role: "User", status: "banned", trust: 15, joined: "Sep 5, 2025", emergencies: 0, verified: false },
    { id: "USR-007", name: "Kiran Poudel", email: "kiran@email.com", role: "User", status: "active", trust: 74, joined: "Dec 12, 2025", emergencies: 2, verified: true },
    { id: "USR-008", name: "Mina Gurung", email: "mina@email.com", role: "User", status: "active", trust: 95, joined: "Aug 3, 2025", emergencies: 8, verified: true },
];

export const initHospitals: Hospital[] = [
    { id: "HSP-001", name: "Bir Hospital", loc: "Kathmandu", beds: 120, icuFree: 4, status: "active", contact: "01-4221119", verified: true },
    { id: "HSP-002", name: "Tribhuvan University TH", loc: "Kathmandu", beds: 320, icuFree: 12, status: "active", contact: "01-4412303", verified: true },
    { id: "HSP-003", name: "Patan Hospital", loc: "Lalitpur", beds: 200, icuFree: 7, status: "active", contact: "01-5522266", verified: true },
    { id: "HSP-004", name: "Pokhara Regional", loc: "Pokhara", beds: 150, icuFree: 2, status: "active", contact: "061-520066", verified: false },
    { id: "HSP-005", name: "Chitwan Medical College", loc: "Chitwan", beds: 280, icuFree: 9, status: "active", contact: "056-524555", verified: true },
    { id: "HSP-006", name: "Bhaktapur Hospital", loc: "Bhaktapur", beds: 90, icuFree: 0, status: "full", contact: "01-6610798", verified: true },
];

export const initVerifications: Verification[] = [
    { id: "VER-001", name: "Dr. Anisha Rai", role: "Doctor", doc: "Medical License", ago: "2h ago", trust: 78, userId: "USR-001", status: "pending" },
    { id: "VER-002", name: "HelpNepal NGO", role: "NGO", doc: "NGO Certificate", ago: "5h ago", trust: 65, userId: "USR-002", status: "pending" },
    { id: "VER-003", name: "Bikash Tamang", role: "User", doc: "National ID", ago: "8h ago", trust: 42, userId: "USR-003", status: "pending" },
    { id: "VER-004", name: "Dr. Sara Thapa", role: "Doctor", doc: "Medical License", ago: "1d ago", trust: 81, userId: null, status: "pending" },
];

export const initReports: Report[] = [
    { id: "RPT-089", target: "EM-1015", targetType: "Emergency", reason: "Fake emergency", reporter: "user_4821", sev: "HIGH", time: "1h ago", status: "open" },
    { id: "RPT-088", target: "USR-006", targetType: "User", reason: "Spam messages", reporter: "user_9104", sev: "MED", time: "3h ago", status: "open" },
    { id: "RPT-087", target: "EM-1008", targetType: "Emergency", reason: "Already resolved", reporter: "user_2277", sev: "LOW", time: "6h ago", status: "open" },
    { id: "RPT-086", target: "USR-003", targetType: "User", reason: "False identity", reporter: "user_5512", sev: "MED", time: "1d ago", status: "resolved" },
];

export const ambulanceData = [
    { t: "00h", v: 8.2 }, { t: "02h", v: 6.1 }, { t: "04h", v: 5.4 }, { t: "06h", v: 9.8 },
    { t: "08h", v: 14.2 }, { t: "10h", v: 11.7 }, { t: "12h", v: 10.3 }, { t: "14h", v: 9.1 },
    { t: "16h", v: 13.5 }, { t: "18h", v: 15.8 }, { t: "20h", v: 12.4 }, { t: "22h", v: 9.6 },
];

export const trendData = [
    { m: "Aug", blood: 42, amb: 28, icu: 15, organ: 4 }, { m: "Sep", blood: 38, amb: 31, icu: 18, organ: 6 },
    { m: "Oct", blood: 55, amb: 35, icu: 22, organ: 5 }, { m: "Nov", blood: 61, amb: 29, icu: 19, organ: 8 },
    { m: "Dec", blood: 48, amb: 42, icu: 25, organ: 7 }, { m: "Jan", blood: 72, amb: 38, icu: 30, organ: 9 },
];

export const userGrowth = [
    { m: "Aug", u: 120 }, { m: "Sep", u: 185 }, { m: "Oct", u: 267 }, { m: "Nov", u: 342 }, { m: "Dec", u: 428 }, { m: "Jan", u: 591 },
];

export const pieData = [
    { name: "Blood", value: 38, color: "#ff4d6d" }, { name: "Ambulance", value: 24, color: "#ff9f43" },
    { name: "ICU", value: 18, color: "#54a0ff" }, { name: "Organ", value: 12, color: "#a29bfe" }, { name: "Other", value: 8, color: "#2d3561" },
];

export const activityFeed = [
    { icon: "🩸", text: "Blood request EM-1042 matched with donor", tag: "#ff4d6d", t: "09:04" },
    { icon: "🚑", text: "Ambulance EM-1041 delivered successfully", tag: "#00d2a0", t: "08:51" },
    { icon: "🚨", text: "Report RPT-089 escalated to HIGH", tag: "#ff4d6d", t: "08:30" },
    { icon: "📋", text: "Dr. Anisha Rai submitted verification docs", tag: "#54a0ff", t: "08:18" },
    { icon: "🛏️", text: "ICU EM-1040 — no helpers assigned yet", tag: "#ff9f43", t: "07:55" },
    { icon: "⚠️", text: "Trust −20% applied to user_3310", tag: "#ff4d6d", t: "07:11" },
];
