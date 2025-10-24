import { Plus, Settings, FileText, Github, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import useStore from '../lib/store';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { saveDesignSystem, pushToGitHub } from '../lib/git';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const {
    designSystems,
    activeSystemId,
    setActiveSystem,
    addDesignSystem,
    sidebarOpen,
    searchQuery,
    settings,
  } = useStore();

  const navigate = useNavigate();
  const [pushing, setPushing] = useState({});

  const filteredSystems = designSystems.filter((system) =>
    system.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewSystem = () => {
    const newSystem = {
      name: `New System ${designSystems.length + 1}`,
      description: 'A new design system',
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      typography: {
        baseFontSize: 16,
        headingFont: 'Inter',
        bodyFont: 'Inter',
      },
      spacing: {},
    };
    addDesignSystem(newSystem);
  };

  const handleSaveSystem = async (system) => {
    const result = await saveDesignSystem(system);
    if (result.success) {
      alert('Design system saved to git!');
    } else {
      alert('Error saving: ' + result.error);
    }
  };

  const handlePushToGitHub = async (system) => {
    if (!settings.githubToken || !settings.githubRepo) {
      alert('Please configure GitHub settings first');
      navigate('/settings');
      return;
    }

    setPushing((prev) => ({ ...prev, [system.id]: true }));

    // Save first
    await saveDesignSystem(system);

    // Then push
    const result = await pushToGitHub(
      settings.githubToken,
      settings.githubRepo,
      'main'
    );

    setPushing((prev) => ({ ...prev, [system.id]: false }));

    if (result.success) {
      alert('Successfully pushed to GitHub!');
    } else {
      alert('Error pushing to GitHub: ' + result.error);
    }
  };

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="w-64 border-r bg-background/50 flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b space-y-2">
        <Button className="w-full" onClick={handleNewSystem}>
          <Plus className="mr-2 h-4 w-4" />
          New Design System
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" className="flex-1" size="sm" onClick={() => navigate('/docs')}>
            <FileText className="mr-2 h-4 w-4" />
            Docs
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredSystems.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No design systems found
          </p>
        ) : (
          filteredSystems.map((system) => (
            <Card
              key={system.id}
              className={cn(
                'p-3 cursor-pointer transition-all hover:shadow-md group',
                activeSystemId === system.id && 'border-primary bg-primary/5'
              )}
              onClick={() => setActiveSystem(system.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{system.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {system.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(system.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveSystem(system);
                  }}
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePushToGitHub(system);
                  }}
                  disabled={pushing[system.id]}
                >
                  <Github className="h-3 w-3 mr-1" />
                  {pushing[system.id] ? 'Pushing...' : 'Push'}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </aside>
  );
}
