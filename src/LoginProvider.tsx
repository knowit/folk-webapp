import React, { useEffect, createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'

const AuthRedirect = () =>  {
    useEffect(() => window.location.replace('/auth/login'), [])
    return null
}

const AuthContext = createContext<null | string>(null);
export const useAPIToken = () => useContext(AuthContext) 


export default function LoginProvider({ children } : React.PropsWithChildren<React.ReactNode>) {
    const [ cookies ] = useCookies()

    return cookies.accessToken
        ? (
            <AuthContext.Provider value={cookies.accessToken}>
                {children}
            </AuthContext.Provider>
        )
        : <AuthRedirect />
}
