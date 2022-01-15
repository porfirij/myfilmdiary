import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "./../../store/auth-context";
import { auth } from "./../../api/firebase";
import { signOut } from "firebase/auth";

function Navigation() {
    const ctx = useContext(AuthContext);

    const logOut = async () => {
        try {
            await signOut(auth);
            ctx.signOut();
        } catch (error) {
            ctx.addAlert({ variant: "red", message: error.message });
            console.error(error.message);
        }
    }

    return (
        <div className="w-3/5 px-4">
            <ul className="flex flex-row justify-between pl-0 list-style-none mr-auto text-white uppercase text-center">
                <li className="nav-item p-2">
                    <Link to="/" className="nav-link hover:text-gray-300">My Film Diary</Link>
                </li>
                <li className="nav-item p-2">
                    <Link to="/myfilms" className="nav-link hover:text-gray-300">My Films</Link>
                </li>
                <li className="nav-item p-2">
                    <Link to="/addnewfilm" className="nav-link hover:text-gray-300">Add New Film</Link>
                </li>
                {!ctx.user.isLoggedIn &&
                    <li className="nav-item p-2">
                        <Link to="/login" className="nav-link hover:text-gray-300">Log In</Link>
                    </li>}
                {!ctx.user.isLoggedIn &&
                    <li className="nav-item p-2">
                        <Link to="/signup" className="nav-link hover:text-gray-300">Sign Up</Link>
                    </li>}
                {ctx.user.isLoggedIn && <li className="nav-item p-2">
                    <button className="nav-link hover:text-gray-300" onClick={logOut}>Log Out</button>
                </li>}
            </ul>
        </div>
    )
}

export default Navigation;
