import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container page-container" style={{ maxWidth: '850px', margin: '0 auto', padding: '2.5rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--primary-color)' }}>
          About Design Tools
        </h2>
        <p className="page-subtitle" style={{ color: 'var(--text-secondary, #666)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto' }}>
          A sleek, browser-based suite of UI generator utilities for designers, frontend developers, and creators.
        </p>
      </div>

      <div className="tool-card tool-card-body" style={{ padding: '2rem 1.5rem', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--text-color)' }}>
          Crafted for Designers & Developers
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-color)', marginBottom: '1.5rem', lineHeight: 1.7, textAlign: 'left' }}>
          <strong>Design Tools</strong> streamlines your styling workflow. Generate beautiful <strong>Color Palettes</strong>, tweak smooth multi-stop <strong>CSS Gradients</strong>, inspect values with an exact <strong>Color Picker</strong>, design realistic <strong>Box Shadows</strong>, and prototype interactive <strong>Buttons</strong> with instant CSS copy-paste.
        </p>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--text-color)' }}>
          Fast, Zero Latency & Offline-Ready
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-color)', marginBottom: '1.5rem', lineHeight: 1.7, textAlign: 'left' }}>
          Every color calculation, gradient interpolation, and CSS output is computed directly on your device. There are no tracking scripts, third-party bloat, or cloud dependencies—just responsive, distraction-free creative tools.
        </p>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--text-color)' }}>
          Part of the PixelTools Suite
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-color)', lineHeight: 1.7, textAlign: 'left', margin: 0 }}>
          Design Tools is built as a core module of the <strong>PixelTools</strong> web ecosystem, uniting clean aesthetics with practical web productivity.
        </p>
      </div>

      {/* Creator & Portfolio Section */}
      <div className="tool-card tool-card-body" style={{ padding: '2rem 1.5rem', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-color)' }}>
          Created By Akhil
        </h3>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary, #666)', marginBottom: '1.5rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          Passionate about building intuitive, performant, and privacy-respecting web applications. Discover more projects, experiments, and engineering work on my portfolio.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.75rem',
              textDecoration: 'none',
              fontWeight: 600,
              borderRadius: '8px'
            }}
          >
            <span>Visit My Portfolio</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <Link
            to="/"
            className="secondary-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.8rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '8px'
            }}
          >
            Back to Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
