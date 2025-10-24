# Design System Generator

A modern, self-hosted, browser-based design system generator built with React, Vite, and Tailwind CSS. Create, customize, and export production-ready design systems with powerful AI-assisted tools.

## Features

### Core Functionality
- **Real-time WYSIWYG Editor**: See your design system come to life as you make changes
- **Color System Generator**: Generate complete 050-950 color scales from a single HEX code
- **Responsive Typography**: Automatically generate rem-based typographic scales
- **Component Preview**: Live preview of all UI components with your custom theme

### AI-Powered Tools
- **AI Font Pairing**: Get intelligent font combination suggestions
- **AI Component Generator**: Generate custom components from natural language descriptions
- **AI Accessibility Auditor**: Automated WCAG compliance checking

### Export Capabilities
- **Tailwind Config**: Export ready-to-use `tailwind.config.js`
- **Figma SVG**: Export color swatches as SVG for direct import into Figma
- **GitHub Integration**: Push design systems directly to GitHub repositories

### Developer Features
- **Local Git Versioning**: Track changes with isomorphic-git in the browser
- **LocalStorage Persistence**: All your design systems saved locally
- **5 Predefined Systems**: Start with Material, Carbon, Ant Design, and more
- **Dark Mode Support**: Built-in light/dark theme switching
- **Whitelabel Documentation**: Auto-generated, brandable documentation pages

## Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with @tailwindcss/postcss
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **State Management**: Zustand with persist middleware
- **Git Operations**: isomorphic-git with lightning-fs (IndexedDB)
- **Icons**: lucide-react
- **Routing**: react-router-dom

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

### Getting Started

1. **Select a Design System**: Choose from 5 predefined systems in the sidebar or create a new one
2. **Customize Colors**: Enter HEX codes to generate complete color scales
3. **Set Typography**: Choose fonts and base size for responsive scaling
4. **Preview Components**: See all components update in real-time
5. **Export**: Generate Tailwind config or Figma-compatible SVG

### AI Features

#### Font Pairing
Click "AI Suggest Pairing" in the Typography section to get intelligent font combinations.

#### Component Generation
Type a description like "newsletter signup form" in the AI Component Generator.

#### Accessibility Audit
Click "Audit Accessibility" in the header to run a WCAG compliance check.

### GitHub Integration

1. Go to **Settings**
2. Add your GitHub Personal Access Token
3. Enter your repository URL
4. Use "Push to GitHub" button in sidebar

## Security Notes

⚠️ **GitHub Token Storage**: Personal access tokens are stored in browser LocalStorage. Only use this application on trusted devices.

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 15.4+)

## License

MIT License

---

Made with ❤️ for designers and developers
