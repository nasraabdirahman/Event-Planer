import './App.css'
import ProfilePage from "./view/components/ProfilePage";
import SearchBar from "./view/components/SearchBar";
import {useState} from 'react'
import ThemeButton from './view/theme/themeButton'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Footer from "./view/components/footer.tsx";
import SignIn from './sign-in/SignIn.tsx'
import SignUp from './sign-up/SignUp.tsx'
import AuthNavigation from './view/components/AuthNavigation.tsx'
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  const [theme, setTheme] = useState('Classic');
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

  return (
  <BrowserRouter>
    <SearchBar />

    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <AuthNavigation />

        <Routes>
          <Route
            path="/"
            element={<SignIn onLogin={setLoggedInUserId} />}
          />

          <Route
            path="/sign-up"
            element={<SignUp />}
          />

          <Route
            path="/calender"
            element={<Calendar userId={1} />}
          />
        </Routes>

        {loggedInUserId !== null && (
          <ProfilePage userId={loggedInUserId} />
        )}

        <ThemeButton />
        <Footer />
      </div>
    </ThemeContext.Provider>
  </BrowserRouter>
)
}
export default App
