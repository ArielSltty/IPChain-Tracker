import React from "react";

export default function LandingPage({ handleIIlogin }) {
  return (
    <div className="landing">
      <section className="hero">
        <img src="/assets/file.svg" alt="IPTrackChain Logo" className="hero-logo" />
        <h1>IPTrackChain</h1>
        <p className="slogan">Track, Audit, and Secure Your IP Activity on ICP Blockchain</p>
        <button className="connect-btn hero-connect" onClick={handleIIlogin}>
          Connect with Internet Identity
        </button>
      </section>
      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">🛰️</span>
          <h3>IP Tracking</h3>
          <p>Monitor your login locations and IP addresses in real-time, anywhere in the world.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Anomaly Detection</h3>
          <p>Get instant alerts for suspicious or unusual login activity to protect your account.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔗</span>
          <h3>Immutable Logs</h3>
          <p>Your login history is securely stored and auditable on the ICP blockchain.</p>
        </div>
      </section>
      <section className="faq">
        <h2>FAQ</h2>
        <div className="faq-list">
          <div className="faq-item">
            <strong>What is IPTrackChain?</strong>
            <p>A decentralized app to track, audit, and secure your login activity using blockchain technology.</p>
          </div>
          <div className="faq-item">
            <strong>How do I connect?</strong>
            <p>Click “Connect with Internet Identity” and authorize using your Internet Identity wallet.</p>
          </div>
          <div className="faq-item">
            <strong>Is my data private?</strong>
            <p>Yes, your logs are stored on-chain and only accessible by you unless you share your principal.</p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <a href="https://internetcomputer.org/" target="_blank" rel="noopener noreferrer">
          <img src="https://internetcomputer.org/_next/static/media/logo-dark.1b5e6e7d.svg" alt="ICP" className="icp-logo" />
        </a>
        <a href="https://github.com/siletty/ipblock" target="_blank" rel="noopener noreferrer" className="github-link">
          <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
        </a>
      </footer>
    </div>
  );
}
