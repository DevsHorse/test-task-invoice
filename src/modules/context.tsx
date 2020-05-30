import { getAuthCookie } from './cookie/cookie';
import React from 'react';

type Cookie = {
  isAuthenticated: boolean;
  accessToken: string;
  userId: string;
};

export type AuthData = {
  isAuthenticated: boolean;
  userId: string;
  accessToken: string;
};

export interface IContext {
  authData: AuthData;
  handleState: (userData: AuthData) => void;
}

const cookie: Cookie = ((): Cookie => {
  const unAuthenticated: Cookie = {
    isAuthenticated: false,
    accessToken: '',
    userId: '',
  };

  const cookieResponse: any = getAuthCookie();

  if (!Object.keys(cookieResponse).length) return unAuthenticated;
  else return cookieResponse;
})();

export const authDataFromCookie: AuthData = {
  isAuthenticated: cookie.isAuthenticated,
  userId: cookie.userId,
  accessToken: cookie.accessToken,
};

const AuthContext = React.createContext<IContext>({
  authData: authDataFromCookie,
  handleState: (userData: AuthData) => void {},
});

export default AuthContext;
