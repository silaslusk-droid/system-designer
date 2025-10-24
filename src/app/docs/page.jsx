import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import useStore from '../../lib/store';

export default function DocsPage() {
  const navigate = useNavigate();
  const { getActiveSystem, settings } = useStore();
  const activeSystem = getActiveSystem();

  if (!activeSystem) {
    return (
      <div className="container mx-auto p-8">
        <Alert>
          <AlertTitle>No Active Design System</AlertTitle>
          <AlertDescription>
            Please select or create a design system first.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Go to Generator
        </Button>
      </div>
    );
  }

  const brandColor = activeSystem.colors?.brand?.['500'] || '#3b82f6';
  const headingFont = activeSystem.typography?.headingFont || 'Inter';
  const bodyFont = activeSystem.typography?.bodyFont || 'Inter';
  const baseFontSize = activeSystem.typography?.baseFontSize || 16;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {settings.logoUrl && (
              <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
            )}
            <h1 className="text-2xl font-bold" style={{ fontFamily: headingFont }}>
              {settings.projectName}
            </h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-8" style={{ fontFamily: bodyFont, fontSize: `${baseFontSize}px` }}>
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: headingFont }}>
            {activeSystem.name}
          </h2>
          <p className="text-lg text-muted-foreground">{activeSystem.description}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date(activeSystem.updatedAt).toLocaleDateString()}
          </p>
        </section>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: headingFont }}>
            Color Palette
          </h2>

          {activeSystem.colors && Object.entries(activeSystem.colors).map(([colorName, shades]) => (
            <div key={colorName} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 capitalize" style={{ fontFamily: headingFont }}>
                {colorName}
              </h3>
              <div className="grid grid-cols-11 gap-2">
                {Object.entries(shades).map(([shade, hex]) => (
                  <div key={shade} className="space-y-2">
                    <div
                      className="h-24 rounded-lg shadow-md border"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="text-center">
                      <p className="text-xs font-semibold">{shade}</p>
                      <p className="text-xs text-muted-foreground">{hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: headingFont }}>
            Typography
          </h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Font Family</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Heading Font</p>
                <p className="text-2xl font-bold" style={{ fontFamily: headingFont }}>
                  {activeSystem.typography?.headingFont}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Body Font</p>
                <p className="text-xl" style={{ fontFamily: bodyFont }}>
                  {activeSystem.typography?.bodyFont}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Base Font Size</p>
                <p className="text-xl">{activeSystem.typography?.baseFontSize}px</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: headingFont }}>
              Type Scale
            </h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h1 className="text-5xl font-bold" style={{ fontFamily: headingFont }}>
                  Heading 1
                </h1>
                <p className="text-sm text-muted-foreground">5xl / 3rem</p>
              </div>
              <div className="border-b pb-4">
                <h2 className="text-4xl font-bold" style={{ fontFamily: headingFont }}>
                  Heading 2
                </h2>
                <p className="text-sm text-muted-foreground">4xl / 2.25rem</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-3xl font-semibold" style={{ fontFamily: headingFont }}>
                  Heading 3
                </h3>
                <p className="text-sm text-muted-foreground">3xl / 1.875rem</p>
              </div>
              <div className="border-b pb-4">
                <h4 className="text-2xl font-semibold" style={{ fontFamily: headingFont }}>
                  Heading 4
                </h4>
                <p className="text-sm text-muted-foreground">2xl / 1.5rem</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-base" style={{ fontFamily: bodyFont }}>
                  Body Text - The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-sm text-muted-foreground">base / 1rem</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm" style={{ fontFamily: bodyFont }}>
                  Small Text - The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-sm text-muted-foreground">sm / 0.875rem</p>
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: headingFont }}>
            Components
          </h2>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: headingFont }}>
                Buttons
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button style={{ backgroundColor: brandColor }}>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: headingFont }}>
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge style={{ backgroundColor: brandColor }}>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: headingFont }}>
                Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle style={{ fontFamily: headingFont }}>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p style={{ fontFamily: bodyFont }}>
                      This is the card content. It can contain any information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: headingFont }}>
                Alerts
              </h3>
              <div className="space-y-4">
                <Alert>
                  <AlertTitle style={{ fontFamily: headingFont }}>Information</AlertTitle>
                  <AlertDescription style={{ fontFamily: bodyFont }}>
                    This is an informational alert message.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle style={{ fontFamily: headingFont }}>Error</AlertTitle>
                  <AlertDescription style={{ fontFamily: bodyFont }}>
                    This is an error alert message.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
