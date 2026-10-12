import ThemeButton from '../../theme/themeButton'
import AuthNavigation from './AuthNavigation'
import SearchBar from './SearchBar'
import CalendarNav from './calendarNav'
function Header() {
  return(
    <header>
      <h2 className="stack-sans-headline-text" > Event Planner </h2>
      <div className="container">
        <SearchBar />
        <ThemeButton />
        <AuthNavigation />
        <CalendarNav />
      </div>
    </header>
  )
}
export default Header
