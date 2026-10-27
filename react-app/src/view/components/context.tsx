import * as React from 'react' ;

export const AuthContext = React.createContext<{
  loggedInUserId: string | null,
  setLoggedInUserId: (loggedInUserId:string | null) => void,
}> ({
  loggedInUserId: null, 
  setLoggedInUserId: function() {},
})

export const ThemeContext = React.createContext<{
  theme: string,
  setTheme: (theme:string) => void,
}>({
  theme: 'Classic',
  setTheme: function() {},
})