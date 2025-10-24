import { Plus, Settings, FileText } from 'lucide-react';
import useStore from '../lib/store';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { designSystems, activeSystemId, setActiveSystem, addDesignSystem, sidebarOpen } = useStore();
  const navigate = useNavigate();

  const handleNewSystem = () => {
    const newSystem = {
      name: 'New System ' + (designSystems.length + 1),
      description: 'A new design system',
      colors: {
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
        },
      },
      typography: { baseFontSize: 16, headingFont: 'Inter', bodyFont: 'Inter' },
      spacing: {},
    };
    addDesignSystem(newSystem);
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="btn btn-primary w-full" onClick={handleNewSystem}>
          <Plus size={16} style={{ marginRight: '0.5rem' }} />
          New Design System
        </button>
        <div className="flex gap-sm mt-md">
          <button className="btn btn-secondary btn-sm" style={{flex: 1}} onClick={() => navigate('/settings')}>
            <Settings size={14} style={{ marginRight: '0.25rem' }} />
            Settings
          </button>
          <button className="btn btn-secondary btn-sm" style={{flex: 1}} onClick={() => navigate('/docs')}>
            <FileText size={14} style={{ marginRight: '0.25rem' }} />
            Docs
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {designSystems.length === 0 ? (
          <p className="text-sm text-muted text-center" style={{ paddingTop: '2rem' }}>
            No design systems found
          </p>
        ) : (
          designSystems.map((system) => (
            <div
              key={system.id}
              className={'sidebar-item' + (activeSystemId === system.id ? ' active' : '')}
              onClick={() => setActiveSystem(system.id)}
            >
              <div className="sidebar-item-title">{system.name}</div>
              <div className="sidebar-item-description">{system.description}</div>
              <div className="sidebar-item-description">{new Date(system.updatedAt).toLocaleDateString()}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
