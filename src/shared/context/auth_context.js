import { createContext, useCallback, useState } from "react"

export const AuthContext = createContext({
    token: null,
    isLogedIn: false, 
    userId: null,
    username: null,
    login: ()=>{}, 
    logout: ()=>{},
    update: ()=>{} 
});

