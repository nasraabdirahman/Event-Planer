import './App.css'
import SearchBar from "./view/components/SearchBar";
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from '../src/view/components/footer.tsx'
import SignIn from './sign-in/SignIn.tsx'
import SignUp from './sign-up/SignUp.tsx'
import AuthNavigation from './view/components/AuthNavigation.tsx'
import {BrowserRouter, Routes, Route, useLocation} from "react-router";

function AppContent() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <>
      {!isAuthPage && <AuthNavigation />}
      <Routes>
        <Route path="/" element={<><SearchBar /><Calendar userId={1}/></>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/calender" element={<Calendar userId={1}/>}/>
      </Routes>
      {!isAuthPage && <ThemeButton />}
      <Footer />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('Classic');

  return (
  <>
  <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <AppContent />
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  </>
)
}

export default App
