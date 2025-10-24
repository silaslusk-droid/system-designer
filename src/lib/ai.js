/**
 * Mock AI functions for design system generation
 * In a real implementation, these would call OpenAI, Anthropic, or similar APIs
 */

// Simulated delay for realistic AI feel
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * AI-powered font pairing suggestions
 */
export async function suggestFontPairing(context = {}) {
  await delay(1000); // Simulate API call

  const pairings = [
    { heading: 'Playfair Display', body: 'Source Sans Pro', style: 'Elegant & Modern' },
    { heading: 'Oswald', body: 'Roboto', style: 'Bold & Clean' },
    { heading: 'Montserrat', body: 'Open Sans', style: 'Contemporary & Friendly' },
    { heading: 'Lora', body: 'Merriweather', style: 'Classic & Readable' },
    { heading: 'Raleway', body: 'Lato', style: 'Sophisticated & Simple' },
    { heading: 'Bebas Neue', body: 'Nunito', style: 'Striking & Warm' },
    { heading: 'Poppins', body: 'Inter', style: 'Modern & Professional' },
  ];

  const randomPair = pairings[Math.floor(Math.random() * pairings.length)];

  return {
    success: true,
    pairing: randomPair,
    reasoning: `This ${randomPair.style.toLowerCase()} combination creates a strong visual hierarchy. ${randomPair.heading} for headings provides personality, while ${randomPair.body} ensures excellent readability for body text.`,
  };
}

/**
 * AI-powered component scaffolding
 * Generates Tailwind-compatible HTML/JSX from a natural language prompt
 */
export async function generateComponent(prompt, designSystem = {}) {
  await delay(1500); // Simulate API call

  const components = {
    'newsletter signup': `
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-heading font-bold mb-2 text-gray-900 dark:text-white">
          Stay Updated
        </h2>
        <p className="text-base font-body text-gray-600 dark:text-gray-400 mb-4">
          Get the latest updates delivered straight to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    `,
    'pricing card': `
      <div className="w-80 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-xl border-2 border-brand-500">
        <div className="text-center mb-6">
          <h3 className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-2">
            Premium
          </h3>
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">$29</span>
            <span className="text-xl text-gray-500 dark:text-gray-400 ml-2">/mo</span>
          </div>
        </div>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5 text-brand-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Unlimited projects
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5 text-brand-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Priority support
          </li>
          <li className="flex items-center text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5 text-brand-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Advanced analytics
          </li>
        </ul>
        <button className="w-full py-3 px-6 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors duration-200">
          Get Started
        </button>
      </div>
    `,
    'contact form': `
      <div className="w-full max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900 dark:text-white">
          Get in Touch
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    `,
  };

  // Simple keyword matching
  const lowerPrompt = prompt.toLowerCase();
  let componentCode = null;

  for (const [key, code] of Object.entries(components)) {
    if (lowerPrompt.includes(key)) {
      componentCode = code;
      break;
    }
  }

  // Default fallback component
  if (!componentCode) {
    componentCode = `
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-heading font-bold mb-2 text-gray-900 dark:text-white">
          Custom Component
        </h3>
        <p className="text-base font-body text-gray-600 dark:text-gray-400 mb-4">
          ${prompt}
        </p>
        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors">
          Action
        </button>
      </div>
    `;
  }

  return {
    success: true,
    code: componentCode,
    explanation: `Generated a component based on your prompt: "${prompt}". The component uses your current design system tokens.`,
  };
}

/**
 * AI-powered accessibility audit
 */
export async function auditAccessibility(designSystem = {}) {
  await delay(2000); // Simulate API call

  const issues = [];

  // Check color contrast
  if (designSystem.colors?.brand) {
    const brand500 = designSystem.colors.brand['500'];
    issues.push({
      severity: 'warning',
      component: 'Primary Button',
      issue: `Contrast ratio for white text on ${brand500} should be verified`,
      recommendation: 'Ensure contrast ratio is at least 4.5:1 for WCAG AA compliance',
      wcag: 'WCAG 2.1 Level AA (1.4.3)',
    });
  }

  // Check font sizes
  if (designSystem.typography?.baseFontSize < 16) {
    issues.push({
      severity: 'error',
      component: 'Typography',
      issue: `Base font size of ${designSystem.typography.baseFontSize}px is below recommended minimum`,
      recommendation: 'Use at least 16px for body text to ensure readability',
      wcag: 'WCAG 2.1 Level AA (1.4.4)',
    });
  }

  // Mock additional issues
  issues.push(
    {
      severity: 'info',
      component: 'Interactive Elements',
      issue: 'Focus states should be clearly visible',
      recommendation: 'Ensure all interactive elements have visible focus indicators with sufficient contrast',
      wcag: 'WCAG 2.1 Level AA (2.4.7)',
    },
    {
      severity: 'warning',
      component: 'Color-only Information',
      issue: 'Do not rely on color alone to convey information',
      recommendation: 'Use icons, text labels, or patterns in addition to color',
      wcag: 'WCAG 2.1 Level A (1.4.1)',
    },
    {
      severity: 'info',
      component: 'Touch Targets',
      issue: 'Ensure interactive elements are at least 44x44px',
      recommendation: 'Increase button padding to meet minimum touch target size',
      wcag: 'WCAG 2.1 Level AAA (2.5.5)',
    }
  );

  return {
    success: true,
    issues,
    summary: {
      total: issues.length,
      errors: issues.filter((i) => i.severity === 'error').length,
      warnings: issues.filter((i) => i.severity === 'warning').length,
      info: issues.filter((i) => i.severity === 'info').length,
    },
  };
}

/**
 * AI-powered color palette suggestion based on mood/industry
 */
export async function suggestColorPalette(mood = 'professional', industry = 'tech') {
  await delay(1000);

  const palettes = {
    'professional-tech': { primary: '#3B82F6', name: 'Tech Blue' },
    'creative-design': { primary: '#8B5CF6', name: 'Creative Purple' },
    'friendly-health': { primary: '#10B981', name: 'Health Green' },
    'energetic-retail': { primary: '#F59E0B', name: 'Energetic Amber' },
    'calm-finance': { primary: '#06B6D4', name: 'Trust Cyan' },
  };

  const key = `${mood}-${industry}`;
  const palette = palettes[key] || palettes['professional-tech'];

  return {
    success: true,
    palette,
    reasoning: `Based on ${mood} mood and ${industry} industry, this color conveys trust and innovation.`,
  };
}
