import './App.css'
import {useState, useEffect} from 'react'
import Header from "./view/components/header/header.tsx";
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from '../src/view/components/footer.tsx'
import SignIn from './sign-in/SignIn.tsx'
import SignUp from './sign-up/SignUp.tsx'
import AuthNavigation from './view/components/AuthNavigation.tsx'
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  const [theme, setTheme] = useState('Classic');
    useEffect(() => {
      document.documentElement.classList.remove(
        'theme-Classic',
        'theme-Sakura',
        'theme-Monet',
        'theme-Cyberpunk'
      );
      document.documentElement.classList.add(`theme-${theme}`);
    },[theme]);


  return (
  <>
  <BrowserRouter>
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header/>
        <AuthNavigation />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/calender" element={<Calendar userId={1}/>}/>
        </Routes>
        <Footer />
    </ThemeContext.Provider>
  </BrowserRouter>
  </>
)
}

export default App
