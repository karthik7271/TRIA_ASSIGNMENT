import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// MSW disabled - using real backend
// if (import.meta.env.DEV) {
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start();
//   });
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
