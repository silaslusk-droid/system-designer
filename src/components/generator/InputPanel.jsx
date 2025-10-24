import { useState } from 'react';
import useStore from '../../lib/store';
import { getAccessibleTextColor } from '../../lib/tokens';

const googleFonts = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
];

export default function InputPanel() {
  const { getActiveSystem, updateColors, updateTypography } = useStore();
  const activeSystem = getActiveSystem();

  const [brandColor, setBrandColor] = useState(activeSystem?.colors?.brand?.['500'] || '#3b82f6');
  const [baseFontSize, setBaseFontSize] = useState(activeSystem?.typography?.baseFontSize || 16);
  const [headingFont, setHeadingFont] = useState(activeSystem?.typography?.headingFont || 'Inter');
  const [bodyFont, setBodyFont] = useState(activeSystem?.typography?.bodyFont || 'Inter');

  const handleBrandColorChange = (e) => {
    const color = e.target.value;
    setBrandColor(color);
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      updateColors('brand', color);
    }
  };

  const handleBaseFontSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setBaseFontSize(size);
    updateTypography({ baseFontSize: size });
  };

  const handleHeadingFontChange = (e) => {
    setHeadingFont(e.target.value);
    updateTypography({ headingFont: e.target.value });
  };

  const handleBodyFontChange = (e) => {
    setBodyFont(e.target.value);
    updateTypography({ bodyFont: e.target.value });
  };

  if (!activeSystem) {
    return (
      <div className="input-panel">
        <p className="text-muted">No active design system. Create or select one.</p>
      </div>
    );
  }

  const accessibleText = getAccessibleTextColor(brandColor);

  return (
    <div className="input-panel">
      <div>
        <h2 style={{marginBottom: '0.5rem'}}>{activeSystem.name}</h2>
        <p className="text-sm text-muted">{activeSystem.description}</p>
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Colors</h3>
          <p className="card-description">Define your color palette</p>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="brand-color">Brand Color</label>
            <div className="flex gap-sm">
              <input id="brand-color" type="color" value={brandColor} onChange={handleBrandColorChange} />
              <input type="text" value={brandColor} onChange={handleBrandColorChange} placeholder="#3b82f6" />
            </div>
          </div>

          {accessibleText && (
            <div style={{padding: '0.75rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', marginTop: '0.5rem'}}>
              <p className="text-sm"><strong>Accessibility</strong></p>
              <p className="text-sm">Recommended text: {accessibleText.color}</p>
              <p className="text-xs text-muted">Ratio: {accessibleText.ratio.toFixed(2)}:1 {accessibleText.aa ? '✓ WCAG AA' : '✗ Fails WCAG AA'}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-lg">
        <div className="card-header">
          <h3 className="card-title">Typography</h3>
          <p className="card-description">Set your font system</p>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="base-font-size">Base Font Size (px)</label>
            <input id="base-font-size" type="number" min="12" max="24" value={baseFontSize} onChange={handleBaseFontSizeChange} />
          </div>

          <div className="form-group">
            <label htmlFor="heading-font">Heading Font</label>
            <select id="heading-font" value={headingFont} onChange={handleHeadingFontChange}>
              {googleFonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="body-font">Body Font</label>
            <select id="body-font" value={bodyFont} onChange={handleBodyFontChange}>
              {googleFonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
