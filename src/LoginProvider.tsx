import React, { useEffect, createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useFetchedData } from './hooks/service';

interface UserInfo {
  name?: string;
  email?: string;
  picture?: string;
}

const AuthContext = createContext<null | string>(null);
const UserContext = createContext<UserInfo>({});

export const useAPIToken = () => useContext(AuthContext);
export const useUserInfo = () => useContext(UserContext);

const AuthRedirect = () => {
  useEffect(() => window.location.replace('/auth/login'), []);
  return null;
};

const UserInfoProvider = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const [userInfo, pending, error] = useFetchedData<UserInfo>({
    url: '/auth/userInfo',
  });

  const value = pending || error ? {} : userInfo || {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default function LoginProvider({
  children,
}: React.PropsWithChildren<React.ReactNode>) {
  const [cookies] = useCookies();

  return cookies.accessToken ? (
    <AuthContext.Provider value={cookies.accessToken}>
      <UserInfoProvider>{children}</UserInfoProvider>
    </AuthContext.Provider>
  ) : (
    <AuthRedirect />
  );
}
