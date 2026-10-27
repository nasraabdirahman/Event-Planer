import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './view/components/auth.tsx'
import { ThemeProvider } from './view/theme/colourTheme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider> 
    </AuthProvider>
  </StrictMode>,
);