import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/weightlifting-calculator/sw.js', { scope: '/weightlifting-calculator/' })
      .then((reg) => {
        console.log('Service worker registered:', reg.scope);
      })
      .catch((err) => {
        console.error('Service worker registration failed:', err);
      });
  });
}