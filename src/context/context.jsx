import { createContext } from 'react';
import { api } from '../http';
import { useContext } from 'react';

const AuthContext = createContext({});

const getLoggedUser = async () => {
    let user;

    const userId = window.localStorage.getItem('userIdentifier');
    await api.get(`user/${userId}`)
        .then((response) => {
            user = response.data;
        });

    return user;
}

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ signed: true, getLoggedUser }}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };