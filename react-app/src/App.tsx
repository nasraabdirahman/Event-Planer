import './app.css'
import './style.css'
import Footer from './view/components/footer.tsx'
import Calendar from './view/components/calendar/calendar.tsx'


function App() {
  return (
    <>
      <Calendar userId={1}/>
      <Footer/>
    </>
  )
}

export default App
