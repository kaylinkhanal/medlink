'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalHospitalMap from './components/HospitalMap';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) setUser({ role: role || 'user' });
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    router.refresh();
  };

  const categories = [
    { icon: '🩸', label: 'Blood Donation', color: '#dc2626', desc: 'Connect blood donors with patients in urgent need. Filter by blood group, location, and urgency in real time.' },
    { icon: '🚑', label: 'Ambulance Request', color: '#0891b2', desc: 'Dispatch ambulances with live GPS tracking. ETA shown to patients, helpers, and hospitals simultaneously.' },
    { icon: '❤️', label: 'Organ Donor', color: '#0d9488', desc: 'Time-critical organ matching across the verified hospital network with instant multi-channel alerts.' },
    { icon: '🛏️', label: 'ICU Bed Availability', color: '#1d4ed8', desc: 'Live capacity tracking across all partner hospitals. Navigate directly to the nearest available ICU bed.' },
    { icon: '💰', label: 'Emergency Funding', color: '#059669', desc: 'Launch verified fundraising campaigns for medical costs. Requires hospital documentation before going live.' },
    { icon: '🏥', label: 'General Medical', color: '#0369a1', desc: 'Broad emergency requests connecting patients with nearby doctors, NGOs, and community volunteers.' },
  ];

  const steps = [
    { num: '01', icon: '👤', title: 'Create Your Account', desc: 'Register with email or phone. Upload documents for a verified badge and higher trust visibility.' },
    { num: '02', icon: '📍', title: 'Enable Location', desc: 'Set your area and configure your emergency alert radius. Auto-detect or pick manually.' },
    { num: '03', icon: '🆘', title: 'Post or Browse', desc: 'Create a detailed emergency request or discover nearby crises on the live map.' },
    { num: '04', icon: '🤝', title: 'Get Matched', desc: 'Helpers tap "I Can Help." You review profiles and accept. Coordinate via in-app chat or call.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:      #0d9488;
          --teal-dark: #0f766e;
          --teal-lt:   #ccfbf1;
          --blue:      #1d4ed8;
          --blue-mid:  #0369a1;
          --blue-lt:   #dbeafe;
          --green:     #059669;
          --green-lt:  #d1fae5;
          --red:       #dc2626;
          --bg:        #f0f9ff;
          --bg2:       #e0f2fe;
          --surface:   #ffffff;
          --border:    #bae6fd;
          --border2:   #e0f2fe;
          --text:      #0c1a2e;
          --muted:     #475569;
          --muted2:    #94a3b8;
        }

        body { background: var(--bg); }

        .ml {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(240,249,255,0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 12px rgba(13,148,136,0.08);
        }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-brand-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, var(--teal), var(--blue-mid));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(13,148,136,0.35);
        }
        .nav-cross { position: relative; width: 16px; height: 16px; }
        .nav-cross::before, .nav-cross::after {
          content: ''; position: absolute; background: #fff; border-radius: 1.5px;
        }
        .nav-cross::before { width: 3.5px; height: 16px; left: 6.25px; top: 0; }
        .nav-cross::after  { width: 16px; height: 3.5px; top: 6.25px; left: 0; }
        .nav-brand-name { font-size: 19px; font-weight: 800; color: var(--text); letter-spacing: -0.4px; }
        .nav-brand-name span { color: var(--teal); }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-lnk {
          padding: 7px 15px; border-radius: 8px; font-size: 14px; font-weight: 500;
          color: var(--muted); text-decoration: none; transition: all 0.2s;
        }
        .nav-lnk:hover { color: var(--teal-dark); background: var(--teal-lt); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-role {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 4px 12px; border-radius: 20px;
          background: var(--teal-lt); color: var(--teal-dark); border: 1px solid rgba(13,148,136,0.25);
        }
        .btn-ghost {
          font-size: 14px; font-weight: 600; color: var(--muted);
          background: none; border: none; cursor: pointer; padding: 8px 16px;
          border-radius: 8px; font-family: inherit; transition: all 0.2s;
          text-decoration: none; display: inline-flex; align-items: center;
        }
        .btn-ghost:hover { color: var(--teal-dark); background: var(--teal-lt); }
        .btn-teal {
          font-size: 14px; font-weight: 700; color: #fff; padding: 9px 22px;
          background: linear-gradient(135deg, var(--teal), var(--blue-mid));
          border: none; border-radius: 9px; cursor: pointer; font-family: inherit;
          transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center;
          box-shadow: 0 4px 14px rgba(13,148,136,0.3);
        }
        .btn-teal:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(13,148,136,0.4); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 100px 48px 80px; position: relative; overflow: hidden;
        }
        .hero-mesh {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(13,148,136,0.13), transparent),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(29,78,216,0.1), transparent),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(5,150,105,0.06), transparent);
        }
        .hero-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(13,148,136,0.18) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
        }
        .hero-inner {
          max-width: 1160px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 440px; gap: 64px; align-items: center;
          position: relative;
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--teal-lt); border: 1px solid rgba(13,148,136,0.3);
          border-radius: 20px; padding: 6px 14px; margin-bottom: 24px;
          font-size: 12px; font-weight: 600; color: var(--teal-dark); letter-spacing: 0.02em;
        }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--teal);
          animation: pulse-live 1.8s ease-out infinite;
        }
        @keyframes pulse-live {
          0%   { box-shadow: 0 0 0 0 rgba(13,148,136,0.6); }
          70%  { box-shadow: 0 0 0 8px rgba(13,148,136,0); }
          100% { box-shadow: 0 0 0 0 rgba(13,148,136,0); }
        }
        .hero-title {
          font-size: clamp(42px, 5.5vw, 70px); font-weight: 800; line-height: 1.07;
          letter-spacing: -0.035em; color: var(--text); margin-bottom: 20px;
        }
        .hero-title em {
          font-family: 'Lora', serif; font-style: italic; font-weight: 600;
          color: var(--teal); display: inline;
        }
        .hero-desc {
          font-size: 17px; line-height: 1.78; color: var(--muted);
          max-width: 500px; margin-bottom: 36px;
        }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary {
          font-size: 15px; font-weight: 700; color: #fff; padding: 14px 28px;
          background: linear-gradient(135deg, var(--teal), var(--blue-mid));
          border-radius: 10px; text-decoration: none;
          transition: all 0.22s; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 6px 20px rgba(13,148,136,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(13,148,136,0.38); }
        .btn-secondary {
          font-size: 15px; font-weight: 600; color: var(--teal-dark); padding: 14px 24px;
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 10px; text-decoration: none; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-secondary:hover { border-color: var(--teal); background: var(--teal-lt); }
        .hero-note { margin-top: 18px; font-size: 13px; color: var(--muted2); display: flex; align-items: center; gap: 6px; }

        /* Hero right panel */
        .hero-panel { display: flex; flex-direction: column; gap: 14px; }
        .hcard {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 20px 22px;
          box-shadow: 0 2px 12px rgba(13,148,136,0.07); transition: box-shadow 0.2s;
        }
        .hcard:hover { box-shadow: 0 6px 24px rgba(13,148,136,0.13); }
        .hcard-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .hcard-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .hcard-label { font-size: 13px; font-weight: 700; color: var(--text); }
        .hcard-sub { font-size: 12px; color: var(--muted2); margin-top: 2px; }
        .bar-bg { height: 5px; background: var(--border2); border-radius: 3px; overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
        .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .stat-box {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 18px 20px;
          box-shadow: 0 2px 8px rgba(13,148,136,0.06);
        }
        .stat-num { font-size: 30px; font-weight: 800; color: var(--text); letter-spacing: -0.04em; }
        .stat-num sup { font-size: 16px; color: var(--teal); }
        .stat-lbl { font-size: 12px; color: var(--muted2); margin-top: 3px; line-height: 1.4; }

        /* ── SECTIONS ── */
        .section { padding: 80px 48px; max-width: 1200px; margin: 0 auto; }
        .divider { border: none; border-top: 1px solid var(--border2); margin: 0; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: var(--teal); margin-bottom: 14px;
        }
        .section-tag::before { content: ''; width: 18px; height: 2px; background: var(--teal); display: block; border-radius: 1px; }
        .section-title {
          font-size: clamp(28px, 3.5vw, 42px); font-weight: 800; color: var(--text);
          letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 10px;
        }
        .section-title em { font-family: 'Lora', serif; font-style: italic; font-weight: 600; color: var(--teal); }
        .section-desc { font-size: 16px; color: var(--muted); line-height: 1.72; max-width: 540px; margin-bottom: 48px; }

        /* ── CATEGORY PICKER ── */
        .cat-wrap { max-width: 1200px; margin: 0 auto; padding: 0 48px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }
        .cat-tabs { display: flex; flex-direction: column; gap: 6px; }
        .cat-tab {
          display: flex; align-items: center; gap: 14px; padding: 15px 18px;
          border-radius: 12px; cursor: pointer; transition: all 0.2s;
          border: 1.5px solid transparent;
        }
        .cat-tab.active { background: var(--surface); border-color: var(--border); box-shadow: 0 2px 12px rgba(13,148,136,0.1); }
        .cat-tab:hover:not(.active) { background: rgba(13,148,136,0.05); }
        .cat-icon { font-size: 22px; }
        .cat-name { font-size: 15px; font-weight: 600; color: var(--muted); flex: 1; transition: color 0.2s; }
        .cat-tab.active .cat-name { color: var(--text); }
        .cat-dot { width: 8px; height: 8px; border-radius: 50%; opacity: 0; transition: opacity 0.2s; }
        .cat-tab.active .cat-dot { opacity: 1; }
        .cat-detail {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 36px;
          box-shadow: 0 4px 24px rgba(13,148,136,0.1); position: sticky; top: 84px;
        }
        .cat-detail-icon { font-size: 44px; margin-bottom: 16px; display: block; }
        .cat-detail-badge {
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 12px; display: inline-block; padding: 4px 10px; border-radius: 20px;
          background: var(--teal-lt); color: var(--teal-dark);
        }
        .cat-detail-title { font-size: 24px; font-weight: 800; color: var(--text); letter-spacing: -0.02em; margin-bottom: 12px; }
        .cat-detail-desc { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; }
        .cat-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .cat-pill {
          font-size: 12px; font-weight: 600; padding: 5px 13px; border-radius: 20px;
          background: var(--bg2); color: var(--blue-mid);
          border: 1px solid var(--border);
        }

        /* ── FEATURES ── */
        .feat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .feat-card {
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 16px; padding: 26px 22px; transition: all 0.22s;
          box-shadow: 0 1px 6px rgba(13,148,136,0.06);
        }
        .feat-card:hover {
          border-color: var(--teal); transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(13,148,136,0.14);
        }
        .feat-icon { font-size: 24px; margin-bottom: 14px; display: block; }
        .feat-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: -0.01em; }
        .feat-desc { font-size: 13px; color: var(--muted); line-height: 1.7; }

        /* ── STEPS ── */
        .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; position: relative; }
        .steps-grid::before {
          content: ''; position: absolute;
          top: 27px; left: calc(12.5% + 24px); right: calc(12.5% + 24px);
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--blue-mid), var(--green));
          opacity: 0.35; border-radius: 1px;
        }
        .step { padding: 0 24px; text-align: center; position: relative; }
        .step-circle {
          width: 54px; height: 54px; border-radius: 50%;
          background: linear-gradient(135deg, var(--teal-lt), var(--blue-lt));
          border: 2px solid var(--teal); margin: 0 auto 22px;
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          box-shadow: 0 4px 14px rgba(13,148,136,0.2);
        }
        .step-num { font-size: 13px; font-weight: 800; color: var(--teal-dark); letter-spacing: 0.04em; }
        .step-icon { font-size: 20px; margin-bottom: 12px; display: block; }
        .step-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.7; }

        /* ── TRUST SECTION ── */
        .trust-wrap {
          background: linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 50%, #eff6ff 100%);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .trust-inner { max-width: 1200px; margin: 0 auto; padding: 80px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .trust-score-row { display: flex; align-items: baseline; gap: 8px; margin: 16px 0 24px; }
        .trust-big-num { font-size: 72px; font-weight: 800; color: var(--text); letter-spacing: -0.05em; line-height: 1; }
        .trust-big-label { font-size: 16px; color: var(--muted2); font-weight: 500; }
        .trust-bars { display: flex; flex-direction: column; gap: 10px; }
        .tbar { display: flex; align-items: center; gap: 14px; }
        .tbar-lbl { font-size: 13px; color: var(--muted); flex: 1; }
        .tbar-bg { width: 120px; height: 6px; background: rgba(13,148,136,0.12); border-radius: 3px; overflow: hidden; }
        .tbar-fill { height: 100%; border-radius: 3px; }
        .tbar-val { font-size: 12px; font-weight: 700; width: 44px; text-align: right; font-variant-numeric: tabular-nums; }

        /* ── VERIFICATION CARDS ── */
        .verify-list { display: flex; flex-direction: column; gap: 12px; }
        .vcard {
          display: flex; gap: 16px; align-items: flex-start; padding: 18px 20px;
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 14px; transition: all 0.2s;
          box-shadow: 0 1px 6px rgba(13,148,136,0.06);
        }
        .vcard:hover { border-color: var(--teal); box-shadow: 0 4px 16px rgba(13,148,136,0.13); }
        .vcard-icon { width: 42px; height: 42px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .vcard-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .vcard-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

        /* ── MAP ── */
        .map-section { border-top: 1px solid var(--border); }
        .map-topbar { max-width: 1200px; margin: 0 auto; padding: 44px 48px 28px; display: flex; align-items: flex-end; justify-content: space-between; }
        .map-live { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: var(--teal-dark); margin-bottom: 8px; }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: linear-gradient(135deg, #0d9488 0%, #0369a1 50%, #1d4ed8 100%);
          padding: 100px 48px; text-align: center; position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .cta-inner { max-width: 640px; margin: 0 auto; position: relative; }
        .cta-title {
          font-size: clamp(36px, 5vw, 58px); font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 16px;
        }
        .cta-title em { font-family: 'Lora', serif; font-style: italic; font-weight: 600; }
        .cta-desc { font-size: 17px; color: rgba(255,255,255,0.72); line-height: 1.7; margin-bottom: 36px; }
        .cta-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .btn-white {
          font-size: 15px; font-weight: 700; color: var(--teal-dark); padding: 13px 28px;
          background: #fff; border-radius: 10px; text-decoration: none;
          transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.2); }
        .btn-white-outline {
          font-size: 15px; font-weight: 600; color: #fff; padding: 13px 24px;
          background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 10px; text-decoration: none; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-white-outline:hover { background: rgba(255,255,255,0.2); }
        .cta-chips { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
        .cta-chip {
          font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 20px;
          background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.2);
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 32px 48px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-logo {
          width: 28px; height: 28px; border-radius: 7px;
          background: linear-gradient(135deg, var(--teal), var(--blue-mid));
          display: flex; align-items: center; justify-content: center;
        }
        .footer-cross { position: relative; width: 12px; height: 12px; }
        .footer-cross::before, .footer-cross::after { content: ''; position: absolute; background: #fff; border-radius: 1px; }
        .footer-cross::before { width: 2.5px; height: 12px; left: 4.75px; top: 0; }
        .footer-cross::after  { width: 12px; height: 2.5px; top: 4.75px; left: 0; }
        .footer-name { font-size: 16px; font-weight: 800; color: var(--text); letter-spacing: -0.2px; }
        .footer-copy { font-size: 13px; color: var(--muted2); }
        .footer-links { display: flex; gap: 24px; }
        .footer-link { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: var(--teal); }
      `}</style>

      <div className="ml">

        {/* NAV */}
        <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
          <a href="/" className="nav-brand">
            <div className="nav-brand-icon"><div className="nav-cross" /></div>
            <span className="nav-brand-name">Med<span>Link</span></span>
          </a>
          <div className="nav-links">
            {[['#emergency','Emergency'],['#features','Features'],['#how','How It Works'],['#map','Live Map']].map(([h,l]) => (
              <a key={l} href={h} className="nav-lnk">{l}</a>
            ))}
          </div>
          <div className="nav-right">
            {user ? (
              <>
                <span className="nav-role">{user.role}</span>
                <button onClick={handleLogout} className="btn-ghost">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">Login</Link>
                <Link href="/signup" className="btn-teal">Get Started</Link>
              </>
            )}
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-mesh" />
          <div className="hero-dots" />
          <div className="hero-inner">
            <div>
              <div className="live-badge">
                <div className="live-dot" />
                Emergency Response Platform · Live
              </div>
              <h1 className="hero-title">
                Every second counts.<br />
                <em>Save lives</em> with MedLink.
              </h1>
              <p className="hero-desc">
                Real-time emergency coordination connecting patients with blood donors, ambulances, ICU beds, organ donors, and community volunteers — all verified, all fast.
              </p>
              {!user ? (
                <div className="hero-ctas">
                  <Link href="/signup" className="btn-primary">🆘 Request Emergency Help</Link>
                  <Link href="/login" className="btn-secondary">Volunteer to Help →</Link>
                </div>
              ) : (
                <Link href="/dashboard" className="btn-primary">Go to Dashboard →</Link>
              )}
              <div className="hero-note">🛡️ QR-verified hospitals · Trust Score system · Blockchain-ready</div>
            </div>

            <div className="hero-panel">
              {[
                { icon: '🩸', label: 'Blood Requests', sub: 'Active nearby', bar: 72, color: '#dc2626', bg: '#fef2f2' },
                { icon: '🚑', label: 'Ambulance Dispatch', sub: 'Live tracking', bar: 88, color: '#0891b2', bg: '#ecfeff' },
                { icon: '🛏️', label: 'ICU Beds Available', sub: '3 hospitals reporting', bar: 45, color: '#1d4ed8', bg: '#eff6ff' },
              ].map(c => (
                <div key={c.label} className="hcard">
                  <div className="hcard-head">
                    <div className="hcard-icon" style={{ background: c.bg }}>{c.icon}</div>
                    <div>
                      <div className="hcard-label">{c.label}</div>
                      <div className="hcard-sub">{c.sub}</div>
                    </div>
                  </div>
                  <div className="bar-bg">
                    <div className="bar-fill" style={{ width: `${c.bar}%`, background: c.color }} />
                  </div>
                </div>
              ))}
              <div className="stat-row">
                <div className="stat-box">
                  <div className="stat-num">6<sup>+</sup></div>
                  <div className="stat-lbl">Emergency types covered</div>
                </div>
                <div className="stat-box">
                  <div className="stat-num" style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.4 }}>QR<br />Verified</div>
                  <div className="stat-lbl">Hospital network</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* EMERGENCY CATEGORIES */}
        <section id="emergency">
          <div className="section" style={{ paddingBottom: 32 }}>
            <div className="section-tag">Emergency Types</div>
            <h2 className="section-title">Six crises. <em>One platform.</em></h2>
            <p className="section-desc">From blood requests to ICU beds — MedLink handles every type of medical emergency with the right people and tools.</p>
          </div>
          <div className="cat-wrap">
            <div className="cat-tabs">
              {categories.map((c, i) => (
                <div key={c.label} className={`cat-tab${activeCategory === i ? ' active' : ''}`} onClick={() => setActiveCategory(i)}>
                  <span className="cat-icon">{c.icon}</span>
                  <span className="cat-name">{c.label}</span>
                  <div className="cat-dot" style={{ background: c.color }} />
                </div>
              ))}
            </div>
            <div className="cat-detail">
              <span className="cat-detail-icon">{categories[activeCategory].icon}</span>
              <div className="cat-detail-badge" style={{ color: categories[activeCategory].color, background: `${categories[activeCategory].color}18` }}>
                Emergency Category
              </div>
              <div className="cat-detail-title">{categories[activeCategory].label}</div>
              <div className="cat-detail-desc">{categories[activeCategory].desc}</div>
              <div className="cat-pills">
                {['Real-time alerts','Location-based','Verified helpers','Chat + Call'].map(p => (
                  <span key={p} className="cat-pill">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* FEATURES */}
        <section id="features" className="section">
          <div className="section-tag">Platform Features</div>
          <h2 className="section-title">Built for <em>speed</em> and trust.</h2>
          <p className="section-desc">Everything needed to coordinate a medical emergency from first alert to resolution.</p>
          <div className="feat-grid">
            {[
              { icon: '📍', name: 'Live Location Tracking', desc: 'Auto-detect or set manually. Color-coded markers, clustering, and Haversine distance sorting on an interactive map.' },
              { icon: '✅', name: 'QR Verification', desc: 'Hospitals issue QR codes. Patients scan on-site with doctor signature and timestamp — blockchain-ready.' },
              { icon: '💬', name: 'Real-time Messaging', desc: 'One-to-one and group emergency chats. Unread badges, message search, and direct in-app call escalation.' },
              { icon: '🔔', name: 'Smart Alerts', desc: 'Push, SMS, and email notifications. Configurable radius and emergency category preferences per user.' },
              { icon: '💰', name: 'Emergency Fundraising', desc: 'Verified campaigns with target amounts, patient stories, and mandatory hospital document approval.' },
              { icon: '🛡️', name: 'Trust Score System', desc: '0–100% dynamic score. Verifications, helping, and donations raise it. Flags and cancellations lower it.' },
              { icon: '👨‍💼', name: 'Admin Dashboard', desc: 'User moderation, emergency flagging, report queues, post review, and geographic analytics all in one panel.' },
              { icon: '🔐', name: 'Secure Auth + RBAC', desc: 'JWT with 7-day access and 30-day refresh tokens. Role-based access for Users, Doctors, NGOs, and Admins.' },
            ].map(f => (
              <div key={f.name} className="feat-card">
                <span className="feat-icon">{f.icon}</span>
                <div className="feat-name">{f.name}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* HOW IT WORKS */}
        <section id="how" className="section">
          <div className="section-tag">Process</div>
          <h2 className="section-title">How MedLink <em>works.</em></h2>
          <p className="section-desc">From signup to saving a life — here's how the platform coordinates emergency response.</p>
          <div className="steps-grid">
            {steps.map(s => (
              <div key={s.num} className="step">
                <div className="step-circle"><span className="step-num">{s.num}</span></div>
                <span className="step-icon">{s.icon}</span>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className="divider" />

        {/* TRUST + VERIFICATION */}
        <div className="trust-wrap" id="trust">
          <div className="trust-inner">
            <div>
              <div className="section-tag">Trust System</div>
              <h2 className="section-title">Your score.<br /><em>Your reputation.</em></h2>
              <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75 }}>
                Every action on MedLink affects your Trust Score — it determines how visible your emergency is, who sees your request first, and how the community reads your profile.
              </p>
              <div className="trust-score-row">
                <div className="trust-big-num">78</div>
                <div className="trust-big-label">/ 100 sample score</div>
              </div>
              <div className="trust-bars">
                {[
                  { l: 'Verification Approved', v: '+20%', pct: 100, pos: true },
                  { l: 'Emergency Fulfilled',   v: '+10%', pct: 50,  pos: true },
                  { l: 'Emergency Helped',       v: '+5%',  pct: 25,  pos: true },
                  { l: 'Donation Made',          v: '+3%',  pct: 15,  pos: true },
                  { l: 'Reported / Flagged',     v: '−20%', pct: 100, pos: false },
                  { l: 'Emergency Cancelled',    v: '−5%',  pct: 25,  pos: false },
                ].map(t => (
                  <div key={t.l} className="tbar">
                    <div className="tbar-lbl">{t.l}</div>
                    <div className="tbar-bg">
                      <div className="tbar-fill" style={{ width: `${t.pct}%`, background: t.pos ? 'var(--teal)' : '#dc2626' }} />
                    </div>
                    <div className="tbar-val" style={{ color: t.pos ? 'var(--teal-dark)' : '#dc2626' }}>{t.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-tag">Verification</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>Three tiers of trust.</h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 24 }}>
                MedLink uses a multi-layer verification system so every emergency is legitimate and every helper is trustworthy.
              </p>
              <div className="verify-list">
                {[
                  { icon: '🏥', bg: 'var(--teal-lt)', title: 'Hospital QR Verification', desc: 'Hospitals issue unique QR codes. Patients scan on-site — doctor signature and timestamp captured automatically.' },
                  { icon: '🪪', bg: 'var(--blue-lt)', title: 'User Document Upload', desc: 'Submit National ID, Medical Licence, or NGO Certificate. Admins review and approve through a dedicated queue.' },
                  { icon: '👨‍💼', bg: 'var(--green-lt)', title: 'Admin Moderation Layer', desc: 'Admins can flag emergencies, ban users, review reports, and monitor live analytics across the platform.' },
                ].map(v => (
                  <div key={v.title} className="vcard">
                    <div className="vcard-icon" style={{ background: v.bg }}>{v.icon}</div>
                    <div>
                      <div className="vcard-title">{v.title}</div>
                      <div className="vcard-desc">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <section id="map" className="map-section">
          <div className="map-topbar">
            <div>
              <div className="map-live"><div className="live-dot" /> Live · Updated in real time</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Find nearby hospitals <em>& emergencies.</em></h2>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted2)', maxWidth: 260, textAlign: 'right', lineHeight: 1.65 }}>
              Search hospitals, clinics, and active emergencies around any location worldwide.
            </p>
          </div>
          <GlobalHospitalMap />
        </section>

        {/* CTA BANNER */}
        {!user && (
          <div className="cta-banner">
            <div className="cta-inner">
              <h2 className="cta-title">Ready to <em>save</em> a life?</h2>
              <p className="cta-desc">Join MedLink free. Whether you're a patient, doctor, donor, or volunteer — your role matters in every crisis.</p>
              <div className="cta-btns">
                <Link href="/signup" className="btn-white">🆘 Create Free Account</Link>
                <Link href="/login" className="btn-white-outline">I Already Have an Account</Link>
              </div>
              <div className="cta-chips">
                {['Patient', 'Doctor', 'NGO', 'Volunteer', 'Blood Donor'].map(r => (
                  <span key={r} className="cta-chip">{r}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">
            <div className="footer-logo"><div className="footer-cross" /></div>
            <span className="footer-name">MedLink</span>
            <span className="footer-copy" style={{ marginLeft: 14 }}>© 2025 MedLink. Emergency Healthcare Platform.</span>
          </div>
          <div className="footer-links">
            {[['Privacy','#'],['Terms','#'],['Contact','#'],['Admin','/login']].map(([l,h]) => (
              <a key={l} href={h} className="footer-link">{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}