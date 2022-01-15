import React, { useState, useEffect, useCallback } from 'react';
import { auth } from "./../api/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext({
    user: { isLoggedIn: false, emailVerified: false, email: "", uid: "", persistence: "" },
    isLoading: true,
    alerts: [],
    signOut: () => { },
    loadingHandler: () => { },
    addAlert: () => { },
    removeAlert: () => { },
    resetAlerts: () => { }
});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({ isLoggedIn: false, emailVerified: false, email: "", uid: "", persistence: "" });
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authStateUnsubscribe = onAuthStateChanged(
            auth,
            (FBuser) => {
                if (FBuser) {
                    setUser({ isLoggedIn: true, emailVerified: FBuser.emailVerified, email: FBuser.email, uid: FBuser.uid, persistence: FBuser.auth.persistenceManager.persistence.type });
                    setAlerts(() => [{ variant: "green", message: "Logged in: " + FBuser.email + " / " + FBuser.auth.persistenceManager.persistence.type }]);
                    if (!FBuser.emailVerified) setAlerts(alerts => [...alerts, { variant: "red", message: "Your e-mail is not verified." }]);
                }
                setIsLoading(false);
            },
            (error) => setAlerts(alerts => [...alerts, { variant: "red", message: error.message }]));
        return authStateUnsubscribe;
    }, []);

    const signOut = () => {
        setUser({ isLoggedIn: false, emailVerified: false, email: "", persistence: "" });
        setAlerts([]);
    }

    const addAlert = (alert) => {
        setAlerts(alerts => [...alerts, alert]);
    }

    const removeAlert = (alertToRemove) => {
        const newAlerts = alerts.filter((alert) => alert.message !== alertToRemove);
        setAlerts(newAlerts);
    }

    const resetAlerts = () => {
        setAlerts([]);
    }

    const loadingHandler = (value) => {
        setIsLoading(value);
    }

    const userHandler = (user) => {
        setUser(user);
    }

    return (
        <AuthContext.Provider value=
            {{
                user,
                isLoading,
                loadingHandler: useCallback((loading) => loadingHandler(loading), []),
                userHandler,
                signOut,
                alerts,
                addAlert: useCallback((alert) => addAlert(alert), []),
                removeAlert,
                resetAlerts
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;