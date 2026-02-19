<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MedLink — README</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --teal:       #0d9488;
      --teal-dark:  #0f766e;
      --teal-lt:    #ccfbf1;
      --blue:       #1d4ed8;
      --blue-mid:   #0369a1;
      --blue-lt:    #dbeafe;
      --green:      #059669;
      --green-lt:   #d1fae5;
      --red:        #dc2626;
      --red-lt:     #fee2e2;
      --bg:         #f0f9ff;
      --surface:    #ffffff;
      --border:     #bae6fd;
      --border2:    #e0f2fe;
      --text:       #0c1a2e;
      --muted:      #475569;
      --muted2:     #94a3b8;
      --code-bg:    #0f172a;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.65;
    }

    /* ── SIDEBAR NAV ── */
    .sidebar {
      position: fixed; top: 0; left: 0; bottom: 0;
      width: 240px; background: var(--surface);
      border-right: 1px solid var(--border);
      padding: 28px 0; overflow-y: auto; z-index: 100;
    }

    .sidebar-brand {
      display: flex; align-items: center; gap: 10px;
      padding: 0 24px 24px; border-bottom: 1px solid var(--border2); margin-bottom: 16px;
    }

    .brand-icon {
      width: 34px; height: 34px; border-radius: 9px;
      background: linear-gradient(135deg, var(--teal), var(--blue-mid));
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .brand-cross { position: relative; width: 15px; height: 15px; }
    .brand-cross::before, .brand-cross::after {
      content: ''; position: absolute; background: #fff; border-radius: 1px;
    }
    .brand-cross::before { width: 3px; height: 15px; left: 6px; top: 0; }
    .brand-cross::after  { width: 15px; height: 3px; top: 6px; left: 0; }

    .brand-name { font-size: 17px; font-weight: 800; color: var(--text); letter-spacing: -0.3px; }
    .brand-name span { color: var(--teal); }

    .nav-section { padding: 4px 16px; margin-bottom: 4px; }
    .nav-section-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.14em; color: var(--muted2); padding: 0 8px; margin-bottom: 4px;
      display: block;
    }

    .nav-link {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 10px; border-radius: 8px; font-size: 13px; font-weight: 500;
      color: var(--muted); text-decoration: none; transition: all 0.18s;
    }
    .nav-link:hover { color: var(--teal-dark); background: var(--teal-lt); }
    .nav-link.active { color: var(--teal-dark); background: var(--teal-lt); font-weight: 600; }
    .nav-link .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); opacity: 0; transition: opacity 0.18s; }
    .nav-link:hover .dot, .nav-link.active .dot { opacity: 1; }

    /* ── MAIN CONTENT ── */
    .main { margin-left: 240px; min-height: 100vh; }

    /* ── HERO HEADER ── */
    .hero {
      background: linear-gradient(135deg, #0f766e 0%, #0369a1 55%, #1d4ed8 100%);
      padding: 72px 64px 60px; position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 30px 30px;
    }
    .hero-inner { position: relative; max-width: 760px; }

    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
      border-radius: 20px; padding: 5px 14px; margin-bottom: 22px;
      font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); letter-spacing: 0.04em;
    }
    .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 0 2px rgba(74,222,128,0.3); }

    .hero h1 {
      font-size: 48px; font-weight: 800; color: #fff;
      letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 16px;
    }
    .hero h1 span { opacity: 0.55; font-weight: 400; }

    .hero-desc { font-size: 17px; color: rgba(255,255,255,0.72); line-height: 1.75; margin-bottom: 32px; max-width: 580px; }

    .hero-pills { display: flex; gap: 10px; flex-wrap: wrap; }
    .hero-pill {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
      color: rgba(255,255,255,0.85);
    }

    .hero-stats {
      display: flex; gap: 40px; margin-top: 40px; padding-top: 32px;
      border-top: 1px solid rgba(255,255,255,0.15);
    }
    .hero-stat-num { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
    .hero-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-top: 2px; }

    /* ── CONTENT SECTIONS ── */
    .content { padding: 0 64px 80px; max-width: 900px; }

    .section { padding-top: 60px; }

    .section-anchor { display: block; height: 80px; margin-top: -80px; visibility: hidden; }

    .section-tag {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--teal); margin-bottom: 12px;
    }
    .section-tag::before { content: ''; width: 16px; height: 2px; background: var(--teal); display: block; border-radius: 1px; }

    h2 {
      font-size: 28px; font-weight: 800; color: var(--text);
      letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.15;
    }
    h3 {
      font-size: 18px; font-weight: 700; color: var(--text);
      letter-spacing: -0.02em; margin-bottom: 12px; margin-top: 28px;
    }
    p { font-size: 15px; color: var(--muted); line-height: 1.78; margin-bottom: 16px; }

    .divider { border: none; border-top: 1px solid var(--border2); margin: 56px 0 0; }

    /* ── TECH STACK BADGES ── */
    .stack-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
    .stack-badge {
      display: inline-flex; align-items: center; gap: 7px;
      font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 10px;
      background: var(--surface); border: 1.5px solid var(--border);
      color: var(--text); transition: all 0.18s;
    }
    .stack-badge:hover { border-color: var(--teal); background: var(--teal-lt); color: var(--teal-dark); }
    .stack-badge .icon { font-size: 16px; }

    /* ── FEATURES ── */
    .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
    .feat-card {
      background: var(--surface); border: 1.5px solid var(--border);
      border-radius: 14px; padding: 20px 22px; transition: all 0.2s;
    }
    .feat-card:hover { border-color: var(--teal); box-shadow: 0 4px 16px rgba(13,148,136,0.12); transform: translateY(-2px); }
    .feat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .feat-icon-wrap {
      width: 36px; height: 36px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
    }
    .feat-title { font-size: 14px; font-weight: 700; color: var(--text); }
    .feat-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }

    /* ── SCREENSHOTS ── */
    .screenshots-intro { font-size: 15px; color: var(--muted); margin-bottom: 24px; }
    .screenshots-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .screenshot-card {
      border-radius: 14px; overflow: hidden;
      border: 1.5px solid var(--border);
      box-shadow: 0 4px 16px rgba(13,148,136,0.08);
      transition: all 0.22s; background: var(--surface);
    }
    .screenshot-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(13,148,136,0.18); border-color: var(--teal); }
    .screenshot-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
    .screenshot-label {
      padding: 10px 14px; font-size: 12px; font-weight: 600;
      color: var(--muted); display: flex; align-items: center; gap: 6px;
      border-top: 1px solid var(--border2);
    }
    .screenshot-label::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--teal); flex-shrink: 0; }

    .screenshot-wide {
      grid-column: 1 / -1;
    }
    .screenshot-wide img { height: 260px; }

    /* ── SETUP STEPS ── */
    .setup-steps { display: flex; flex-direction: column; gap: 0; margin-top: 24px; counter-reset: step; }
    .setup-step {
      display: flex; gap: 20px; align-items: flex-start;
      padding: 20px 0; border-bottom: 1px solid var(--border2); position: relative;
    }
    .setup-step:last-child { border-bottom: none; }
    .step-num-circle {
      width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, var(--teal-lt), var(--blue-lt));
      border: 2px solid var(--teal); display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 800; color: var(--teal-dark);
    }
    .step-body {}
    .step-title { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
    .step-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin: 0; }

    /* ── CODE BLOCKS ── */
    .code-block {
      background: var(--code-bg); border-radius: 12px; overflow: hidden;
      border: 1px solid rgba(255,255,255,0.06); margin: 16px 0;
    }
    .code-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .code-lang {
      font-size: 11px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.1em; color: rgba(255,255,255,0.35);
    }
    .code-dots { display: flex; gap: 5px; }
    .code-dot { width: 10px; height: 10px; border-radius: 50%; }
    pre {
      padding: 16px 20px; overflow-x: auto; font-size: 13px; line-height: 1.7;
    }
    code {
      font-family: 'Fira Code', monospace; color: #a5f3fc;
    }
    code .kw  { color: #93c5fd; }
    code .str { color: #86efac; }
    code .cm  { color: #64748b; font-style: italic; }
    code .pn  { color: #fca5a5; }

    /* ── ENV TABLE ── */
    .env-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    .env-table th {
      text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--muted2); padding: 8px 14px;
      background: var(--border2); border-bottom: 1px solid var(--border);
    }
    .env-table th:first-child { border-radius: 8px 0 0 0; }
    .env-table th:last-child  { border-radius: 0 8px 0 0; }
    .env-table td { padding: 10px 14px; border-bottom: 1px solid var(--border2); vertical-align: top; }
    .env-table tr:last-child td { border-bottom: none; }
    .env-table tr:hover td { background: rgba(13,148,136,0.04); }
    .env-key { font-family: 'Fira Code', monospace; font-size: 12px; color: var(--blue-mid); font-weight: 500; }
    .env-desc { color: var(--muted); }
    .env-required {
      display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 7px;
      border-radius: 10px; background: var(--red-lt); color: var(--red); margin-left: 6px;
    }

    /* ── ROLES TABLE ── */
    .roles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 20px; }
    .role-card {
      background: var(--surface); border: 1.5px solid var(--border);
      border-radius: 14px; padding: 20px; transition: border-color 0.2s;
    }
    .role-card:hover { border-color: var(--teal); }
    .role-icon { font-size: 28px; margin-bottom: 10px; display: block; }
    .role-name { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
    .role-perms { display: flex; flex-direction: column; gap: 4px; }
    .role-perm { font-size: 12px; color: var(--muted); display: flex; align-items: flex-start; gap: 6px; }
    .role-perm::before { content: '→'; color: var(--teal); font-weight: 700; flex-shrink: 0; }

    /* ── CONTRIBUTING ── */
    .contrib-steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: 20px; position: relative; }
    .contrib-steps::before {
      content: ''; position: absolute; top: 22px; left: 10%; right: 10%;
      height: 2px; background: linear-gradient(90deg, var(--teal), var(--blue), var(--green));
      opacity: 0.3; border-radius: 1px;
    }
    .contrib-step { text-align: center; padding: 0 8px; }
    .cs-circle {
      width: 44px; height: 44px; border-radius: 50%; margin: 0 auto 12px;
      background: linear-gradient(135deg, var(--teal-lt), var(--blue-lt));
      border: 2px solid var(--teal); display: flex; align-items: center; justify-content: center;
      font-size: 16px; position: relative; z-index: 1; background-color: var(--bg);
    }
    .cs-label { font-size: 11px; font-weight: 600; color: var(--muted); line-height: 1.4; }

    /* ── FOOTER ── */
    .readme-footer {
      background: var(--surface); border-top: 1px solid var(--border);
      padding: 32px 64px; display: flex; align-items: center; justify-content: space-between;
    }
    .footer-brand { display: flex; align-items: center; gap: 10px; }
    .footer-mini-icon {
      width: 28px; height: 28px; border-radius: 7px;
      background: linear-gradient(135deg, var(--teal), var(--blue-mid));
      display: flex; align-items: center; justify-content: center;
    }
    .mini-cross { position: relative; width: 12px; height: 12px; }
    .mini-cross::before, .mini-cross::after { content: ''; position: absolute; background: #fff; border-radius: 1px; }
    .mini-cross::before { width: 2.5px; height: 12px; left: 4.75px; top: 0; }
    .mini-cross::after  { width: 12px; height: 2.5px; top: 4.75px; left: 0; }
    .footer-name { font-size: 15px; font-weight: 800; color: var(--text); }
    .footer-copy { font-size: 13px; color: var(--muted2); }

    /* ── CALLOUT ── */
    .callout {
      display: flex; gap: 14px; padding: 16px 20px; border-radius: 12px;
      background: var(--teal-lt); border: 1.5px solid rgba(13,148,136,0.25); margin: 16px 0;
    }
    .callout-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
    .callout-text { font-size: 14px; color: var(--teal-dark); line-height: 1.65; }

    /* Scrollbar */
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  </style>
</head>
<body>

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon"><div class="brand-cross"></div></div>
      <span class="brand-name">Med<span>Link</span></span>
    </div>

    <div class="nav-section">
      <span class="nav-section-label">Overview</span>
      <a href="#about" class="nav-link"><div class="dot"></div> About</a>
      <a href="#screenshots" class="nav-link"><div class="dot"></div> Screenshots</a>
      <a href="#tech" class="nav-link"><div class="dot"></div> Tech Stack</a>
    </div>

    <div class="nav-section">
      <span class="nav-section-label">Features</span>
      <a href="#features" class="nav-link"><div class="dot"></div> All Features</a>
      <a href="#roles" class="nav-link"><div class="dot"></div> User Roles</a>
    </div>

    <div class="nav-section">
      <span class="nav-section-label">Setup</span>
      <a href="#getting-started" class="nav-link"><div class="dot"></div> Getting Started</a>
      <a href="#env" class="nav-link"><div class="dot"></div> Environment Variables</a>
      <a href="#run" class="nav-link"><div class="dot"></div> Running the App</a>
    </div>

    <div class="nav-section">
      <span class="nav-section-label">Project</span>
      <a href="#contributing" class="nav-link"><div class="dot"></div> Contributing</a>
      <a href="#contact" class="nav-link"><div class="dot"></div> Contact</a>
    </div>
  </aside>

  <!-- MAIN -->
  <main class="main">

    <!-- HERO -->
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-badge">
          <div class="badge-dot"></div>
          Emergency Response Platform · Open Source
        </div>
        <h1>MedLink <span>— README</span></h1>
        <p class="hero-desc">
          A real-time emergency healthcare coordination platform connecting patients with blood donors, ambulances, ICU beds, organ donors, and verified community volunteers.
        </p>
        <div class="hero-pills">
          <span class="hero-pill">⚡ Next.js 14</span>
          <span class="hero-pill">🛡️ JWT Auth</span>
          <span class="hero-pill">📍 Live Maps</span>
          <span class="hero-pill">💬 Real-time Chat</span>
          <span class="hero-pill">✅ QR Verification</span>
        </div>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-num">6+</div>
            <div class="hero-stat-lbl">Emergency Types</div>
          </div>
          <div>
            <div class="hero-stat-num">10+</div>
            <div class="hero-stat-lbl">Feature Modules</div>
          </div>
          <div>
            <div class="hero-stat-num">4</div>
            <div class="hero-stat-lbl">User Roles</div>
          </div>
          <div>
            <div class="hero-stat-num">100%</div>
            <div class="hero-stat-lbl">Verified Hospitals</div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <!-- ABOUT -->
      <div class="section" id="about">
        <span class="section-anchor" id="about-anchor"></span>
        <div class="section-tag">About</div>
        <h2>What is MedLink?</h2>
        <p>
          MedLink is a full-stack emergency healthcare platform built to bridge the critical gap between patients in crisis and the resources they need — blood, ambulances, ICU beds, organ donors, and emergency funding. Every request is location-aware, every helper is verified, and every interaction is tracked for safety and accountability.
        </p>
        <p>
          The platform is built around a Trust Score system that rewards verified, consistent helpers and penalizes fraudulent activity — ensuring the community remains safe and reliable in the moments that matter most.
        </p>
        <div class="callout">
          <span class="callout-icon">💡</span>
          <span class="callout-text">MedLink is designed for real deployment in healthcare-critical environments. All emergencies require a minimum of one-step verification before going live to the community.</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- SCREENSHOTS -->
      <div class="section" id="screenshots">
        <span class="section-anchor"></span>
        <div class="section-tag">Screenshots</div>
        <h2>Platform Preview</h2>
        <p class="screenshots-intro">A look at the MedLink interface across key pages and features.</p>

        <div class="screenshots-grid">
          <div class="screenshot-card screenshot-wide">
            <img src="/public/med1.png" alt="MedLink Homepage Hero" onerror="this.style.background='linear-gradient(135deg,#0d9488,#0369a1)';this.style.height='260px';this.alt='med1.png'" />
            <div class="screenshot-label">Homepage — Hero Section</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med2.png" alt="Emergency Map" onerror="this.style.background='linear-gradient(135deg,#1d4ed8,#0891b2)';this.style.height='200px'" />
            <div class="screenshot-label">Live Emergency Map</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med3.png" alt="Emergency Creation" onerror="this.style.background='linear-gradient(135deg,#dc2626,#9f1239)';this.style.height='200px'" />
            <div class="screenshot-label">Emergency Creation Flow</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med4.png" alt="Blood Donation" onerror="this.style.background='linear-gradient(135deg,#be123c,#dc2626)';this.style.height='200px'" />
            <div class="screenshot-label">Blood Donation Request</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med5.png" alt="Messaging" onerror="this.style.background='linear-gradient(135deg,#059669,#0d9488)';this.style.height='200px'" />
            <div class="screenshot-label">Real-time Messaging</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med6.png" alt="Trust Score" onerror="this.style.background='linear-gradient(135deg,#7c3aed,#6d28d9)';this.style.height='200px'" />
            <div class="screenshot-label">Trust Score Dashboard</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med7.png" alt="Admin Panel" onerror="this.style.background='linear-gradient(135deg,#0369a1,#1d4ed8)';this.style.height='200px'" />
            <div class="screenshot-label">Admin Control Panel</div>
          </div>

          <div class="screenshot-card">
            <img src="/public/med8.png" alt="User Profile" onerror="this.style.background='linear-gradient(135deg,#0f766e,#0369a1)';this.style.height='200px'" />
            <div class="screenshot-label">User Profile & Verification</div>
          </div>

          <div class="screenshot-card screenshot-wide">
            <img src="/public/med9.png" alt="Hospital Finder" onerror="this.style.background='linear-gradient(135deg,#0d9488,#059669)';this.style.height='260px'" />
            <div class="screenshot-label">Hospital Finder — Live Map View</div>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- TECH STACK -->
      <div class="section" id="tech">
        <span class="section-anchor"></span>
        <div class="section-tag">Tech Stack</div>
        <h2>Built With</h2>
        <p>MedLink is built with a modern, production-ready stack focused on real-time performance, security, and scalability.</p>

        <h3>Frontend</h3>
        <div class="stack-grid">
          <span class="stack-badge"><span class="icon">⚡</span> Next.js 14</span>
          <span class="stack-badge"><span class="icon">🔷</span> TypeScript</span>
          <span class="stack-badge"><span class="icon">🎨</span> Tailwind CSS</span>
          <span class="stack-badge"><span class="icon">🗺️</span> MapLibre GL</span>
          <span class="stack-badge"><span class="icon">🔥</span> React Hot Toast</span>
          <span class="stack-badge"><span class="icon">📡</span> Socket.io Client</span>
        </div>

        <h3>Backend</h3>
        <div class="stack-grid">
          <span class="stack-badge"><span class="icon">🟢</span> Node.js</span>
          <span class="stack-badge"><span class="icon">🚂</span> Express.js</span>
          <span class="stack-badge"><span class="icon">🍃</span> MongoDB + Mongoose</span>
          <span class="stack-badge"><span class="icon">📡</span> Socket.io</span>
          <span class="stack-badge"><span class="icon">🔐</span> JWT Auth</span>
          <span class="stack-badge"><span class="icon">☁️</span> Cloudinary</span>
        </div>

        <h3>APIs & Services</h3>
        <div class="stack-grid">
          <span class="stack-badge"><span class="icon">🗺️</span> OpenFreeMap Tiles</span>
          <span class="stack-badge"><span class="icon">📍</span> Nominatim (OSM)</span>
          <span class="stack-badge"><span class="icon">📧</span> Nodemailer</span>
          <span class="stack-badge"><span class="icon">📱</span> Firebase (Push)</span>
        </div>
      </div>

      <hr class="divider" />

      <!-- FEATURES -->
      <div class="section" id="features">
        <span class="section-anchor"></span>
        <div class="section-tag">Features</div>
        <h2>Core Features</h2>
        <p>Every feature listed here is implemented and functional in the current version of MedLink.</p>

        <div class="features-grid">
          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#fef2f2">🩸</div>
              <div class="feat-title">Blood Donation Requests</div>
            </div>
            <div class="feat-desc">Post urgent blood requests with blood group, location, and urgency level. Nearby donors are notified in real time via push and SMS alerts.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#ecfeff">🚑</div>
              <div class="feat-title">Ambulance Dispatch</div>
            </div>
            <div class="feat-desc">Request ambulance pickup with live GPS tracking. ETA is shared with patients, helpers, and the receiving hospital simultaneously.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#eff6ff">🛏️</div>
              <div class="feat-title">ICU Bed Tracker</div>
            </div>
            <div class="feat-desc">Live ICU bed availability across partner hospitals. Patients can navigate directly to the nearest available bed with ETA and directions.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#fdf4ff">❤️</div>
              <div class="feat-title">Organ Donor Matching</div>
            </div>
            <div class="feat-desc">Time-critical organ requests matched across the verified hospital network with instant multi-channel alerts and countdown timers.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#f0fdf4">💰</div>
              <div class="feat-title">Emergency Fundraising</div>
            </div>
            <div class="feat-desc">Create verified medical fundraising campaigns with target amounts, patient photos, and hospital documentation. Campaigns go live only after admin approval.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#f0f9ff">📍</div>
              <div class="feat-title">Live Emergency Map</div>
            </div>
            <div class="feat-desc">Interactive map showing nearby emergencies with color-coded markers. Filter by type, urgency, and verification status. Built with MapLibre GL + OpenStreetMap.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#fefce8">✅</div>
              <div class="feat-title">QR Hospital Verification</div>
            </div>
            <div class="feat-desc">Hospitals generate unique QR codes. Patients scan on-site to attach a timestamped, doctor-signed proof to their emergency request. Blockchain-ready architecture.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#f0fdf4">💬</div>
              <div class="feat-title">Real-time Messaging</div>
            </div>
            <div class="feat-desc">One-to-one and emergency group chats powered by Socket.io. Includes unread badges, message search, and one-tap call escalation.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#fdf4ff">🛡️</div>
              <div class="feat-title">Trust Score System</div>
            </div>
            <div class="feat-desc">Dynamic 0–100% score updated in real time. Verifications, helping, and donations increase it. Reports and cancellations decrease it. Affects emergency visibility.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#eff6ff">🔔</div>
              <div class="feat-title">Smart Notifications</div>
            </div>
            <div class="feat-desc">Location-based push, email, and SMS alerts. Users configure their radius and which emergency types trigger notifications from their profile settings.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#ecfdf5">👨‍💼</div>
              <div class="feat-title">Admin Control Panel</div>
            </div>
            <div class="feat-desc">Full moderation suite — user management, emergency flagging, report queue, post review, ban/unban, and a geographic analytics dashboard.</div>
          </div>

          <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#fef2f2">🔐</div>
              <div class="feat-title">Secure Auth + RBAC</div>
            </div>
            <div class="feat-desc">JWT access tokens (7 days) with refresh tokens (30 days) and rotation. Role-based access control for Normal Users, Doctors, NGOs, and Admins.</div>
          </div>

           <div class="feat-card">
            <div class="feat-header">
              <div class="feat-icon-wrap" style="background:#ecfeff">🤖</div>
              <div class="feat-title">Upcoming Features</div>
            </div>
            <div class="feat-desc">The project is currently in-progress, so more features 
            are left to add. Stay Put!</div>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- USER ROLES -->
      <div class="section" id="roles">
        <span class="section-anchor"></span>
        <div class="section-tag">User Roles</div>
        <h2>Who Uses MedLink?</h2>
        <p>MedLink has four distinct user roles, each with specific permissions and access levels.</p>
        <div class="roles-grid">
          <div class="role-card">
            <span class="role-icon">👤</span>
            <div class="role-name">Normal User</div>
            <div class="role-perms">
              <div class="role-perm">Post and browse emergencies</div>
              <div class="role-perm">Offer and receive help</div>
              <div class="role-perm">Participate in fundraising</div>
              <div class="role-perm">Access real-time map & chat</div>
              <div class="role-perm">Upload ID for verification</div>
            </div>
          </div>
          <div class="role-card">
            <span class="role-icon">👨‍⚕️</span>
            <div class="role-name">Doctor</div>
            <div class="role-perms">
              <div class="role-perm">All Normal User permissions</div>
              <div class="role-perm">Medical license badge display</div>
              <div class="role-perm">Doctor Q&A on social feed</div>
              <div class="role-perm">Higher trust score visibility</div>
              <div class="role-perm">Priority in helper matching</div>
            </div>
          </div>
          <div class="role-card">
            <span class="role-icon">🏢</span>
            <div class="role-name">NGO</div>
            <div class="role-perms">
              <div class="role-perm">All Normal User permissions</div>
              <div class="role-perm">NGO Announcements on feed</div>
              <div class="role-perm">Verified NGO certificate badge</div>
              <div class="role-perm">Manage fundraising campaigns</div>
              <div class="role-perm">Community outreach tools</div>
            </div>
          </div>
          <div class="role-card">
            <span class="role-icon">🛡️</span>
            <div class="role-name">Admin</div>
            <div class="role-perms">
              <div class="role-perm">Full user management & banning</div>
              <div class="role-perm">Emergency moderation & flagging</div>
              <div class="role-perm">Report review & resolution</div>
              <div class="role-perm">Analytics dashboard access</div>
              <div class="role-perm">Document approval queue</div>
            </div>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- GETTING STARTED -->
      <div class="section" id="getting-started">
        <span class="section-anchor"></span>
        <div class="section-tag">Setup</div>
        <h2>Getting Started</h2>
        <p>Follow these steps to run MedLink locally. You'll need Node.js 18+, MongoDB, and a Cloudinary account.</p>

        <div class="setup-steps">
          <div class="setup-step">
            <div class="step-num-circle">1</div>
            <div class="step-body">
              <div class="step-title">Clone the Repository</div>
              <p class="step-desc">Clone the MedLink monorepo and navigate into the project root.</p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <div class="code-dots">
                    <div class="code-dot" style="background:#ff5f57"></div>
                    <div class="code-dot" style="background:#febc2e"></div>
                    <div class="code-dot" style="background:#28c840"></div>
                  </div>
                </div>
                <pre><code>git clone https://github.com/yourusername/medlink.git
cd medlink</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-num-circle">2</div>
            <div class="step-body">
              <div class="step-title">Install Dependencies</div>
              <p class="step-desc">Install packages for both the frontend (Next.js) and backend (Express).</p>
              <div class="code-block">
                <div class="code-header">
                  <span class="code-lang">bash</span>
                  <div class="code-dots">
                    <div class="code-dot" style="background:#ff5f57"></div>
                    <div class="code-dot" style="background:#febc2e"></div>
                    <div class="code-dot" style="background:#28c840"></div>
                  </div>
                </div>
                <pre><code><span class="cm"># Frontend</span>
cd frontend && npm install

<span class="cm"># Backend</span>
cd ../backend && npm install</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-num-circle">3</div>
            <div class="step-body">
              <div class="step-title">Configure Environment Variables</div>
              <p class="step-desc">Create <code style="background:var(--border2);padding:2px 6px;border-radius:4px;font-size:12px">.env</code> files in both <code style="background:var(--border2);padding:2px 6px;border-radius:4px;font-size:12px">/frontend</code> and <code style="background:var(--border2);padding:2px 6px;border-radius:4px;font-size:12px">/backend</code> directories. See the Environment Variables section below for required keys.</p>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-num-circle">4</div>
            <div class="step-body">
              <div class="step-title">Start MongoDB</div>
              <p class="step-desc">Make sure MongoDB is running locally, or use a MongoDB Atlas connection string in your <code style="background:var(--border2);padding:2px 6px;border-radius:4px;font-size:12px">MONGO_URI</code> env variable.</p>
              <div class="code-block">
                <div class="code-header"><span class="code-lang">bash</span>
                  <div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#febc2e"></div><div class="code-dot" style="background:#28c840"></div></div>
                </div>
                <pre><code>mongod --dbpath ./data/db</code></pre>
              </div>
            </div>
          </div>

          <div class="setup-step">
            <div class="step-num-circle">5</div>
            <div class="step-body">
              <div class="step-title">Run the Application</div>
              <p class="step-desc">Start the backend server and the Next.js frontend in separate terminals.</p>
              <div class="code-block">
                <div class="code-header"><span class="code-lang">bash</span>
                  <div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#febc2e"></div><div class="code-dot" style="background:#28c840"></div></div>
                </div>
                <pre><code><span class="cm"># Terminal 1 — Backend</span>
cd backend && npm run dev

<span class="cm"># Terminal 2 — Frontend</span>
cd frontend && npm run dev</code></pre>
              </div>
              <div class="callout" style="margin-top:12px">
                <span class="callout-icon">🌐</span>
                <span class="callout-text">Frontend runs on <strong>http://localhost:3000</strong> · Backend API on <strong>http://localhost:5000</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="divider" />

      <!-- ENV VARIABLES -->
      <div class="section" id="env">
        <span class="section-anchor"></span>
        <div class="section-tag">Configuration</div>
        <h2>Environment Variables</h2>
        <p>Create these files before running the application. Never commit them to version control.</p>

        <h3>Backend <code style="background:var(--border2);padding:2px 8px;border-radius:5px;font-size:13px">/backend/.env</code></h3>
        <table class="env-table">
          <thead>
            <tr><th>Variable</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="env-key">MONGO_URI</span><span class="env-required">required</span></td><td class="env-desc">MongoDB connection string (local or Atlas)</td></tr>
            <tr><td><span class="env-key">JWT_SECRET</span><span class="env-required">required</span></td><td class="env-desc">Secret key for signing JWT access tokens</td></tr>
            <tr><td><span class="env-key">JWT_REFRESH_SECRET</span><span class="env-required">required</span></td><td class="env-desc">Secret key for signing JWT refresh tokens</td></tr>
            <tr><td><span class="env-key">CLOUDINARY_CLOUD_NAME</span><span class="env-required">required</span></td><td class="env-desc">Cloudinary cloud name for media uploads</td></tr>
            <tr><td><span class="env-key">CLOUDINARY_API_KEY</span><span class="env-required">required</span></td><td class="env-desc">Cloudinary API key</td></tr>
            <tr><td><span class="env-key">CLOUDINARY_API_SECRET</span><span class="env-required">required</span></td><td class="env-desc">Cloudinary API secret</td></tr>
            <tr><td><span class="env-key">EMAIL_USER</span></td><td class="env-desc">Gmail address used for sending system emails via Nodemailer</td></tr>
            <tr><td><span class="env-key">EMAIL_PASS</span></td><td class="env-desc">Gmail app password (not your regular password)</td></tr>
            <tr><td><span class="env-key">PORT</span></td><td class="env-desc">Backend server port (default: 5000)</td></tr>
          </tbody>
        </table>

        <h3>Frontend <code style="background:var(--border2);padding:2px 8px;border-radius:5px;font-size:13px">/frontend/.env.local</code></h3>
        <table class="env-table">
          <thead>
            <tr><th>Variable</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="env-key">NEXT_PUBLIC_API_URL</span><span class="env-required">required</span></td><td class="env-desc">Backend API base URL (e.g. http://localhost:5000)</td></tr>
            <tr><td><span class="env-key">NEXT_PUBLIC_SOCKET_URL</span><span class="env-required">required</span></td><td class="env-desc">Socket.io server URL for real-time features</td></tr>
          </tbody>
        </table>
      </div>

      <hr class="divider" />

      <!-- CONTRIBUTING -->
      <div class="section" id="contributing">
        <span class="section-anchor"></span>
        <div class="section-tag">Contributing</div>
        <h2>How to Contribute</h2>
        <p>Contributions are welcome. Please follow the standard GitHub flow and make sure your code passes linting before opening a PR.</p>

        <div class="contrib-steps">
          <div class="contrib-step">
            <div class="cs-circle">🍴</div>
            <div class="cs-label">Fork the repo</div>
          </div>
          <div class="contrib-step">
            <div class="cs-circle">🌿</div>
            <div class="cs-label">Create a feature branch</div>
          </div>
          <div class="contrib-step">
            <div class="cs-circle">💻</div>
            <div class="cs-label">Make your changes</div>
          </div>
          <div class="contrib-step">
            <div class="cs-circle">✅</div>
            <div class="cs-label">Commit & push</div>
          </div>
          <div class="contrib-step">
            <div class="cs-circle">🚀</div>
            <div class="cs-label">Open a pull request</div>
          </div>
        </div>

        <div class="code-block" style="margin-top:28px">
          <div class="code-header"><span class="code-lang">bash</span>
            <div class="code-dots"><div class="code-dot" style="background:#ff5f57"></div><div class="code-dot" style="background:#febc2e"></div><div class="code-dot" style="background:#28c840"></div></div>
          </div>
          <pre><code>git checkout -b feature/your-feature-name
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name</code></pre>
        </div>
      </div>

      <hr class="divider" />

      <!-- CONTACT -->
      <div class="section" id="contact">
        <span class="section-anchor"></span>
        <div class="section-tag">Contact</div>
        <h2>Get in Touch</h2>
        <p>Have questions, bugs to report, or want to collaborate? Reach out through any of the channels below.</p>

        <div class="stack-grid" style="margin-top:20px">
          <a href="https://github.com/yourusername/medlink" class="stack-badge" style="text-decoration:none">
            <span class="icon">🐙</span> GitHub Repository
          </a>
          <a href="mailto:your@email.com" class="stack-badge" style="text-decoration:none">
            <span class="icon">📧</span> Email
          </a>
          <a href="#" class="stack-badge" style="text-decoration:none">
            <span class="icon">💼</span> LinkedIn
          </a>
        </div>

        <div class="callout" style="margin-top:28px">
          <span class="callout-icon">🐛</span>
          <span class="callout-text">Found a bug or security issue? Please open a GitHub Issue with steps to reproduce. For security vulnerabilities, email directly rather than opening a public issue.</span>
        </div>
      </div>

    </div><!-- /content -->

    <!-- FOOTER -->
    <div class="readme-footer">
      <div class="footer-brand">
        <div class="footer-mini-icon"><div class="mini-cross"></div></div>
        <span class="footer-name">MedLink</span>
      </div>
      <span class="footer-copy">Built with ❤️ for emergency healthcare coordination · 2025</span>
    </div>

  </main>

  <script>
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
  </script>
</body>
</html>