import { createContext, useContext } from 'react';

export const AuthContext = createContext<null | string>(null);
export const useAPIToken = () => useContext(AuthContext);
