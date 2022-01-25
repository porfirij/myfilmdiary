import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { auth } from "./../../api/firebase";

const Protected = (props) => {

    let location = useLocation();

    if (!auth.currentUser) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // if (!user.emailVerified) {
    //     return <Navigate to="/sendemailverification" state={{ from: location }} />;
    // }

    return <>{props.children}</>;
};

export default Protected;