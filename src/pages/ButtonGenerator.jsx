import React, { useState } from 'react';
import './ButtonGenerator.css';

function ButtonGenerator() {
  const [text, setText] = useState('Click Me');
  const [bgColor, setBgColor] = useState('#FF9B51');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [padding, setPadding] = useState(16);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fontSize, setFontSize] = useState(16);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState('#25343F');
  const [enableHover, setEnableHover] = useState(true);
  const [copiedText, setCopiedText] = useState(false);

  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
    padding: `${padding}px ${Math.round(padding * 1.5)}px`,
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'inline-block',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  };

  const vanillaCssOutput = `.custom-button {
  background-color: ${bgColor};
  color: ${textColor};
  padding: ${padding}px ${Math.round(padding * 1.5)}px;
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  border: ${borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none'};
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  transition: all 0.2s ease;
}${enableHover ? `\n\n.custom-button:hover {\n  filter: brightness(1.1);\n  transform: translateY(-2px);\n}` : ''}`;

  const tailwindOutput = `bg-[${bgColor}] text-[${textColor}] px-[${Math.round(padding * 1.5)}px] py-[${padding}px] rounded-[${borderRadius}px] text-[${fontSize}px] ${borderWidth > 0 ? `border-[${borderWidth}px] border-[${borderColor}]` : 'border-none'} font-semibold inline-block transition-all duration-200 ${enableHover ? 'hover:brightness-110 hover:-translate-y-[2px]' : ''}`;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h2>CSS Button Generator</h2>
        <p>Design beautiful buttons and get the CSS code instantly.</p>
      </div>

      <div className="button-workspace">
        <div className="controls-panel">
          <div className="control-group">
            <label>Button Text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="text-input" />
          </div>

          <div className="color-inputs-grid">
            <div className="control-group">
              <label>Background Color</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
            <div className="control-group">
              <label>Text Color</label>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
          </div>

          <div className="control-group">
            <label>Padding: {padding}px</label>
            <input type="range" min="8" max="48" value={padding} onChange={(e) => setPadding(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Border Radius: {borderRadius}px</label>
            <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Font Size: {fontSize}px</label>
            <input type="range" min="12" max="36" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
          </div>

          <div className="control-group">
            <label>Border Width: {borderWidth}px</label>
            <input type="range" min="0" max="10" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
          </div>

          {borderWidth > 0 && (
            <div className="control-group">
              <label>Border Color</label>
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
            </div>
          )}

          <div className="control-group checkbox-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={enableHover} onChange={(e) => setEnableHover(e.target.checked)} />
              Enable Hover Effect
            </label>
          </div>
        </div>

        <div className="preview-panel">
          <div className="preview-container shadow-preview-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', backgroundColor: 'var(--background-color)', borderRadius: '24px' }}>
            <button style={buttonStyle} className={enableHover ? "generated-btn" : "generated-btn-no-hover"}>{text}</button>
          </div>
          
          <div className="code-output">
            <div>
              <strong>Vanilla CSS:</strong>
              <code>{vanillaCssOutput}</code>
              <button className="primary-btn" onClick={() => handleCopy(vanillaCssOutput, 'vanilla')} style={{marginTop: '8px', padding: '6px 12px', fontSize: '0.9rem'}}>
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

export default ButtonGenerator;
