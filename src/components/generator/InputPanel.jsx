import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useStore from '../../lib/store';
import { generateColorScale, getAccessibleTextColor, checkContrast } from '../../lib/tokens';
import { suggestFontPairing } from '../../lib/ai';

const googleFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Poppins',
  'Playfair Display',
  'Lora',
  'Merriweather',
  'Source Sans Pro',
  'Nunito',
  'IBM Plex Sans',
  'PingFang SC',
  'Bebas Neue',
];

export default function InputPanel() {
  const { getActiveSystem, updateColors, updateTypography } = useStore();
  const activeSystem = getActiveSystem();

  const [brandColor, setBrandColor] = useState(activeSystem?.colors?.brand?.['500'] || '#3b82f6');
  const [bgColor, setBgColor] = useState(activeSystem?.colors?.background?.['500'] || '#9ca3af');
  const [contentColor, setContentColor] = useState(
    activeSystem?.colors?.content?.['500'] || '#6b7280'
  );
  const [baseFontSize, setBaseFontSize] = useState(activeSystem?.typography?.baseFontSize || 16);
  const [headingFont, setHeadingFont] = useState(
    activeSystem?.typography?.headingFont || 'Inter'
  );
  const [bodyFont, setBodyFont] = useState(activeSystem?.typography?.bodyFont || 'Inter');
  const [suggesting, setSuggesting] = useState(false);

  const brandScale = generateColorScale(brandColor, 'brand');
  const accessibleText = getAccessibleTextColor(brandColor);

  const handleBrandColorChange = (e) => {
    const color = e.target.value;
    setBrandColor(color);
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      updateColors('brand', color);
    }
  };

  const handleBgColorChange = (e) => {
    const color = e.target.value;
    setBgColor(color);
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      updateColors('background', color);
    }
  };

  const handleContentColorChange = (e) => {
    const color = e.target.value;
    setContentColor(color);
    if (/^#[0-9A-F]{6}$/i.test(color)) {
      updateColors('content', color);
    }
  };

  const handleBaseFontSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setBaseFontSize(size);
    updateTypography({ baseFontSize: size });
  };

  const handleHeadingFontChange = (value) => {
    setHeadingFont(value);
    updateTypography({ headingFont: value });
  };

  const handleBodyFontChange = (value) => {
    setBodyFont(value);
    updateTypography({ bodyFont: value });
  };

  const handleSuggestPairing = async () => {
    setSuggesting(true);
    const result = await suggestFontPairing();
    if (result.success) {
      setHeadingFont(result.pairing.heading);
      setBodyFont(result.pairing.body);
      updateTypography({
        headingFont: result.pairing.heading,
        bodyFont: result.pairing.body,
      });
      alert(`Suggested: ${result.pairing.style}\n\n${result.reasoning}`);
    }
    setSuggesting(false);
  };

  if (!activeSystem) {
    return (
      <div className="w-96 border-r bg-background/50 p-6">
        <p className="text-muted-foreground">No active design system. Create or select one.</p>
      </div>
    );
  }

  return (
    <div className="w-96 border-r bg-background/50 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{activeSystem.name}</h2>
          <p className="text-sm text-muted-foreground">{activeSystem.description}</p>
        </div>

        {/* Colors Section */}
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Define your color palette</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-color">Brand Color</Label>
              <div className="flex gap-2">
                <Input
                  id="brand-color"
                  type="color"
                  value={brandColor}
                  onChange={handleBrandColorChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={brandColor}
                  onChange={handleBrandColorChange}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>

              {/* Color Swatches */}
              {brandScale && (
                <div className="grid grid-cols-5 gap-1 mt-2">
                  {Object.entries(brandScale.brand).map(([shade, hex]) => (
                    <div key={shade} className="text-center">
                      <div
                        className="h-12 rounded border"
                        style={{ backgroundColor: hex }}
                        title={`${shade}: ${hex}`}
                      />
                      <span className="text-xs text-muted-foreground">{shade}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Accessibility Info */}
              {accessibleText && (
                <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                  <p className="font-semibold">Accessibility</p>
                  <p>
                    Recommended text color: <strong>{accessibleText.color}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">{accessibleText.reason}</p>
                  <p className="text-xs mt-1">
                    Contrast ratio: {accessibleText.ratio.toFixed(2)}:1
                    {accessibleText.aa ? ' ✓ WCAG AA' : ' ✗ Fails WCAG AA'}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={handleBgColorChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={bgColor}
                  onChange={handleBgColorChange}
                  placeholder="#9ca3af"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-color">Content Color</Label>
              <div className="flex gap-2">
                <Input
                  id="content-color"
                  type="color"
                  value={contentColor}
                  onChange={handleContentColorChange}
                  className="w-16 h-10 p-1"
                />
                <Input
                  type="text"
                  value={contentColor}
                  onChange={handleContentColorChange}
                  placeholder="#6b7280"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography Section */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Set your font system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-font-size">Base Font Size (px)</Label>
              <Input
                id="base-font-size"
                type="number"
                min="12"
                max="24"
                value={baseFontSize}
                onChange={handleBaseFontSizeChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heading-font">Heading Font</Label>
              <Select value={headingFont} onValueChange={handleHeadingFontChange}>
                <SelectTrigger id="heading-font">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {googleFonts.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="body-font">Body Font</Label>
              <Select value={bodyFont} onValueChange={handleBodyFontChange}>
                <SelectTrigger id="body-font">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {googleFonts.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleSuggestPairing}
              disabled={suggesting}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {suggesting ? 'Suggesting...' : 'AI Suggest Pairing'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
