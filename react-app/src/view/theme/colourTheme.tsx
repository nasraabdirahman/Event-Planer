import * as React from 'react'
import Cookies from 'js-cookie';
import { ThemeContext } from '../components/context';


export function ThemeProvider({children, }:{children: React.ReactNode;}){

  const [theme, setThemeState] = React.useState<string>(
    () => Cookies.get('theme') ?? 'Classic'
  );

  function setTheme(theme:string ){
    setThemeState(theme);

    if(theme){
      Cookies.set('theme', theme, {expires: 7}) ;
    } else {
      Cookies.remove('theme');
    }
  }
  return (
    <ThemeContext value={{theme, setTheme}}>
      {children}
    </ThemeContext>
  )
}