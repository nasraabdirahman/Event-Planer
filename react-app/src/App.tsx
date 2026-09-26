import './App.css'
import ProfilePage from "./view/components/ProfilePage";
import SearchBar from "./view/components/SearchBar";
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from "./view/components/footer.tsx";
import SignIn from './sign-in/SignIn.tsx'
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  const [theme, setTheme] = useState('Classic');
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  return (
  <>
    <SearchBar />

    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <SignIn onLogin={setLoggedInUserId} />

        {loggedInUserId !== null && (
        <ProfilePage userId={loggedInUserId} />
        )}
        <Calendar userId={1}/>
        <ThemeButton/>
        <Footer/>
      </div>
    </ThemeContext.Provider>
  </>
)
}

export default App