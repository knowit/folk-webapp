import React, { useEffect, createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useFetchedData } from './hooks/service';
import { AuthContext, renewToken } from './authToken';

interface UserInfo {
  name?: string;
  email?: string;
  picture?: string;
}

const UserContext = createContext<UserInfo>({});

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
  const [cookies, setCookie] = useCookies([]);

  if(cookies.accessToken && cookies.refreshToken) {
    setInterval(async () => {
      const renewedAccessToken = await renewToken(cookies.accessToken, cookies.refreshToken);
      if(renewedAccessToken) setCookie('accessToken', renewedAccessToken.accessToken, {
        maxAge: renewedAccessToken.expiration
      });
    }, 600000);
  }

  return cookies.accessToken ? (
    <AuthContext.Provider value={cookies.accessToken}>
      <UserInfoProvider>{children}</UserInfoProvider>
    </AuthContext.Provider>
  ) : (
    <AuthRedirect />
  );
}
