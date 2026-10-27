import * as React from 'react'
import Cookies from 'js-cookie';
import { AuthContext } from './context';

export function AuthProvider({children, }:{children: React.ReactNode;}){

  const [loggedInUserId, setLoggedInUserIdState] = React.useState<string | null>(
    () => Cookies.get('loggedInUserId') ?? null 
  );

  function setLoggedInUserId(loggedInUserId:string | null){
    setLoggedInUserIdState(loggedInUserId);

    if(loggedInUserId){
      Cookies.set('loggedInUserId', loggedInUserId, {expires: 7}) ;
    } else {
      Cookies.remove('loggedInUserId');
    }
  }
  return (
    <AuthContext value={{loggedInUserId, setLoggedInUserId}}>
      {children}
    </AuthContext>
  )
}