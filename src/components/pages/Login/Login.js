import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../../api/firebase";
// import { ref, onValue, query, limitToLast } from "firebase/database";

function Login() {
    const { loadingHandler, resetAlerts, addAlert } = useContext(AuthContext);
    const { value: emailValue, hasError: emailError, isValid: emailIsValid, valueHandler: emailValueHandler, blurHandler: emailBlurHandler } = useInput("email");
    const { value: passwordValue, hasError: passwordError, isValid: passwordIsValid, valueHandler: passwordValueHandler, blurHandler: passwordBlurHandler } = useInput("password");
    const [rememberValue, setRememberValue] = useState(false);

    const navigate = useNavigate();

    const formIsValid = emailIsValid && passwordIsValid;

    const loginHandler = async (event) => {
        event.preventDefault();
        resetAlerts();
        if (formIsValid) {
            loadingHandler(true);
            try {
                await setPersistence(auth, (rememberValue) ? browserLocalPersistence : browserSessionPersistence);
                await signInWithEmailAndPassword(auth, emailValue, passwordValue);
                navigate("/myfilms");
            } catch (error) {
                addAlert({ variant: "red", message: error.message });
                console.error(error.message);
            }
            loadingHandler(false);
        } else { console.log("form is not valid"); }
    }

    return (
        <div className="w-80">
            <form className="bg-blue-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        E-mail
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (emailError ? 'bg-red-200' : '')} id="username" type="text" placeholder="E-mail" value={emailValue} onChange={emailValueHandler} onBlur={emailBlurHandler} />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (passwordError ? 'bg-red-200' : '')} id="password" type="password" placeholder="****************" onChange={passwordValueHandler} value={passwordValue} onBlur={passwordBlurHandler} />
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="mb-4 form-check">
                    <input className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" onChange={() => setRememberValue((prevState) => !prevState)} />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <div className="flex items-center justify-between">
                    <button className={(formIsValid) ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="button" onClick={loginHandler} disabled={!formIsValid}>
                        Log In
                    </button>

                    {/* <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                            <circle className="fill-blue-600" cx="12" cy="12" r="10"></circle>
                            <path className="fill-blue-600 stroke-0" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> */}

                    <Link to="/sendpasswordreset" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
