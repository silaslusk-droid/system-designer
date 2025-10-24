import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export default function ComponentStateViewer({ componentName, baseColor, onClose }) {
  // Generate state colors
  const hoverColor = adjustColor(baseColor, -10);
  const activeColor = adjustColor(baseColor, -20);
  const disabledColor = adjustColor(baseColor, 30);

  return (
    <div className="absolute top-full left-0 mt-2 z-50">
      <Card className="w-64 shadow-lg border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">{componentName} States</CardTitle>
          <CardDescription className="text-xs">Interactive state preview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <p className="text-xs font-medium">Default</p>
            <div
              className="h-8 rounded-md flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: baseColor }}
            >
              Normal
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">:hover</p>
            <div
              className="h-8 rounded-md flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: hoverColor }}
            >
              Hovered
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">:active</p>
            <div
              className="h-8 rounded-md flex items-center justify-center text-white text-xs"
              style={{ backgroundColor: activeColor }}
            >
              Active
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">:disabled</p>
            <div
              className="h-8 rounded-md flex items-center justify-center text-white text-xs opacity-50"
              style={{ backgroundColor: disabledColor }}
            >
              Disabled
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onClose} className="w-full mt-2">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to adjust color lightness
function adjustColor(hex, percent) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  r = Math.max(0, Math.min(255, r + (r * percent) / 100));
  g = Math.max(0, Math.min(255, g + (g * percent) / 100));
  b = Math.max(0, Math.min(255, b + (b * percent) / 100));

  // Convert back to hex
  const toHex = (n) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
