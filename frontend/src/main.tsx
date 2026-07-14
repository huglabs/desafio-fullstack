import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContext } from './contexts/AuthContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
