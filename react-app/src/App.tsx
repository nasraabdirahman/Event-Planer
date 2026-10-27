import './App.css'
import ProfilePage from "./view/components/ProfilePage";
import { useEffect, useContext } from 'react'
import { ThemeContext } from './view/theme/colourTheme';
import { AuthContext } from './view/components/authContext.tsx'
import Calendar from './view/components/calendar/calendar.tsx'
import Header from './view/components/header/header.tsx';
import Footer from "./view/components/footer.tsx";
import SignIn from './view/sign-in/SignIn.tsx'
import SignUp from './view/sign-up/SignUp.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import DisplayCard from './view/components/event/card/cardDisplay.tsx';
import AlterEvent from './view/components/event/editDelete.tsx';

function App() {
  const {theme} = useContext(ThemeContext);
  const {setLoggedInUserId } = useContext(AuthContext);
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
        path="/calendar/:userId"
        element={<Calendar />}
      />

      <Route
        path={`/user/:userId`}
        element={
          <>
            <ProfilePage />
            <DisplayCard />
          </>
        }  
      />

      <Route
        path="/event/:eventId"
        element={<DisplayCard />}
      />
      <Route
        path="/user/archive/:userId"
        element={<DisplayCard />}
      />

      <Route
        path="/event/edit/:eventId"
        element={<AlterEvent />}
      />
      <Route
        path="/create"
        element={<AlterEvent />}
      />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}
export default App

  