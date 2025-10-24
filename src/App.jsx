import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/layout';
import GeneratorPage from './app/page';
import SettingsPage from './app/settings/page';
import DocsPage from './app/docs/page';
import useStore from './lib/store';
import { predefinedSystems } from './data/predefined';
import './index.css';

function App() {
  const { darkMode, initializePredefined } = useStore();

  // Initialize predefined systems on first load
  useEffect(() => {
    initializePredefined(predefinedSystems);
  }, [initializePredefined]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load Google Fonts dynamically
  useEffect(() => {
    const fonts = [
      'Inter:wght@400;500;600;700',
      'Roboto:wght@400;500;700',
      'Open+Sans:wght@400;600;700',
      'Lato:wght@400;700',
      'Montserrat:wght@400;600;700',
      'Oswald:wght@400;600',
      'Raleway:wght@400;600;700',
      'Poppins:wght@400;600;700',
      'Playfair+Display:wght@400;700',
      'Lora:wght@400;600',
      'Merriweather:wght@400;700',
      'Source+Sans+Pro:wght@400;600',
      'Nunito:wght@400;600;700',
    ];

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${f}`).join('&')}&display=swap`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <GeneratorPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
