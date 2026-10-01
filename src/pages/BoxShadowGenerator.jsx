import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import './BoxShadowGenerator.css';

function BoxShadowGenerator() {
  const [hOffset, setHOffset] = useState(10);
  const [vOffset, setVOffset] = useState(10);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.1);
  const [inset, setInset] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Convert hex + opacity to rgba
  const hexToRgba = (hex, alpha) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.substring(1,3), 16);
      g = parseInt(hex.substring(3,5), 16);
      b = parseInt(hex.substring(5,7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowColor = hexToRgba(color, opacity);
  const shadowValue = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`;
  const cssOutput = `box-shadow: ${shadowValue};`;
  const tailwindOutput = `shadow-[${inset ? 'inset_' : ''}${hOffset}px_${vOffset}px_${blur}px_${spread}px_${shadowColor.replace(/ /g, '')}]`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h2>Box Shadow Generator</h2>
        <p>Visually create CSS box-shadows and grab the code.</p>
      </div>

      <div className="shadow-workspace">
        <div className="controls-panel">
          <div className="control-group">
            <label>Horizontal Offset: {hOffset}px</label>
            <input type="range" min="-100" max="100" value={hOffset} onChange={(e) => setHOffset(Number(e.target.value))} />
          </div>
          
          <div className="control-group">
            <label>Vertical Offset: {vOffset}px</label>
            <input type="range" min="-100" max="100" value={vOffset} onChange={(e) => setVOffset(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Blur Radius: {blur}px</label>
            <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Spread Radius: {spread}px</label>
            <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Opacity: {opacity}</label>
            <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />
          </div>

          <div className="control-group checkbox-group">
            <label>
              <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
              Inset
            </label>
          </div>

          <div className="control-group">
             <label>Shadow Color</label>
             <div className="picker-container-small">
               <HexColorPicker color={color} onChange={setColor} />
             </div>
          </div>
        </div>

        <div className="preview-panel">
          <div className="preview-container shadow-preview-container">
            <div className="shadow-box" style={{ boxShadow: shadowValue }}>
              Preview
            </div>
          </div>
          
          <div className="code-output">
            <div>
              <strong>Vanilla CSS:</strong>
              <code>{cssOutput}</code>
              <button className="primary-btn" onClick={() => handleCopy(cssOutput, 'vanilla')} style={{marginTop: '8px', padding: '6px 12px', fontSize: '0.9rem'}}>
                {copiedText === 'vanilla' ? 'Copied!' : 'Copy Vanilla CSS'}
              </button>
            </div>
            <div style={{marginTop: '16px'}}>
              <strong>Tailwind CSS:</strong>
              <code>{tailwindOutput}</code>
              <button className="primary-btn" onClick={() => handleCopy(tailwindOutput, 'tailwind')} style={{marginTop: '8px', padding: '6px 12px', fontSize: '0.9rem'}}>
                {copiedText === 'tailwind' ? 'Copied!' : 'Copy Tailwind'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxShadowGenerator;
