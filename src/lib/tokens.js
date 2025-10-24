import colorContrastChecker from 'color-contrast-checker';

const ccc = new colorContrastChecker();

/**
 * Convert hex to RGB
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to hex
 */
export function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate a 050-950 color scale from a base hex color
 * Similar to IBM Carbon or Tailwind's default palette
 */
export function generateColorScale(baseHex, colorName = 'brand') {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return null;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const scale = {
    50: hslToHex(hsl.h, Math.max(hsl.s - 10, 10), 95),
    100: hslToHex(hsl.h, Math.max(hsl.s - 5, 15), 90),
    200: hslToHex(hsl.h, hsl.s, 80),
    300: hslToHex(hsl.h, hsl.s, 70),
    400: hslToHex(hsl.h, hsl.s, 60),
    500: baseHex,
    600: hslToHex(hsl.h, hsl.s, 45),
    700: hslToHex(hsl.h, hsl.s, 35),
    800: hslToHex(hsl.h, hsl.s, 25),
    900: hslToHex(hsl.h, Math.min(hsl.s + 5, 80), 15),
    950: hslToHex(hsl.h, Math.min(hsl.s + 10, 90), 8),
  };

  return { [colorName]: scale };
}

/**
 * Check WCAG contrast ratio between two hex colors
 */
export function checkContrast(foregroundHex, backgroundHex) {
  return {
    ratio: ccc.getContrastRatio(foregroundHex, backgroundHex),
    aa: ccc.isLevelAA(foregroundHex, backgroundHex, 14),
    aaa: ccc.isLevelAAA(foregroundHex, backgroundHex, 14),
    aaLarge: ccc.isLevelAA(foregroundHex, backgroundHex, 18),
    aaaLarge: ccc.isLevelAAA(foregroundHex, backgroundHex, 18),
  };
}

/**
 * Generate accessible text color suggestions for a given background
 */
export function getAccessibleTextColor(backgroundHex) {
  const whiteContrast = checkContrast('#ffffff', backgroundHex);
  const blackContrast = checkContrast('#000000', backgroundHex);

  if (whiteContrast.aa && whiteContrast.ratio > blackContrast.ratio) {
    return { color: '#ffffff', reason: 'White has better contrast', ...whiteContrast };
  }

  if (blackContrast.aa) {
    return { color: '#000000', reason: 'Black provides sufficient contrast', ...blackContrast };
  }

  // If neither works well, return the better one with a warning
  const better = whiteContrast.ratio > blackContrast.ratio ? whiteContrast : blackContrast;
  return {
    color: whiteContrast.ratio > blackContrast.ratio ? '#ffffff' : '#000000',
    reason: 'Neither color meets WCAG AA. Use with caution.',
    ...better,
  };
}

/**
 * Generate responsive typography scale based on base font size
 */
export function generateTypographyScale(baseFontSize = 16) {
  const scale = {
    xs: `${(baseFontSize * 0.75).toFixed(2)}px`,
    sm: `${(baseFontSize * 0.875).toFixed(2)}px`,
    base: `${baseFontSize}px`,
    lg: `${(baseFontSize * 1.125).toFixed(2)}px`,
    xl: `${(baseFontSize * 1.25).toFixed(2)}px`,
    '2xl': `${(baseFontSize * 1.5).toFixed(2)}px`,
    '3xl': `${(baseFontSize * 1.875).toFixed(2)}px`,
    '4xl': `${(baseFontSize * 2.25).toFixed(2)}px`,
    '5xl': `${(baseFontSize * 3).toFixed(2)}px`,
    '6xl': `${(baseFontSize * 3.75).toFixed(2)}px`,
    '7xl': `${(baseFontSize * 4.5).toFixed(2)}px`,
    '8xl': `${(baseFontSize * 6).toFixed(2)}px`,
    '9xl': `${(baseFontSize * 8).toFixed(2)}px`,
  };

  // Also provide rem-based values
  const remScale = {};
  Object.keys(scale).forEach((key) => {
    const pxValue = parseFloat(scale[key]);
    remScale[key] = `${(pxValue / baseFontSize).toFixed(3)}rem`;
  });

  return { px: scale, rem: remScale };
}

/**
 * Generate Tailwind config from design system
 */
export function generateTailwindConfig(designSystem) {
  const { colors, typography, spacing } = designSystem;

  const config = {
    theme: {
      extend: {
        colors: {},
        fontSize: {},
        fontFamily: {},
        spacing: spacing || {},
      },
    },
  };

  // Add color scales
  if (colors) {
    Object.keys(colors).forEach((colorName) => {
      config.theme.extend.colors[colorName] = colors[colorName];
    });
  }

  // Add typography
  if (typography) {
    const scale = generateTypographyScale(typography.baseFontSize);
    config.theme.extend.fontSize = scale.rem;

    if (typography.headingFont) {
      config.theme.extend.fontFamily.heading = [typography.headingFont, 'sans-serif'];
    }
    if (typography.bodyFont) {
      config.theme.extend.fontFamily.body = [typography.bodyFont, 'sans-serif'];
    }
  }

  return config;
}

/**
 * Generate Figma-compatible SVG with color swatches
 */
export function generateFigmaSVG(colors) {
  const swatchWidth = 100;
  const swatchHeight = 100;
  const padding = 10;
  const labelHeight = 30;

  const colorEntries = Object.entries(colors);
  const totalWidth = swatchWidth * colorEntries.length + padding * (colorEntries.length + 1);
  const totalHeight = swatchHeight + labelHeight + padding * 2;

  let svg = `<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;

  colorEntries.forEach(([shade, hex], index) => {
    const x = padding + index * (swatchWidth + padding);
    const y = padding;

    svg += `
  <g id="${shade}">
    <rect x="${x}" y="${y}" width="${swatchWidth}" height="${swatchHeight}" fill="${hex}" />
    <text x="${x + swatchWidth / 2}" y="${y + swatchHeight + labelHeight / 2}"
          text-anchor="middle" font-family="sans-serif" font-size="12" fill="#000">
      ${shade}
    </text>
  </g>`;
  });

  svg += '</svg>';
  return svg;
}
