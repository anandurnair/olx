import React ,{createContext, useState} from 'react'
export const FirebaseContext = React.createContext(null)
export const AuthContext = React.createContext(null)


export default function Context ({children}){
    const [user,setuser] = useState(null)
    return (
        <AuthContext.Provider value={{user,setuser}}>
            {children}
        </AuthContext.Provider>
    )
}