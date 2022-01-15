import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useLocation, Navigate } from "react-router-dom";

const Protected = (props) => {
    const { user } = useContext(AuthContext);
    let location = useLocation();

    if (!user.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{props.children}</>;
};

export default Protected;