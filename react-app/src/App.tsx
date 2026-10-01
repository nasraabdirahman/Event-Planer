import './App.css'
import ProfilePage from "./view/components/ProfilePage";
import { useEffect, useState } from 'react'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Header from './view/components/header/header.tsx';
import Footer from "./view/components/footer.tsx";
import SignIn from './sign-in/SignIn.tsx'
import SignUp from './sign-up/SignUp.tsx'
import AuthNavigation from './view/components/AuthNavigation.tsx'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [theme, setTheme] = useState('Classic');
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
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
  <BrowserRouter>
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
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
          path="/calendar"
          element={<Calendar userId={1} />}
        />
      </Routes>

      {loggedInUserId !== null && (
        <ProfilePage userId={loggedInUserId} />
      )}

      <Footer />
    </ThemeContext.Provider>
  </BrowserRouter>
)
}
export default App
