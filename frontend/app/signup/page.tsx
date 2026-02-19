'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const error = await response.json();
        toast.error(error.msg || 'Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f8f7f4;
        }

        /* LEFT PANEL */
        .left-panel {
          width: 45%;
          background: #0a0f1e;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%);
        }

        .left-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .left-brand {
          position: relative;
          z-index: 2;
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .left-content {
          position: relative;
          z-index: 2;
        }

        .left-headline {
          font-family: 'Instrument Serif', serif;
          font-size: 52px;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .left-headline em {
          font-style: italic;
          color: #06b6d4;
        }

        .left-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          max-width: 300px;
        }

        .trust-badges {
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 2;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #06b6d4;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .badge-text {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        /* RIGHT PANEL */
        .right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header {
          margin-bottom: 36px;
        }

        .form-eyebrow {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #06b6d4;
          margin-bottom: 10px;
        }

        .form-title {
          font-size: 32px;
          font-weight: 600;
          color: #0a0f1e;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 14px;
          color: #8b8fa8;
        }

        .field-group {
          margin-bottom: 18px;
        }

        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #4a4f6a;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .field-wrapper {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #b0b4c9;
          pointer-events: none;
        }

        .field-input {
          width: 100%;
          padding: 14px 16px 14px 46px;
          background: #ffffff;
          border: 1.5px solid #e8e9f0;
          border-radius: 12px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0a0f1e;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }

        .field-input::placeholder {
          color: #c4c7d9;
        }

        .field-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.08);
        }

        .terms-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 24px;
          margin-top: 4px;
        }

        .terms-row input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: #06b6d4;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .terms-text {
          font-size: 13px;
          color: #8b8fa8;
          line-height: 1.5;
        }

        .terms-link {
          color: #0a0f1e;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid #e8e9f0;
          transition: border-color 0.2s;
        }

        .terms-link:hover {
          border-color: #06b6d4;
          color: #06b6d4;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #0a0f1e;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(6,182,212,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .submit-btn:hover {
          background: #111827;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(10, 15, 30, 0.2);
        }

        .submit-btn:hover::after { opacity: 1; }
        .submit-btn:active { transform: translateY(0); }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e8e9f0;
        }

        .divider-text {
          font-size: 12px;
          color: #b0b4c9;
          white-space: nowrap;
        }

        .signin-prompt {
          text-align: center;
          font-size: 14px;
          color: #8b8fa8;
        }

        .signin-link {
          color: #0a0f1e;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1.5px solid #06b6d4;
          padding-bottom: 1px;
          transition: color 0.2s;
        }

        .signin-link:hover { color: #06b6d4; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel { padding: 32px 24px; }
        }
      `}</style>

      <div className="auth-root">
        {/* Left decorative panel */}
        <div className="left-panel">
          <div className="left-brand">
            <div className="brand-mark">
              <div className="brand-icon">
                <svg width="22" height="22" viewBox="0 0 100 100" fill="white">
                  <rect x="35" y="20" width="30" height="60" rx="5" fill="white" />
                  <rect x="20" y="35" width="60" height="30" rx="5" fill="white" />
                </svg>
              </div>
              <span className="brand-name">MedLink</span>
            </div>
          </div>

          <div className="left-content">
            <h2 className="left-headline">
              Your health,<br /><em>connected</em><br />and secure.
            </h2>
            <p className="left-sub">
              Join thousands of healthcare professionals and patients on the platform built for modern medicine.
            </p>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <div className="badge-dot" />
              <span className="badge-text">HIPAA Compliant &amp; SOC 2 Certified</span>
            </div>
            <div className="trust-badge">
              <div className="badge-dot" />
              <span className="badge-text">End-to-end encrypted records</span>
            </div>
            <div className="trust-badge">
              <div className="badge-dot" />
              <span className="badge-text">24/7 emergency access support</span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="form-container">
            <div className="form-header">
              <div className="form-eyebrow">Get Started Free</div>
              <h1 className="form-title">Create your account</h1>
              <p className="form-subtitle">Join MedLink and access healthcare services</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label htmlFor="name" className="field-label">Full Name</label>
                <div className="field-wrapper">
                  <svg className="field-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="field-input"
                    placeholder="Dr. John Smith"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="email" className="field-label">Email Address</label>
                <div className="field-wrapper">
                  <svg className="field-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="field-input"
                    placeholder="doctor@medlink.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="password" className="field-label">Password</label>
                <div className="field-wrapper">
                  <svg className="field-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="field-input"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="terms-row">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="terms-text">
                  I agree to the{' '}
                  <a href="#" className="terms-link">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="terms-link">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" disabled={isLoading} className="submit-btn">
                <span className="btn-inner">
                  {isLoading ? (
                    <>
                      <span className="spinner" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">Already a member?</span>
              <div className="divider-line" />
            </div>

            <p className="signin-prompt">
              Already have an account?{' '}
              <a href="/login" className="signin-link">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}