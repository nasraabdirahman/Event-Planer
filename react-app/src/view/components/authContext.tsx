import * as React from 'react'

export const AuthContext = React.createContext<{
  loggedInUserId: number | null,
  setLoggedInUserId: (loggedInUserId:number | null) => void,
}> ({
  loggedInUserId: null, 
  setLoggedInUserId: function() {},
})