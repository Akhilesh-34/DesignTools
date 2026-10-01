import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h2>Free Browser-Based Design Tools</h2>
        <p>Color pickers, palettes, gradients and more. Generated entirely in your browser.</p>
      </section>
      
      <section className="tools-grid">
        <div className="tool-card">
          <h3>Color Picker</h3>
          <p>Pick colors, get HEX, RGB, and HSL values instantly.</p>
          <Link to="/color-picker" className="primary-btn" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Open Tool</Link>
        </div>
        <div className="tool-card">
          <h3>Palette Generator</h3>
          <p>Generate cohesive color palettes from a single base color.</p>
          <Link to="/palette" className="primary-btn" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Open Tool</Link>
        </div>
        <div className="tool-card">
          <h3>Gradient Generator</h3>
          <p>Create beautiful CSS gradients and copy the code.</p>
          <Link to="/gradient" className="primary-btn" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Open Tool</Link>
        </div>
        <div className="tool-card">
          <h3>Box Shadow Generator</h3>
          <p>Visually create CSS box-shadows and grab the code.</p>
          <Link to="/box-shadow" className="primary-btn" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Open Tool</Link>
        </div>
        <div className="tool-card">
          <h3>CSS Button Generator</h3>
          <p>Design beautiful buttons and get the CSS code instantly.</p>
          <Link to="/button" className="primary-btn" style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>Open Tool</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
