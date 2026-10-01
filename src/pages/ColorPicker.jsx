import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import './ColorPicker.css';

// Utility functions for color conversion
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function ColorPicker() {
  const [color, setColor] = useState('#ff9b51');
  const [rgb, setRgb] = useState({ r: 255, g: 155, b: 81 });
  const [hsl, setHsl] = useState({ h: 26, s: 100, l: 66 });
  const [copiedText, setCopiedText] = useState('');

  useEffect(() => {
    const rgbVal = hexToRgb(color);
    setRgb(rgbVal);
    setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
  }, [color]);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h2>Color Picker</h2>
        <p>Pick a color and instantly get HEX, RGB, and HSL values.</p>
      </div>

      <div className="color-workspace">
        <div className="color-display-panel" style={{ backgroundColor: color }}>
          {/* Just a pure color block */}
        </div>

        <div className="color-controls-panel">
          <div className="picker-container">
            <HexColorPicker color={color} onChange={setColor} />
          </div>

          <div className="color-values-panel">
            <h3>Color Values</h3>
            
            <div className="value-row">
              <div className="value-label">HEX</div>
              <div className="value-text">{color.toUpperCase()}</div>
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(color.toUpperCase(), 'HEX')}
              >
                {copiedText === 'HEX' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="value-row">
              <div className="value-label">RGB</div>
              <div className="value-text">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
              >
                {copiedText === 'RGB' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className="value-row">
              <div className="value-label">HSL</div>
              <div className="value-text">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
              >
                {copiedText === 'HSL' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
