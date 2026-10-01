import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import './PaletteGenerator.css';

// Utilities
function hexToHsl(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
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
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; 
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#FF9B51');
  const [palettes, setPalettes] = useState({
    analogous: [],
    monochromatic: [],
    triadic: [],
    complementary: []
  });
  const [copiedColor, setCopiedColor] = useState('');

  useEffect(() => {
    const hsl = hexToHsl(baseColor);
    
    // Analogous
    const analogous = [
      hslToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l),
      hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
      baseColor.toUpperCase(),
      hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
      hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l)
    ];

    // Monochromatic
    const monochromatic = [
      hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 40)),
      hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
      baseColor.toUpperCase(),
      hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
      hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 40))
    ];

    // Triadic
    const triadic = [
      hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
      hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
      baseColor.toUpperCase(),
      hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
      hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20))
    ];

    // Complementary
    const complementary = [
      hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
      baseColor.toUpperCase(),
      hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
      hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(0, hsl.l - 20)),
      hslToHex((hsl.h + 180) % 360, hsl.s, Math.min(100, hsl.l + 20))
    ];

    setPalettes({ analogous, monochromatic, triadic, complementary });
  }, [baseColor]);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 1500);
  };

  const renderPaletteRow = (title, colors) => (
    <div className="palette-row">
      <h3>{title}</h3>
      <div className="colors-container">
        {colors.map((c, i) => (
          <div 
            key={i} 
            className="color-swatch" 
            style={{ backgroundColor: c }}
            onClick={() => handleCopy(c)}
          >
            <div className="swatch-label">
              {copiedColor === c ? 'COPIED!' : c}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h2>Palette Generator</h2>
        <p>Pick a base color to generate beautiful, cohesive color harmonies.</p>
      </div>

      <div className="palette-workspace">
        <div className="base-color-picker">
          <h3>Base Color</h3>
          <HexColorPicker color={baseColor} onChange={setBaseColor} style={{ width: '100%', height: '200px' }} />
          <div className="current-base-hex">{baseColor.toUpperCase()}</div>
        </div>

        <div className="palettes-display">
          {renderPaletteRow('Analogous', palettes.analogous)}
          {renderPaletteRow('Monochromatic', palettes.monochromatic)}
          {renderPaletteRow('Triadic', palettes.triadic)}
          {renderPaletteRow('Complementary', palettes.complementary)}
        </div>
      </div>
    </div>
  );
}

export default PaletteGenerator;
