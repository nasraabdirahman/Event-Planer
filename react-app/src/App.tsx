import './App.css'
import ProfilePage from "./view/components/ProfilePage";
import { useEffect, useState } from 'react'
import { ThemeContext } from './view/theme/colourTheme';
import Calendar from './view/components/calendar/calendar.tsx'
import Header from './view/components/header/header.tsx';
import Footer from "./view/components/footer.tsx";
import SignIn from './sign-in/SignIn.tsx'
import SignUp from './sign-up/SignUp.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import DisplayCard from './view/components/card/cardDisplay.tsx';

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
      
      <Routes>
        <Route
          path="/"
          element={<DisplayCard />}
        />

        <Route
          path="/sign-in"
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

        {loggedInUserId !== null && (
          <Route
            path={`/user/${loggedInUserId}`}
            element={<ProfilePage userId={loggedInUserId} />}  
          />
         )}
      </Routes>

      
        
    

      <Footer />
    </ThemeContext.Provider>
  </BrowserRouter>
)
}
export default App
