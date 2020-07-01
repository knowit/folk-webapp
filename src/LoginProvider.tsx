import React, { useEffect, createContext, useContext } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom';

const AuthRedirect = () =>  {
    // TODO: config
    useEffect(() => window.location.replace(`https://g4usaty3db.execute-api.us-east-1.amazonaws.com/auth/login`), [])
    return null
}

const AuthContext = createContext<null | string>(null);
export const useAPIToken = () => useContext(AuthContext) 

const parseQueryString = (queryString : string) : Record<string, string> => {
    let query : Record<string, string> = {}
    queryString.substring(1).split('&').forEach(pair => {
        const [key, value] = pair.split('=')
        query[decodeURIComponent(key)] = decodeURIComponent(value)
    })
    return query
}

export default function LoginProvider({ children } : React.PropsWithChildren<React.ReactNode>) {
    const [ cookies, setCookie ] = useCookies()
    const location = useLocation()
    const query = parseQueryString(location.search)

    useEffect(
        () => {
            if (query.accessToken) {
                setCookie('accessToken', query.accessToken, { 
                    secure: true, 
                    sameSite: 'strict',
                     maxAge: query.expire_in ? parseInt(query.expire_in) : 3600 
                })
            }
        },
        [query, setCookie])

    const accessToken = cookies.accessToken || query.accessToken
    return accessToken
        ? (
            <AuthContext.Provider value={accessToken}>
                {children}
            </AuthContext.Provider>
        )
        : <AuthRedirect />
}
