import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { confirmPasswordReset } from "firebase/auth";
const query = new URLSearchParams(window.location.search);
const oobCode = query.get("oobCode");

function Resetpassword() {
    const { resetAlerts, loadingHandler, addAlert } = useContext(AuthContext);
    const { value: passwordValue, hasError: passwordError, isValid: passwordIsValid, valueHandler: passwordValueHandler, blurHandler: passwordBlurHandler } = useInput("password");
    const { value: codeValue, hasError: codeError, valueHandler: codeValueHandler, blurHandler: codeBlurHandler } = useInput("verificationcode");
    const navigate = useNavigate();

    let codeContent = <div className="mb-2">Verification code: {oobCode}</div>;

    if (!oobCode)
        codeContent = <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Paste your verification code here
            </label>
            <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (codeError ? 'bg-red-200' : '')} id="password" type="text" placeholder="****************" onChange={codeValueHandler} value={codeValue} onBlur={codeBlurHandler} />
        </div>;

    const formIsValid = passwordIsValid;

    const resetPasswordHandler = async (event) => {
        event.preventDefault();
        resetAlerts();
        if (formIsValid) {
            loadingHandler(true);
            const code = oobCode || codeValue;
            try {
                await confirmPasswordReset(auth, code, passwordValue);
                addAlert({ variant: "green", message: "Password changed." });
                navigate("/login");
            } catch (error) {
                addAlert({ variant: "red", message: error.message });
            }
            loadingHandler(false);
        }
    }

    return (
        <div className="w-80">
            <form className="bg-green-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={resetPasswordHandler}>
                {codeContent}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        New Password
                    </label>
                    <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (passwordError ? 'bg-red-200' : '')} id="password" type="password" placeholder="****************" onChange={passwordValueHandler} value={passwordValue} onBlur={passwordBlurHandler} />
                </div>

                <div className="flex items-center justify-between mt-5">
                    <button className={(formIsValid) ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="button" onClick={resetPasswordHandler} disabled={!formIsValid}>
                        Reset password
                    </button>
                    <Link to="/sendpasswordreset" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                        Resend e-mail
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Resetpassword;
