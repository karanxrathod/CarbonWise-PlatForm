import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Check if we're on the landing page URL and explicitly not loading index.js
if (window.location.pathname === '/landing.html') {
  // If Vite accidentally executed main.tsx on landing.html, don't mount the app
  console.log('Skipping React mount on landing page');
} else {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

