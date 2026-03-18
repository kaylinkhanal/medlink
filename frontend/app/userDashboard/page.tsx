'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (!token) {
      router.push('/login');
    } else {
      setUser({ name: name || 'User', role: role || 'user' });
    }
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!mounted || !user) return (
    <div style={{ minHeight: '100vh', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #0d9488', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const quickActions = [
    {
      icon: '🗺️', title: 'Live Emergency Map', desc: 'View nearby hospitals, active emergencies, and blood banks in real time.', color: '#0d9488', bg: 'linear-gradient(135deg,#ccfbf1,#99f6e4)', link: '/', badge: 'Live'
    },
    {
      icon: '🆘', title: 'Request Emergency Help', desc: 'Post a blood, ambulance, ICU bed, or organ request instantly.', color: '#dc2626', bg: 'linear-gradient(135deg,#fee2e2,#fecaca)', link: '/', badge: 'Urgent'
    },
    {
      icon: '🩸', title: 'Donate Blood', desc: 'Register as a blood donor and get matched with patients near you.', color: '#be185d', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', link: '/', badge: null
    },
    {
      icon: '🚑', title: 'Request Ambulance', desc: 'Dispatch a verified ambulance with live GPS tracking.', color: '#0891b2', bg: 'linear-gradient(135deg,#cffafe,#a5f3fc)', link: '/', badge: null
    },
    {
      icon: '🛏️', title: 'ICU Bed Finder', desc: 'Check real-time ICU and ward bed availability at partner hospitals.', color: '#1d4ed8', bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', link: '/', badge: null
    },
    {
      icon: '👤', title: 'My Profile & Docs', desc: 'Update your medical info, upload documents and earn verification badge.', color: '#7c3aed', bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', link: '/', badge: null
    },
  ];

  const stats = [
    { label: 'Trust Score', value: '—', icon: '⭐', color: '#f59e0b' },
    { label: 'Requests Made', value: '0', icon: '📋', color: '#0d9488' },
    { label: 'People Helped', value: '0', icon: '🤝', color: '#059669' },
    { label: 'Verified Status', value: 'Unverified', icon: '🔒', color: '#64748b' },
  ];

  const greeting = time.getHours() < 12 ? 'Good morning' : time.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f0f9ff;}
        .ud-root{min-height:100vh;background:linear-gradient(135deg,#f0f9ff 0%,#e0f7f4 50%,#f0f9ff 100%);font-family:'Plus Jakarta Sans',sans-serif;color:#0c1a2e;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(13,148,136,0.4);}70%{box-shadow:0 0 0 8px rgba(13,148,136,0);}}
        .ud-anim{animation:fadeUp 0.5s ease both;}
        .ud-anim-d1{animation-delay:0.05s;}
        .ud-anim-d2{animation-delay:0.1s;}
        .ud-anim-d3{animation-delay:0.15s;}
        .ud-anim-d4{animation-delay:0.2s;}

        /* NAV */
        .ud-nav{
          position:sticky;top:0;z-index:100;
          background:rgba(240,249,255,0.85);backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(13,148,136,0.15);
          padding:0 32px;height:64px;
          display:flex;align-items:center;justify-content:space-between;
        }
        .ud-brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
        .ud-brand-icon{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#0d9488,#0369a1);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(13,148,136,0.35);}
        .ud-brand-name{font-size:18px;font-weight:800;color:#0c1a2e;letter-spacing:-0.4px;}
        .ud-brand-name span{color:#0d9488;}
        .ud-nav-right{display:flex;align-items:center;gap:10px;}
        .ud-role-badge{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;padding:4px 12px;border-radius:20px;background:rgba(13,148,136,0.1);color:#0f766e;border:1px solid rgba(13,148,136,0.25);}
        .ud-logout-btn{font-size:13px;font-weight:600;color:#64748b;background:none;border:1.5px solid #e2e8f0;border-radius:8px;padding:7px 16px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
        .ud-logout-btn:hover{color:#dc2626;border-color:#fecaca;background:#fff5f5;}

        /* HERO HEADER */
        .ud-hero{
          max-width:1200px;margin:0 auto;padding:40px 32px 0;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;
        }
        .ud-greeting{font-size:13px;font-weight:600;color:#0d9488;margin-bottom:6px;display:flex;align-items:center;gap:6px;}
        .ud-live-dot{width:7px;height:7px;border-radius:50%;background:#0d9488;animation:pulse 2s infinite;}
        .ud-hero-title{font-size:clamp(26px,4vw,38px);font-weight:800;color:#0c1a2e;letter-spacing:-0.03em;line-height:1.1;}
        .ud-hero-title span{color:#0d9488;}
        .ud-hero-sub{font-size:14px;color:#64748b;margin-top:6px;line-height:1.6;}
        .ud-hero-time{text-align:right;}
        .ud-time-display{font-size:32px;font-weight:800;color:#0c1a2e;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;}
        .ud-time-date{font-size:12px;color:#94a3b8;margin-top:3px;}

        /* STATS BAR */
        .ud-stats{max-width:1200px;margin:28px auto 0;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
        .ud-stat{
          background:#fff;border:1px solid rgba(13,148,136,0.15);border-radius:16px;padding:18px 20px;
          display:flex;align-items:center;gap:14px;transition:all 0.2s;
          box-shadow:0 2px 10px rgba(13,148,136,0.06);
        }
        .ud-stat:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,148,136,0.12);}
        .ud-stat-icon{font-size:22px;flex-shrink:0;}
        .ud-stat-val{font-size:20px;font-weight:800;color:#0c1a2e;letter-spacing:-0.03em;}
        .ud-stat-lbl{font-size:11px;color:#94a3b8;font-weight:500;margin-top:2px;}

        /* SECTION */
        .ud-section{max-width:1200px;margin:32px auto 0;padding:0 32px;}
        .ud-section-hd{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
        .ud-section-line{width:3px;height:20px;border-radius:2px;background:linear-gradient(180deg,#0d9488,#0369a1);}
        .ud-section-title{font-size:16px;font-weight:800;color:#0c1a2e;letter-spacing:-0.02em;}
        .ud-section-badge{font-size:10px;font-weight:700;background:rgba(13,148,136,0.1);color:#0f766e;padding:3px 10px;border-radius:20px;}

        /* ACTION GRID */
        .ud-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .ud-action{
          background:#fff;border:1.5px solid rgba(13,148,136,0.12);border-radius:20px;padding:24px;
          text-decoration:none;display:block;transition:all 0.22s;position:relative;overflow:hidden;
          box-shadow:0 2px 10px rgba(13,148,136,0.06);
        }
        .ud-action::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,transparent 60%,rgba(13,148,136,0.04));
          pointer-events:none;
        }
        .ud-action:hover{transform:translateY(-4px);border-color:rgba(13,148,136,0.35);box-shadow:0 12px 32px rgba(13,148,136,0.14);}
        .ud-action-icon-wrap{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px;}
        .ud-action-badge{position:absolute;top:18px;right:18px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;padding:3px 9px;border-radius:20px;}
        .ud-action-title{font-size:15px;font-weight:700;color:#0c1a2e;margin-bottom:6px;letter-spacing:-0.01em;}
        .ud-action-desc{font-size:12px;color:#64748b;line-height:1.6;}
        .ud-action-arrow{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700;margin-top:14px;transition:gap 0.2s;}
        .ud-action:hover .ud-action-arrow{gap:8px;}

        /* FOOTER */
        .ud-footer{max-width:1200px;margin:32px auto 0;padding:24px 32px;border-top:1px solid rgba(13,148,136,0.12);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
        .ud-footer-brand{display:flex;align-items:center;gap:8px;}
        .ud-footer-logo{width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#0d9488,#0369a1);display:flex;align-items:center;justify-content:center;}
        .ud-footer-name{font-size:14px;font-weight:800;color:#0c1a2e;}
        .ud-footer-links{display:flex;gap:16px;}
        .ud-footer-link{font-size:12px;color:#94a3b8;text-decoration:none;font-weight:500;transition:color 0.2s;}
        .ud-footer-link:hover{color:#0d9488;}

        @media(max-width:900px){.ud-grid{grid-template-columns:1fr 1fr;}.ud-stats{grid-template-columns:1fr 1fr;}}
        @media(max-width:600px){.ud-grid{grid-template-columns:1fr;}.ud-stats{grid-template-columns:1fr 1fr;}.ud-nav{padding:0 16px;}.ud-hero,.ud-section,.ud-stats,.ud-footer{padding-left:16px;padding-right:16px;}}
      `}</style>

      <div className="ud-root">
        {/* NAV */}
        <nav className="ud-nav">
          <a href="/" className="ud-brand">
            <div className="ud-brand-icon">
              <svg width="18" height="18" viewBox="0 0 100 100" fill="white">
                <rect x="35" y="10" width="30" height="80" rx="6" />
                <rect x="10" y="35" width="80" height="30" rx="6" />
              </svg>
            </div>
            <span className="ud-brand-name">Med<span>Link</span></span>
          </a>
          <div className="ud-nav-right">
            <span className="ud-role-badge">👤 {user.role}</span>
            <button onClick={handleLogout} className="ud-logout-btn">Sign Out</button>
          </div>
        </nav>

        {/* HERO */}
        <div className="ud-hero ud-anim">
          <div>
            <div className="ud-greeting">
              <div className="ud-live-dot" />
              {greeting}, {user.name.split(' ')[0]}
            </div>
            <h1 className="ud-hero-title">Your <span>Emergency</span><br />Dashboard</h1>
            <p className="ud-hero-sub">Everything you need to request help, donate, and stay safe — right here.</p>
          </div>
          <div className="ud-hero-time">
            <div className="ud-time-display">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="ud-time-date">
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="ud-stats ud-anim ud-anim-d1">
          {stats.map(s => (
            <div key={s.label} className="ud-stat">
              <span className="ud-stat-icon">{s.icon}</span>
              <div>
                <div className="ud-stat-val" style={{ color: s.color }}>{s.value}</div>
                <div className="ud-stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="ud-section ud-anim ud-anim-d2">
          <div className="ud-section-hd">
            <div className="ud-section-line" />
            <h2 className="ud-section-title">Quick Actions</h2>
            <span className="ud-section-badge">6 available</span>
          </div>
          <div className="ud-grid">
            {quickActions.map(a => (
              <Link key={a.title} href={a.link} className="ud-action">
                {a.badge && (
                  <span className="ud-action-badge" style={{
                    background: a.color === '#dc2626' ? 'rgba(220,38,38,0.1)' : 'rgba(13,148,136,0.1)',
                    color: a.color
                  }}>{a.badge}</span>
                )}
                <div className="ud-action-icon-wrap" style={{ background: a.bg }}>
                  {a.icon}
                </div>
                <div className="ud-action-title">{a.title}</div>
                <div className="ud-action-desc">{a.desc}</div>
                <div className="ud-action-arrow" style={{ color: a.color }}>
                  Access → 
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* NOTICE / VERIFICATION CTA */}
        <div className="ud-section ud-anim ud-anim-d3" style={{ marginBottom: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg, #0d9488 0%, #0369a1 100%)',
            borderRadius: 20, padding: '28px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap',
            boxShadow: '0 8px 32px rgba(13,148,136,0.25)'
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                🔒 Account Unverified
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
                Get your Verified Badge
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Upload your ID or medical documents to gain higher trust visibility and priority matching.
              </div>
            </div>
            <Link href="/" style={{
              background: '#fff', color: '#0d9488', fontWeight: 700, fontSize: 14,
              padding: '11px 24px', borderRadius: 12, textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)', transition: 'transform 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0
            }}>
              Upload Documents →
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="ud-footer ud-anim ud-anim-d4">
          <div className="ud-footer-brand">
            <div className="ud-footer-logo">
              <svg width="12" height="12" viewBox="0 0 100 100" fill="white">
                <rect x="35" y="10" width="30" height="80" rx="6" />
                <rect x="10" y="35" width="80" height="30" rx="6" />
              </svg>
            </div>
            <span className="ud-footer-name">MedLink</span>
            <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>© 2025 Emergency Healthcare Platform</span>
          </div>
          <div className="ud-footer-links">
            <Link href="/" className="ud-footer-link">← Back to Homepage</Link>
            <a href="#" className="ud-footer-link">Help & Support</a>
            <a href="#" className="ud-footer-link">Privacy</a>
          </div>
        </footer>
      </div>
    </>
  );
}
