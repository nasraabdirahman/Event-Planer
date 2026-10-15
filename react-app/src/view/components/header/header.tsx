import ThemeButton from '../../theme/themeButton'
import AuthNavigation from './AuthNavigation'
import SearchBar from './SearchBar'
import { Link } from 'react-router';
import CalendarNav from './calendarNav'
function Header() {
  return(
    <header>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 className="stack-sans-headline-text">Event Planner</h2>
      </Link>
      <div className="container">
        <SearchBar />
        <ThemeButton />
        <CalendarNav />
        <AuthNavigation />
      </div>
    </header>
  )
}
export default Header
