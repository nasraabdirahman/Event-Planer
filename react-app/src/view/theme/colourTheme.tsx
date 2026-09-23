import * as React from 'react'

export const ThemeContext = React.createContext({
  theme: 'classic',
  setTheme: (_theme: string) => {},
});