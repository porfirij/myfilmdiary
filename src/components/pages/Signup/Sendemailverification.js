import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { sendEmailVerification } from "firebase/auth";

function Sendemailverification() {
    const { loadingHandler, modalHandler } = useContext(AuthContext);
    const { hasError: emailError, isValid: emailIsValid, valueHandler: emailValueHandler, blurHandler: emailBlurHandler } = useInput("email");

    const formIsValid = emailIsValid;

    const sendEmailVerificationHandler = async (event) => {
        event.preventDefault();
        modalHandler({ isOn: false });
        if (formIsValid) {
            loadingHandler(true);
            try {
                await sendEmailVerification(auth.currentUser);
                modalHandler({ isOn: true, variant: "green", message: "Email Verification Request Has Been Sent" });
                //navigate("/addnewfilm");
            } catch (error) {
                modalHandler({ isOn: true, variant: "red", message: error.message });
            }
            loadingHandler(false);
        }
    }

    return (
        <div className="w-80">
            <form className="bg-yellow-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={sendEmailVerificationHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        E-mail
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (emailError ? 'bg-red-200' : '')} id="username" type="text" placeholder="E-mail" onChange={emailValueHandler} onBlur={emailBlurHandler} />
                </div>
                <div className="flex-col items-center justify-center mt-5 text-center">
                    <div className="text-center"><button className={(formIsValid) ? "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "inline-block bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="button" onClick={sendEmailVerificationHandler} disabled={!formIsValid}>
                        Send email verification request
                    </button>
                    </div>
                    <Link to="/signup" className="mt-6 inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                        Not Signed Up yet?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Sendemailverification;
