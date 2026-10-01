import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import './GradientGenerator.css';

function GradientGenerator() {
  const [color1, setColor1] = useState('#FF9B51');
  const [color2, setColor2] = useState('#BFC9D1');
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState('linear');
  const [copiedText, setCopiedText] = useState(false);

  const gradientStyle = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssOutput = `background: ${gradientStyle};`;

  const tailwindOutput = `bg-[${type === 'linear' ? 'linear-gradient' : 'radial-gradient'}(${type === 'linear' ? angle + 'deg' : 'circle'},${color1},${color2})]`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h2>Gradient Generator</h2>
        <p>Create beautiful CSS gradients and easily copy the code.</p>
      </div>

      <div className="gradient-workspace">
        <div className="controls-panel">
          <div className="control-group">
            <label>Type:</label>
            <div className="type-toggles">
              <button 
                className={type === 'linear' ? 'active' : ''} 
                onClick={() => setType('linear')}
              >Linear</button>
              <button 
                className={type === 'radial' ? 'active' : ''} 
                onClick={() => setType('radial')}
              >Radial</button>
            </div>
          </div>

          {type === 'linear' && (
            <div className="control-group">
              <label>Angle: {angle}°</label>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={angle} 
                onChange={(e) => setAngle(Number(e.target.value))}
              />
            </div>
          )}

          <div className="color-pickers-row">
            <div className="picker-wrapper">
              <label>Color 1</label>
              <HexColorPicker color={color1} onChange={setColor1} />
              <div className="hex-input-wrap">
                <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} />
              </div>
            </div>
            <div className="picker-wrapper">
              <label>Color 2</label>
              <HexColorPicker color={color2} onChange={setColor2} />
               <div className="hex-input-wrap">
                <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="preview-panel gradient-preview-panel">
          <div className="gradient-box" style={{ background: gradientStyle }}></div>
          
          <div className="code-output">
            <div>
              <strong>Vanilla CSS:</strong>
              <code>{cssOutput}</code>
              <button className="primary-btn" onClick={() => handleCopy(cssOutput, 'vanilla')} style={{marginTop: '8px', padding: '6px 12px', fontSize: '0.9rem'}}>
                {copiedText === 'vanilla' ? 'Copied!' : 'Copy Vanilla CSS'}
              </button>
            </div>
            <div style={{marginTop: '16px'}}>
              <strong>Tailwind CSS (Arbitrary Value):</strong>
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

export default GradientGenerator;
