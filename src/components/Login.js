import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { app } from "./../api/firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Alert from "./ui/Alert";

function Login() {
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const auth = getAuth(app);

    const loginHandler = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error.message);
            });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("Logged in.");
                // ...
            } else {

                console.log("Not logged in.");
                // User is signed out
                // ...
            }
        });

    }

    const emailChangeHandler = (event) => {
        setUserEmail(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setUserPassword(event.target.value);
    }

    return (
        <div className="w-full max-w-xs">
            {error && <Alert>Hiba!</Alert>}
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={emailChangeHandler} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={passwordChangeHandler} />
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={loginHandler}>
                        Sign In
                    </button>
                    <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Forgot Password?
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}

export default Login
