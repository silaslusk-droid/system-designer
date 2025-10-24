import { Moon, Sun, Download, Menu } from 'lucide-react';
import useStore from '../lib/store';
import { useState } from 'react';
import { generateTailwindConfig, generateFigmaSVG } from '../lib/tokens';

export default function Header() {
  const { darkMode, toggleDarkMode, toggleSidebar, getActiveSystem } = useStore();
  const [exportOpen, setExportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tailwind');

  const activeSystem = getActiveSystem();
  const tailwindConfig = activeSystem ? generateTailwindConfig(activeSystem) : null;
  const figmaSVG = activeSystem?.colors?.brand ? generateFigmaSVG(activeSystem.colors.brand) : null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="flex items-center gap-md">
            <button className="btn btn-icon btn-secondary" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
            <h1 className="header-title">Design System Generator</h1>
          </div>

          <div className="header-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => setExportOpen(true)}>
              <Download size={16} style={{ marginRight: '0.5rem' }} />
              Export
            </button>

            <button className="btn btn-icon btn-secondary" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {exportOpen && (
        <div className="modal-overlay" onClick={() => setExportOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Export Design System</h2>
              <p className="text-muted text-sm">Export for code (Tailwind) or design tools (Figma)</p>
            </div>

            <div className="modal-content">
              <div className="tabs">
                <div className="tab-list">
                  <button className={'tab ' + (activeTab === 'tailwind' ? 'active' : '')} onClick={() => setActiveTab('tailwind')}>Tailwind Config</button>
                  <button className={'tab ' + (activeTab === 'figma' ? 'active' : '')} onClick={() => setActiveTab('figma')}>Figma SVG</button>
                </div>

                {activeTab === 'tailwind' && (
                  <div>
                    <div className="code-block">
                      <pre>{tailwindConfig ? JSON.stringify(tailwindConfig, null, 2) : 'No active design system'}</pre>
                    </div>
                    <button className="btn btn-primary w-full mt-md" onClick={() => copyToClipboard(JSON.stringify(tailwindConfig, null, 2))}>Copy to Clipboard</button>
                  </div>
                )}

                {activeTab === 'figma' && (
                  <div>
                    {figmaSVG ? (
                      <>
                        <div style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'white' }} dangerouslySetInnerHTML={{ __html: figmaSVG }} />
                        <button className="btn btn-primary w-full mt-md" onClick={() => copyToClipboard(figmaSVG)}>Copy SVG Code</button>
                        <p className="text-sm text-muted mt-sm">Copy this SVG and paste it directly into Figma.</p>
                      </>
                    ) : (
                      <p className="text-muted">No brand colors available to export</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setExportOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
