import { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import useStore from '../../lib/store';
import { generateComponent } from '../../lib/ai';
import ComponentStateViewer from './ComponentStateViewer';

export default function PreviewPanel() {
  const { getActiveSystem, darkMode, generatedComponents, addGeneratedComponent } = useStore();
  const activeSystem = getActiveSystem();

  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const handleGenerateComponent = async () => {
    if (!aiPrompt.trim()) return;

    setGenerating(true);
    const result = await generateComponent(aiPrompt, activeSystem);
    if (result.success) {
      addGeneratedComponent({
        prompt: aiPrompt,
        code: result.code,
        explanation: result.explanation,
      });
      setAiPrompt('');
    }
    setGenerating(false);
  };

  if (!activeSystem) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">No active design system</p>
      </div>
    );
  }

  // Apply the design system styles dynamically
  const brandColor = activeSystem.colors?.brand?.['500'] || '#3b82f6';
  const headingFont = activeSystem.typography?.headingFont || 'Inter';
  const bodyFont = activeSystem.typography?.bodyFont || 'Inter';
  const baseFontSize = activeSystem.typography?.baseFontSize || 16;

  // Create CSS custom properties for the active system
  const systemStyles = {
    '--brand-50': activeSystem.colors?.brand?.['50'],
    '--brand-100': activeSystem.colors?.brand?.['100'],
    '--brand-200': activeSystem.colors?.brand?.['200'],
    '--brand-300': activeSystem.colors?.brand?.['300'],
    '--brand-400': activeSystem.colors?.brand?.['400'],
    '--brand-500': activeSystem.colors?.brand?.['500'],
    '--brand-600': activeSystem.colors?.brand?.['600'],
    '--brand-700': activeSystem.colors?.brand?.['700'],
    '--brand-800': activeSystem.colors?.brand?.['800'],
    '--brand-900': activeSystem.colors?.brand?.['900'],
    '--brand-950': activeSystem.colors?.brand?.['950'],
    fontFamily: bodyFont,
    fontSize: `${baseFontSize}px`,
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 space-y-8" style={systemStyles}>
        {/* AI Component Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Component Generator
            </CardTitle>
            <CardDescription>
              Describe a component and AI will generate it using your design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder='Try: "newsletter signup form" or "pricing card"'
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateComponent()}
              />
              <Button onClick={handleGenerateComponent} disabled={generating}>
                <Sparkles className="mr-2 h-4 w-4" />
                {generating ? 'Generating...' : 'Generate'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: headingFont }}>
            Live Preview
          </h2>
          <p className="text-muted-foreground mb-8">
            Hover over components to view their interactive states
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Buttons
          </h3>
          <div className="flex flex-wrap gap-3">
            <div
              className="relative inline-block"
              onMouseEnter={() => setHoveredComponent('button-default')}
              onMouseLeave={() => setHoveredComponent(null)}
            >
              <Button
                style={{
                  backgroundColor: brandColor,
                  fontFamily: bodyFont,
                }}
              >
                Primary Button
              </Button>
              {hoveredComponent === 'button-default' && (
                <ComponentStateViewer
                  componentName="Primary Button"
                  baseColor={brandColor}
                  onClose={() => setHoveredComponent(null)}
                />
              )}
            </div>
            <Button variant="outline">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: headingFont }}>Card Title</CardTitle>
                <CardDescription>This is a card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{ fontFamily: bodyFont }}>
                  This is the card content area. It can contain any content you want.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle style={{ fontFamily: headingFont }}>Another Card</CardTitle>
                <CardDescription>With more content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full"
                  style={{
                    backgroundColor: brandColor,
                  }}
                >
                  Call to Action
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Alerts
          </h3>
          <Alert>
            <AlertTitle style={{ fontFamily: headingFont }}>Heads up!</AlertTitle>
            <AlertDescription style={{ fontFamily: bodyFont }}>
              This is a default alert with important information.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle style={{ fontFamily: headingFont }}>Error</AlertTitle>
            <AlertDescription style={{ fontFamily: bodyFont }}>
              This is a destructive alert indicating an error.
            </AlertDescription>
          </Alert>
        </div>

        {/* Badges */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge style={{ backgroundColor: brandColor }}>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Typography Scale */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Typography Scale
          </h3>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold" style={{ fontFamily: headingFont }}>
              Heading 1
            </h1>
            <h2 className="text-4xl font-bold" style={{ fontFamily: headingFont }}>
              Heading 2
            </h2>
            <h3 className="text-3xl font-semibold" style={{ fontFamily: headingFont }}>
              Heading 3
            </h3>
            <h4 className="text-2xl font-semibold" style={{ fontFamily: headingFont }}>
              Heading 4
            </h4>
            <p className="text-base" style={{ fontFamily: bodyFont }}>
              This is body text at the base font size. It demonstrates the readability and spacing
              of your typography system.
            </p>
            <p className="text-sm" style={{ fontFamily: bodyFont }}>
              This is small text, often used for captions or secondary information.
            </p>
          </div>
        </div>

        {/* Form Elements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
            Form Elements
          </h3>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="example-input">Input Field</Label>
                <Input id="example-input" placeholder="Enter some text..." />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="example-switch" />
                <Label htmlFor="example-switch">Toggle switch</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generated Components */}
        {generatedComponents.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ fontFamily: headingFont }}>
              AI Generated Components
            </h3>
            {generatedComponents.map((comp) => (
              <Card key={comp.id}>
                <CardHeader>
                  <CardTitle style={{ fontFamily: headingFont }}>
                    Generated: {comp.prompt}
                  </CardTitle>
                  <CardDescription>{comp.explanation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: comp.code }}
                    style={{ fontFamily: bodyFont }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
