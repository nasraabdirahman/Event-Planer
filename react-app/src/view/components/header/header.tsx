import ThemeButton from '../../theme/themeButton'
import SearchBar from './SearchBar'
function Header() {
  return(
    <header>
      <h2 className="stack-sans-headline-text" > Event Planner </h2>
      <div className="container">
        <SearchBar />
        <ThemeButton />
      </div>
    </header>
  )
}
export default Header
