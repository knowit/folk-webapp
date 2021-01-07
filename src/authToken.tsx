import { createContext, useContext } from 'react';

export const AuthContext = createContext<null | string>(null);
export const useAPIToken = () => useContext(AuthContext);

export async function renewToken(accessToken: string, refreshToken: string) {

    async function getNewToken() {
        const url = '/auth/refresh';
        const opts: RequestInit = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({refreshToken: refreshToken})
        };
        
        const data = 
            await fetch(url, opts)
                .then((res) => 
                    res.ok ? res.json() : Promise.reject(new Error(res.statusText))
                ).catch((error) => 
                    console.error(error)
                );
        
        
        return data ? data.accessToken : null;
    }

    return await getNewToken();
}
