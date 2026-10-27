import * as React from 'react'
import Cookies from 'js-cookie';

export const ThemeContext = React.createContext<{
  theme: string,
  setTheme: (theme:string) => void,
}>({
  theme: 'Classic',
  setTheme: function() {},
})

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