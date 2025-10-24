import { ArrowLeft } from 'lucide-react';
import useStore from '../../lib/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { settings, updateSettings } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: settings.projectName || 'My Design System',
    logoUrl: settings.logoUrl || '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="main-content">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} />
            Back to Generator
          </button>
        </div>

        <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Project Settings</h2>
            <p className="card-description">Configure your project branding and metadata</p>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                value={formData.projectName}
                onChange={(e) => handleChange('projectName', e.target.value)}
                placeholder="My Design System"
              />
              <p className="text-xs text-muted">This name will appear in the documentation page</p>
            </div>

            <div className="form-group">
              <label htmlFor="logo-url">Logo URL</label>
              <input
                id="logo-url"
                value={formData.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted">URL to your project logo (for documentation)</p>
            </div>

            <button onClick={handleSave} className="btn btn-primary w-full mt-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
