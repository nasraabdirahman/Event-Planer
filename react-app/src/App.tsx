import './App.css'
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from './footer.tsx'
import SignIn from './sign-in/SignIn.tsx'

function App() {
  const [theme, setTheme] = useState('Classic');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <div className={`theme-${theme}`}>
        <SignIn />
        <Calendar userId={1}/>
        <ThemeButton/>
        <Footer/>
      </div>
    </ThemeContext.Provider>
  )
}
export default App
