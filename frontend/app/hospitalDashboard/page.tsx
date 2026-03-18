'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HospitalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'emergencies' | 'beds'>('overview');

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (!token || role !== 'hospitalstaff') {
      router.push('/login');
    } else {
      setUser({ name: name || 'Staff Member', role: 'Hospital Staff' });
    }
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!mounted || !user) return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #0d9488', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const vitals = [
    { label: 'Active Emergencies', value: '12', delta: '+2', color: '#dc2626', icon: '🚨', bg: '#fee2e2' },
    { label: 'ICU Beds Available', value: '8 / 24', delta: null, color: '#0891b2', icon: '🛏️', bg: '#cffafe' },
    { label: 'Pending Verifications', value: '4', delta: '-1', color: '#f59e0b', icon: '📋', bg: '#fef3c7' },
    { label: 'System Status', value: 'Operational', delta: null, color: '#059669', icon: '✅', bg: '#d1fae5' },
  ];

  const emergencies = [
    { id: 'EM-0091', type: 'Blood Donation', patient: 'Aarav Sharma', urgency: 'Critical', time: '3m ago', status: 'live' },
    { id: 'EM-0090', type: 'ICU Bed', patient: 'Priya Thapa', urgency: 'High', time: '12m ago', status: 'live' },
    { id: 'EM-0089', type: 'Ambulance', patient: 'Rohan KC', urgency: 'Medium', time: '28m ago', status: 'pending' },
    { id: 'EM-0088', type: 'Organ Match', patient: 'Sita Basnet', urgency: 'Urgent', time: '1h ago', status: 'matched' },
  ];

  const beds = [
    { ward: 'ICU', total: 24, available: 8, color: '#0891b2' },
    { ward: 'General', total: 80, available: 32, color: '#059669' },
    { ward: 'Pediatric', total: 20, available: 5, color: '#7c3aed' },
    { ward: 'Maternity', total: 16, available: 9, color: '#be185d' },
  ];

  const actions = [
    { icon: '🆘', title: 'Post Emergency Alert', desc: 'Broadcast critical needs to the platform.', color: '#dc2626', bg: '#fee2e2' },
    { icon: '🩸', title: 'Request Blood Units', desc: 'Match donors to current patient needs.', color: '#be185d', bg: '#fce7f3' },
    { icon: '📋', title: 'Verify Patient Docs', desc: 'Review and approve incoming submissions.', color: '#f59e0b', bg: '#fef3c7' },
    { icon: '🗺️', title: 'Live Hospital Map', desc: 'View real-time network across hospitals.', color: '#0891b2', bg: '#cffafe' },
  ];

  const urgencyColor: Record<string, string> = {
    Critical: '#dc2626', High: '#f59e0b', Medium: '#0891b2', Urgent: '#7c3aed'
  };
  const statusColor: Record<string, string> = {
    live: '#dc2626', pending: '#f59e0b', matched: '#059669'
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0fdf4;}
        .hd-root{min-height:100vh;background:linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 40%,#f0f9ff 100%);font-family:'Plus Jakarta Sans',sans-serif;color:#0c1a2e;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.5);}70%{box-shadow:0 0 0 9px rgba(220,38,38,0);}}
        .hd-anim{animation:fadeUp 0.5s ease both;}
        .hd-anim-d1{animation-delay:0.07s;}
        .hd-anim-d2{animation-delay:0.13s;}
        .hd-anim-d3{animation-delay:0.19s;}
        .hd-blink{animation:blink 1.6s ease-in-out infinite;}
        .hd-pulse{animation:pulse 2s infinite;}

        /* NAV */
        .hd-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(240,253,244,0.88);backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(13,148,136,0.18);
          padding:0 32px;height:64px;
          display:flex;align-items:center;justify-content:space-between;
        }
        .hd-brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
        .hd-brand-icon{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#0d9488,#059669);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(13,148,136,0.35);}
        .hd-brand-name{font-size:18px;font-weight:800;color:#0c1a2e;letter-spacing:-0.4px;}
        .hd-brand-name span{color:#0d9488;}
        .hd-nav-center{display:flex;align-items:center;gap:4px;}
        .hd-tab{padding:7px 16px;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;background:none;border:none;font-family:inherit;color:#64748b;transition:all 0.2s;}
        .hd-tab:hover{background:rgba(13,148,136,0.08);color:#0f766e;}
        .hd-tab.active{background:rgba(13,148,136,0.12);color:#0f766e;border:1.5px solid rgba(13,148,136,0.2);}
        .hd-nav-right{display:flex;align-items:center;gap:10px;}
        .hd-staff-badge{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:4px 12px;border-radius:20px;background:rgba(13,148,136,0.1);color:#0f766e;border:1px solid rgba(13,148,136,0.25);}
        .hd-logout-btn{font-size:13px;font-weight:600;color:#64748b;background:none;border:1.5px solid #e2e8f0;border-radius:8px;padding:7px 16px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
        .hd-logout-btn:hover{color:#dc2626;border-color:#fecaca;background:#fff5f5;}

        /* HERO */
        .hd-hero{max-width:1200px;margin:0 auto;padding:36px 32px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;}
        .hd-hero-eyebrow{font-size:11px;font-weight:700;color:#0d9488;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;display:flex;align-items:center;gap:8px;}
        .hd-live-dot{width:7px;height:7px;border-radius:50%;background:#dc2626;display:inline-block;}
        .hd-live-dot.hd-blink{animation:blink 1.4s ease-in-out infinite;}
        .hd-hero-title{font-size:clamp(24px,3.5vw,34px);font-weight:800;color:#0c1a2e;letter-spacing:-0.03em;line-height:1.1;}
        .hd-hero-title span{color:#0d9488;}
        .hd-hero-sub{font-size:13px;color:#64748b;margin-top:6px;}
        .hd-time{text-align:right;}
        .hd-time-val{font-size:30px;font-weight:800;color:#0c1a2e;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;}
        .hd-time-sub{font-size:11px;color:#94a3b8;margin-top:3px;}

        /* VITALS */
        .hd-vitals{max-width:1200px;margin:24px auto 0;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .hd-vital{background:#fff;border:1px solid rgba(13,148,136,0.14);border-radius:16px;padding:18px 20px;display:flex;align-items:center;gap:14px;transition:all 0.2s;box-shadow:0 2px 8px rgba(13,148,136,0.06);}
        .hd-vital:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(13,148,136,0.13);}
        .hd-vital-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
        .hd-vital-val{font-size:20px;font-weight:800;letter-spacing:-0.03em;}
        .hd-vital-lbl{font-size:11px;color:#94a3b8;font-weight:500;margin-top:2px;}
        .hd-vital-delta{font-size:10px;font-weight:700;margin-top:4px;padding:2px 7px;border-radius:20px;}

        /* CONTENT */
        .hd-content{max-width:1200px;margin:24px auto 0;padding:0 32px;display:grid;grid-template-columns:2fr 1fr;gap:20px;}

        /* SECTION HEADER */
        .hd-section-hd{display:flex;align-items:center;gap:10px;margin-bottom:16px;}
        .hd-section-line{width:3px;height:20px;border-radius:2px;background:linear-gradient(180deg,#0d9488,#059669);}
        .hd-section-title{font-size:15px;font-weight:800;color:#0c1a2e;letter-spacing:-0.02em;}

        /* EMERGENCY TABLE */
        .hd-em-card{background:#fff;border:1px solid rgba(13,148,136,0.14);border-radius:20px;padding:22px;box-shadow:0 2px 10px rgba(13,148,136,0.06);}
        .hd-em-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid #f1f5f9;}
        .hd-em-row:last-child{border-bottom:none;padding-bottom:0;}
        .hd-em-id{font-size:10px;font-weight:700;color:#94a3b8;font-variant-numeric:tabular-nums;width:58px;flex-shrink:0;}
        .hd-em-info{flex:1;min-width:0;}
        .hd-em-type{font-size:13px;font-weight:700;color:#0c1a2e;}
        .hd-em-patient{font-size:11px;color:#94a3b8;margin-top:2px;}
        .hd-em-urgency{font-size:10px;font-weight:800;padding:3px 9px;border-radius:20px;flex-shrink:0;}
        .hd-em-time{font-size:10px;color:#94a3b8;flex-shrink:0;width:52px;text-align:right;}
        .hd-em-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}

        /* BED GRID */
        .hd-bed-card{background:#fff;border:1px solid rgba(13,148,136,0.14);border-radius:20px;padding:22px;box-shadow:0 2px 10px rgba(13,148,136,0.06);}
        .hd-bed-row{margin-bottom:18px;}
        .hd-bed-row:last-child{margin-bottom:0;}
        .hd-bed-hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;}
        .hd-bed-ward{font-size:13px;font-weight:700;color:#0c1a2e;}
        .hd-bed-count{font-size:12px;color:#64748b;}
        .hd-bed-bar-bg{height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;}
        .hd-bed-bar-fill{height:100%;border-radius:3px;transition:width 0.6s ease;}

        /* QUICK ACTIONS */
        .hd-actions{max-width:1200px;margin:20px auto 0;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .hd-action{background:#fff;border:1.5px solid rgba(13,148,136,0.12);border-radius:18px;padding:20px;transition:all 0.2s;box-shadow:0 2px 8px rgba(13,148,136,0.05);cursor:pointer;}
        .hd-action:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(13,148,136,0.13);border-color:rgba(13,148,136,0.3);}
        .hd-action-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px;}
        .hd-action-title{font-size:13px;font-weight:700;color:#0c1a2e;margin-bottom:4px;}
        .hd-action-desc{font-size:11px;color:#94a3b8;line-height:1.55;}

        /* FOOTER */
        .hd-footer{max-width:1200px;margin:28px auto 0;padding:20px 32px;border-top:1px solid rgba(13,148,136,0.12);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
        .hd-footer-brand{display:flex;align-items:center;gap:8px;}
        .hd-footer-logo{width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#0d9488,#059669);display:flex;align-items:center;justify-content:center;}
        .hd-footer-name{font-size:14px;font-weight:800;color:#0c1a2e;}
        .hd-footer-links{display:flex;gap:16px;}
        .hd-footer-link{font-size:12px;color:#94a3b8;text-decoration:none;font-weight:500;transition:color 0.2s;}
        .hd-footer-link:hover{color:#0d9488;}

        @media(max-width:900px){.hd-vitals{grid-template-columns:1fr 1fr;}.hd-content{grid-template-columns:1fr;}.hd-actions{grid-template-columns:1fr 1fr;}.hd-nav-center{display:none;}}
        @media(max-width:600px){.hd-vitals{grid-template-columns:1fr 1fr;}.hd-actions{grid-template-columns:1fr 1fr;}.hd-nav,.hd-hero,.hd-vitals,.hd-content,.hd-actions,.hd-footer{padding-left:16px;padding-right:16px;}}
      `}</style>

      <div className="hd-root">
        {/* NAV */}
        <nav className="hd-nav">
          <a href="/" className="hd-brand">
            <div className="hd-brand-icon">
              <svg width="18" height="18" viewBox="0 0 100 100" fill="white">
                <rect x="35" y="10" width="30" height="80" rx="6" />
                <rect x="10" y="35" width="80" height="30" rx="6" />
              </svg>
            </div>
            <span className="hd-brand-name">Med<span>Link</span></span>
          </a>
          <div className="hd-nav-center">
            {(['overview', 'emergencies', 'beds'] as const).map(t => (
              <button key={t} className={`hd-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="hd-nav-right">
            <span className="hd-staff-badge">🏥 Hospital Staff</span>
            <button onClick={handleLogout} className="hd-logout-btn">Sign Out</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="hd-hero hd-anim">
          <div>
            <div className="hd-hero-eyebrow">
              <span className={`hd-live-dot hd-blink`} />
              Live Monitor — {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <h1 className="hd-hero-title"><span>Hospital</span> Operations<br />Dashboard</h1>
            <p className="hd-hero-sub">Welcome back, {user.name} · Real-time facility overview</p>
          </div>
          <div className="hd-time">
            <div className="hd-time-val">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
            <div className="hd-time-sub">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {/* VITALS */}
        <div className="hd-vitals hd-anim hd-anim-d1">
          {vitals.map(v => (
            <div key={v.label} className="hd-vital">
              <div className="hd-vital-icon" style={{ background: v.bg }}>{v.icon}</div>
              <div>
                <div className="hd-vital-val" style={{ color: v.color }}>{v.value}</div>
                <div className="hd-vital-lbl">{v.label}</div>
                {v.delta && (
                  <div className="hd-vital-delta" style={{
                    background: v.delta.startsWith('+') ? '#fee2e2' : '#d1fae5',
                    color: v.delta.startsWith('+') ? '#dc2626' : '#059669'
                  }}>{v.delta} today</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="hd-content hd-anim hd-anim-d2">
          {/* Emergency List */}
          <div className="hd-em-card">
            <div className="hd-section-hd">
              <div className="hd-section-line" />
              <h2 className="hd-section-title">Active Emergencies</h2>
              <span style={{ fontSize: 10, fontWeight: 700, background: '#fee2e2', color: '#dc2626', padding: '3px 10px', borderRadius: 20 }}>
                12 Live
              </span>
            </div>
            {emergencies.map(e => (
              <div key={e.id} className="hd-em-row">
                <div className="hd-em-id">{e.id}</div>
                <div className="hd-em-info">
                  <div className="hd-em-type">{e.type}</div>
                  <div className="hd-em-patient">👤 {e.patient}</div>
                </div>
                <div className="hd-em-urgency" style={{
                  background: urgencyColor[e.urgency] + '18',
                  color: urgencyColor[e.urgency]
                }}>{e.urgency}</div>
                <div className="hd-em-dot" style={{ background: statusColor[e.status] }} />
                <div className="hd-em-time">{e.time}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <a href="/" style={{ fontSize: 12, color: '#0d9488', fontWeight: 700, textDecoration: 'none' }}>View All Emergencies →</a>
            </div>
          </div>

          {/* Bed Availability */}
          <div className="hd-bed-card">
            <div className="hd-section-hd">
              <div className="hd-section-line" />
              <h2 className="hd-section-title">Bed Availability</h2>
            </div>
            {beds.map(b => (
              <div key={b.ward} className="hd-bed-row">
                <div className="hd-bed-hd">
                  <span className="hd-bed-ward">{b.ward} Ward</span>
                  <span className="hd-bed-count" style={{ color: b.color, fontWeight: 700 }}>{b.available} / {b.total}</span>
                </div>
                <div className="hd-bed-bar-bg">
                  <div className="hd-bed-bar-fill" style={{
                    width: `${(b.available / b.total) * 100}%`,
                    background: b.color
                  }} />
                </div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4, textAlign: 'right' }}>
                  {Math.round((b.available / b.total) * 100)}% available
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="hd-actions hd-anim hd-anim-d3">
          {actions.map(a => (
            <div key={a.title} className="hd-action">
              <div className="hd-action-icon" style={{ background: a.bg }}>{a.icon}</div>
              <div className="hd-action-title">{a.title}</div>
              <div className="hd-action-desc">{a.desc}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="hd-footer">
          <div className="hd-footer-brand">
            <div className="hd-footer-logo">
              <svg width="12" height="12" viewBox="0 0 100 100" fill="white">
                <rect x="35" y="10" width="30" height="80" rx="6" />
                <rect x="10" y="35" width="80" height="30" rx="6" />
              </svg>
            </div>
            <span className="hd-footer-name">MedLink</span>
            <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>Hospital Portal © 2025</span>
          </div>
          <div className="hd-footer-links">
            <Link href="/" className="hd-footer-link">← Back to Homepage</Link>
            <a href="#" className="hd-footer-link">Help & Support</a>
            <a href="#" className="hd-footer-link">Toggle Fullscreen</a>
          </div>
        </footer>
      </div>
    </>
  );
}
