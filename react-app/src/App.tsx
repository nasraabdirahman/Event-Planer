import './app.css'
import './style.css'
import Footer from './view/components/footer.tsx'
import Calendar from './view/components/calendar/calendar.tsx'
import SignIn from './sign-in/SignIn.tsx'

function App() {
  return (
    <>
      <SignIn />
      <Calendar userId={1}/>
      <Footer/>
    </>
  )
}
export default App
