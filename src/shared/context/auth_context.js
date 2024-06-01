// src/shared/context/auth_context.js
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext({
    token: null,
    isLogedIn: false,
    userId: null,
    username: null,
    firstname: null,
    lastname: null,
    profilePicture: null,  // Add profilePicture here
    login: () => {},
    logout: () => {},
    update: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] =useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const login = useCallback((uid, token, username, firstname, lastname, profilePicture) => {
        setToken(token);
        setUserId(uid);
        setUsername(username);
        setFirstName(firstname);
        setLastName(lastname);

        setProfilePicture(profilePicture);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUsername(null);
        setFirstName(null);
        setLastName(null);
        setProfilePicture(null);
    }, []);

    const update = (data) => {
        if (data.username) setUsername(data.username);
        if(data.firstname) setFirstName(data.firstname);
        if(data.lastname) setLastName(data.lastname);
        if (data.profilePicture) setProfilePicture(data.profilePicture);
    };

    return (
        <AuthContext.Provider 
            value={{ token, isLogedIn: !!token, userId, username, firstname, lastname, profilePicture, login, logout, update }}
        >
            {children}
        </AuthContext.Provider>
    );
};
