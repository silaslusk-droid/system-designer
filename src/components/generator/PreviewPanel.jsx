import useStore from '../../lib/store';

export default function PreviewPanel() {
  const { getActiveSystem } = useStore();
  const activeSystem = getActiveSystem();

  if (!activeSystem) {
    return (
      <div className="preview-panel">
        <p className="text-muted">No active design system</p>
      </div>
    );
  }

  const brandColor = activeSystem.colors?.brand?.['500'] || '#3b82f6';
  const headingFont = activeSystem.typography?.headingFont || 'Inter';
  const bodyFont = activeSystem.typography?.bodyFont || 'Inter';
  const baseFontSize = activeSystem.typography?.baseFontSize || 16;

  return (
    <div className="preview-panel" style={{ fontFamily: bodyFont, fontSize: baseFontSize + 'px' }}>
      <div>
        <h2 style={{ fontFamily: headingFont, marginBottom: '1.5rem' }}>Live Preview</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>See your design system in action</p>
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Buttons</h3>
        <div className="flex gap-md">
          <button className="btn btn-primary" style={{ background: brandColor, borderColor: brandColor }}>
            Primary Button
          </button>
          <button className="btn btn-secondary">Secondary Button</button>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Cards</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div className="card">
            <h4 style={{ fontFamily: headingFont, marginBottom: '0.5rem' }}>Card Title</h4>
            <p className="text-sm text-muted">This is a card description</p>
            <p style={{ fontFamily: bodyFont, marginTop: '1rem' }}>Card content goes here.</p>
          </div>
          <div className="card">
            <h4 style={{ fontFamily: headingFont, marginBottom: '0.5rem' }}>Another Card</h4>
            <p className="text-sm text-muted">With more content</p>
            <button className="btn btn-primary w-full mt-md" style={{ background: brandColor, borderColor: brandColor }}>
              Call to Action
            </button>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Badges</h3>
        <div className="flex gap-sm">
          <span className="badge" style={{ background: brandColor }}>Default</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-error">Error</span>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Typography Scale</h3>
        <div>
          <h1 style={{ fontFamily: headingFont }}>Heading 1</h1>
          <h2 style={{ fontFamily: headingFont }}>Heading 2</h2>
          <h3 style={{ fontFamily: headingFont }}>Heading 3</h3>
          <h4 style={{ fontFamily: headingFont }}>Heading 4</h4>
          <p style={{ fontFamily: bodyFont }}>
            This is body text at the base font size. It demonstrates the readability and spacing of your typography system.
          </p>
          <p className="text-sm" style={{ fontFamily: bodyFont }}>
            This is small text, often used for captions or secondary information.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: headingFont, marginBottom: '1rem' }}>Form Elements</h3>
        <div className="card">
          <div className="form-group">
            <label htmlFor="example-input">Input Field</label>
            <input id="example-input" type="text" placeholder="Enter some text..." />
          </div>
          <div className="form-group">
            <label htmlFor="example-select">Select Menu</label>
            <select id="example-select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
