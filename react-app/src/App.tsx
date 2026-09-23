import './App.css'
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Footer from './footer.tsx'

function App() {
  const [theme, setTheme] = useState('Classic');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`theme-${theme}`}>
        <ThemeButton/>
        <Footer/>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
