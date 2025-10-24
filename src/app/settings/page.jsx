import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import useStore from '../../lib/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: settings.projectName || 'My Design System',
    logoUrl: settings.logoUrl || '',
    githubToken: settings.githubToken || '',
    githubRepo: settings.githubRepo || '',
    authorName: settings.authorName || 'Designer',
    authorEmail: settings.authorEmail || 'designer@local',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSettings(formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Generator
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Project Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>Configure your project branding and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={formData.projectName}
                onChange={(e) => handleChange('projectName', e.target.value)}
                placeholder="My Design System"
              />
              <p className="text-xs text-muted-foreground">
                This name will appear in the documentation page
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url">Logo URL</Label>
              <Input
                id="logo-url"
                value={formData.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground">
                URL to your project logo (for documentation)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Git Author Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Git Author</CardTitle>
            <CardDescription>Configure author information for git commits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="author-name">Author Name</Label>
              <Input
                id="author-name"
                value={formData.authorName}
                onChange={(e) => handleChange('authorName', e.target.value)}
                placeholder="Designer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author-email">Author Email</Label>
              <Input
                id="author-email"
                type="email"
                value={formData.authorEmail}
                onChange={(e) => handleChange('authorEmail', e.target.value)}
                placeholder="designer@local"
              />
            </div>
          </CardContent>
        </Card>

        {/* GitHub Integration */}
        <Card>
          <CardHeader>
            <CardTitle>GitHub Integration</CardTitle>
            <CardDescription>
              Connect to GitHub to push your design systems to a repository
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-token">Personal Access Token</Label>
              <Input
                id="github-token"
                type="password"
                value={formData.githubToken}
                onChange={(e) => handleChange('githubToken', e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Create a token at{' '}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  github.com/settings/tokens
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github-repo">Repository URL</Label>
              <Input
                id="github-repo"
                value={formData.githubRepo}
                onChange={(e) => handleChange('githubRepo', e.target.value)}
                placeholder="https://github.com/username/repo.git"
              />
              <p className="text-xs text-muted-foreground">
                The full HTTPS URL of your GitHub repository
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Security Note:</strong> Your GitHub token is stored in browser
                LocalStorage. Only use this app on trusted devices.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full" size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
