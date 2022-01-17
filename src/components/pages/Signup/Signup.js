import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { setPersistence, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
    const { resetAlerts, loadingHandler, addAlert } = useContext(AuthContext);
    const { value: emailValue, hasError: emailError, isValid: emailIsValid, valueHandler: emailValueHandler, blurHandler: emailBlurHandler } = useInput("email");
    const { value: passwordValue, hasError: passwordError, isValid: passwordIsValid, valueHandler: passwordValueHandler, blurHandler: passwordBlurHandler } = useInput("password");
    const [rememberValue, setRememberValue] = useState(false);

    const navigate = useNavigate();

    const formIsValid = emailIsValid && passwordIsValid;

    const signUpHandler = async (event) => {
        event.preventDefault();
        resetAlerts();
        if (formIsValid) {
            loadingHandler(true);
            try {
                await setPersistence(auth, (rememberValue) ? browserLocalPersistence : browserSessionPersistence);
                await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
                navigate("/addnewfilm");
            } catch (error) {
                addAlert({ variant: "red", message: error.message });
            }
            loadingHandler(false);
        }
    }

    return (
        <div className="w-80">
            <form className="bg-violet-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={signUpHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        E-mail
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (emailError ? 'bg-red-200' : '')} id="username" type="text" placeholder="E-mail" onChange={emailValueHandler} onBlur={emailBlurHandler} />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (passwordError ? 'bg-red-200' : '')} id="password" type="password" placeholder="****************" onChange={passwordValueHandler} onBlur={passwordBlurHandler} />
                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div className="mb-4 form-check">
                    <input className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" onChange={() => setRememberValue((prevState) => !prevState)} />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <button className={(formIsValid) ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="button" onClick={signUpHandler} disabled={!formIsValid}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
