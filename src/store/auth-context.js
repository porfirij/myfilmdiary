import React, { useState, useEffect, useCallback } from 'react';
import { auth } from "./../api/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext({
    isInit: true,
    isLoading: false,
    alert: {},
    loadingHandler: () => { },
    addAlert: () => { },
    removeAlert: () => { },
});

export const AuthContextProvider = ({ children }) => {
    const [isInit, setIsInit] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState({ isOn: false });

    useEffect(() => {
        const authStateUnsubscribe = onAuthStateChanged(
            auth,
            (FBuser) => {
                if (FBuser) {
                    if (!FBuser.emailVerified) modalHandler({ isOn: true, variant: "red", title: "Email verification required", message: "Your e-mail is not verified." });
                }
                setIsInit(false);
            },
            (error) => {
                modalHandler({ isOn: true, variant: "red", title: "Error", message: error.message });
                setIsInit(false);
            });
        return authStateUnsubscribe;
    }, []);

    const modalHandler = (modal) => {
        setModal(() => modal);
    }

    const loadingHandler = (value) => {
        setIsLoading(value);
    }

    return (
        <AuthContext.Provider value=
            {{
                isInit,
                isLoading,
                loadingHandler: useCallback((loading) => loadingHandler(loading), []),
                modal,
                modalHandler: useCallback((alert) => modalHandler(alert), []),
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;