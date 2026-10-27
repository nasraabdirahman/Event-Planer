import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './view/components/authContext.tsx'
import { ThemeProvider } from './view/theme/colourTheme.tsx'

function Root() {


  return(
    <AuthProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider> 
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);