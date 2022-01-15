import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function Sendpasswordreset() {
    const { resetAlerts, loadingHandler, addAlert } = useContext(AuthContext);
    const { value: emailValue, hasError: emailError, isValid: emailIsValid, valueHandler: emailValueHandler, blurHandler: emailBlurHandler } = useInput("email");

    const formIsValid = emailIsValid;

    const resetEmailHandler = async (event) => {
        event.preventDefault();
        resetAlerts();
        if (formIsValid) {
            loadingHandler(true);
            try {
                await sendPasswordResetEmail(auth, emailValue, { url: "http://localhost:3000/resetpassword" });
                addAlert({ variant: "green", message: "Password Reset Email Has Been Sent" });
                //navigate("/addnewfilm");
            } catch (error) {
                addAlert({ variant: "red", message: error.message });
            }
            loadingHandler(false);
        }
    }

    return (
        <div className="w-80">
            <form className="bg-yellow-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={resetEmailHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        E-mail
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (emailError ? 'bg-red-200' : '')} id="username" type="text" placeholder="E-mail" value={emailValue} onChange={emailValueHandler} onBlur={emailBlurHandler} />
                </div>
                <div className="flex-col items-center justify-center mt-5 text-center">
                    <div className="text-center"><button className={(formIsValid) ? "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "inline-block bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="button" onClick={resetEmailHandler} disabled={!formIsValid}>
                        Send password reset email
                    </button>
                    </div>
                    <Link to="/resetpassword" className="mt-6 inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                        Reset password
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Sendpasswordreset;
