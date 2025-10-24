import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useStore from '../../lib/store';

export default function DocsPage() {
  const navigate = useNavigate();
  const { getActiveSystem, settings } = useStore();
  const activeSystem = getActiveSystem();

  if (!activeSystem) {
    return (
      <div className="main-content">
        <div className="alert alert-warning">
          <h3>No Active Design System</h3>
          <p>Please select or create a design system first.</p>
        </div>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/')}>
          Go to Generator
        </button>
      </div>
    );
  }

  const brandColor = activeSystem.colors?.brand?.['500'] || '#3b82f6';
  const headingFont = activeSystem.typography?.headingFont || 'Inter';
  const bodyFont = activeSystem.typography?.bodyFont || 'Inter';
  const baseFontSize = activeSystem.typography?.baseFontSize || 16;

  return (
    <div style={{ fontFamily: bodyFont, fontSize: baseFontSize + 'px' }}>
      <header style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {settings.logoUrl && <img src={settings.logoUrl} alt="Logo" style={{ height: '2rem' }} />}
            <h1 style={{ fontFamily: headingFont, fontSize: '1.5rem', margin: 0 }}>{settings.projectName}</h1>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
            Back to Generator
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: headingFont, fontSize: '2.5rem', marginBottom: '1rem' }}>{activeSystem.name}</h2>
          <p className="text-lg text-muted">{activeSystem.description}</p>
          <p className="text-sm text-muted">Last updated: {new Date(activeSystem.updatedAt).toLocaleDateString()}</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: headingFont, marginBottom: '1.5rem' }}>Color Palette</h2>
          {activeSystem.colors && Object.entries(activeSystem.colors).map(([colorName, shades]) => (
            <div key={colorName} style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: headingFont, marginBottom: '1rem', textTransform: 'capitalize' }}>{colorName}</h3>
              <div className="color-swatches">
                {Object.entries(shades).slice(0, 11).map(([shade, hex]) => (
                  <div key={shade}>
                    <div className="color-swatch" style={{ background: hex }} />
                    <div className="color-swatch-label">{shade}</div>
                    <div className="color-swatch-label">{hex}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: headingFont, marginBottom: '1.5rem' }}>Typography</h2>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <p className="text-sm text-muted">Heading Font</p>
            <p style={{ fontFamily: headingFont, fontSize: '1.5rem', fontWeight: 700 }}>{activeSystem.typography?.headingFont}</p>
            <p className="text-sm text-muted mt-md">Body Font</p>
            <p style={{ fontFamily: bodyFont, fontSize: '1.25rem' }}>{activeSystem.typography?.bodyFont}</p>
            <p className="text-sm text-muted mt-md">Base Font Size</p>
            <p style={{ fontSize: '1.25rem' }}>{activeSystem.typography?.baseFontSize}px</p>
          </div>

          <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Type Scale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h1 style={{ fontFamily: headingFont }}>Heading 1</h1>
              <p className="text-sm text-muted">5xl / 3rem</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h2 style={{ fontFamily: headingFont }}>Heading 2</h2>
              <p className="text-sm text-muted">4xl / 2.25rem</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <h3 style={{ fontFamily: headingFont }}>Heading 3</h3>
              <p className="text-sm text-muted">3xl / 1.875rem</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <p style={{ fontFamily: bodyFont }}>Body Text - The quick brown fox jumps over the lazy dog</p>
              <p className="text-sm text-muted">base / 1rem</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: headingFont, marginBottom: '1.5rem' }}>Components</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Buttons</h3>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ background: brandColor }}>Primary</button>
                <button className="btn btn-secondary">Secondary</button>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Badges</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: brandColor }}>Default</span>
                <span className="badge badge-secondary">Secondary</span>
                <span className="badge badge-success">Success</span>
                <span className="badge badge-warning">Warning</span>
                <span className="badge badge-error">Error</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Cards</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div className="card">
                  <h4 style={{ fontFamily: headingFont, marginBottom: '0.5rem' }}>Card Title</h4>
                  <p className="text-sm text-muted">Card description goes here</p>
                  <p style={{ fontFamily: bodyFont, marginTop: '1rem' }}>This is the card content.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
