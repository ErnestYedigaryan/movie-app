import React, {useEffect, useState} from "react";
import firebaseConfig from "./fire";

export const AuthContext = React.createContext();
 
export const AuthProvider =({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged(setCurrentUser);
    }, []);
    return(
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
     ) ;

    } ;
 