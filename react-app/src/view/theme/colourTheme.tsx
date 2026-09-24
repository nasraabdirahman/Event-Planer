import * as React from 'react'

export const ThemeContext = React.createContext<{
  theme: string,
  setTheme: (theme:string) => void,
}>({
  theme: 'Classic',
  setTheme: function() {},
})