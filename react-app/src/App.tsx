import './App.css'
import SearchBar from "./view/components/SearchBar";
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from '../src/view/components/footer.tsx'
import SignIn from './sign-in/SignIn.tsx'
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  const [theme, setTheme] = useState('Classic');

  return (
  <>
  <BrowserRouter>
      <SearchBar />
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/calendar" element={<Calendar userId={1}/>}/>
          </Routes>
          <ThemeButton />
          <Footer />
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  </>
)
}

export default App