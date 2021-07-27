import React,{useEffect, useState} from 'react';


const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: () => {

    },
    logout: () => {

    }
})

export const AuthContextProvider = (props) =>{
    let initialToken;
    if(typeof window !== 'undefined'){
        initialToken = window.localStorage.getItem('token');
    }

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        if(typeof window !== 'undefined'){
            window.localStorage.setItem('token',token);
        }
    }

    const logoutHandler = () => {
        setToken(null);
        if(typeof window !== 'undefined'){
            window.localStorage.removeItem('token');
        }
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext;