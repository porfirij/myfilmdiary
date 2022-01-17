import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import useInput from "../../../hooks/use-input";
import { auth } from "../../../api/firebase";
import { applyActionCode } from "firebase/auth";
const query = new URLSearchParams(window.location.search);
const oobCode = query.get("oobCode");

function Verifyemail() {
    const { resetAlerts, loadingHandler, addAlert } = useContext(AuthContext);
    const { value: codeValue, hasError: codeError, valueHandler: codeValueHandler, blurHandler: codeBlurHandler } = useInput("verificationcode");
    const navigate = useNavigate();

    // let codeContent = <div className="mb-2">Verification code: {oobCode}</div>;
    let codeContent = "";

    if (!oobCode)
        codeContent = <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Paste your verification code here
            </label>
            <input className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " + (codeError ? 'bg-red-200' : '')} id="password" type="text" placeholder="****************" onChange={codeValueHandler} value={codeValue} onBlur={codeBlurHandler} />
        </div>;

    const verifyEmailHandler = async (event) => {
        event.preventDefault();
        resetAlerts();
        if (formIsValid) {
            loadingHandler(true);
            const code = oobCode || codeValue;
            try {
                await applyActionCode(auth, code);
                addAlert({ variant: "green", message: "Email verified." });
                navigate("/login");
            } catch (error) {
                addAlert({ variant: "red", message: error.message });
            }
            loadingHandler(false);
        }
    }

    return (
        <div className="w-80">
            <form className="bg-green-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={verifyEmailHandler}>
                {codeContent}

                <div className="flex items-center justify-between mt-5">
                    <div className="text-center"><button className={(formIsValid) ? "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" : "inline-block bg-blue-300 text-white font-bold py-2 px-4 rounded"} type="submit" disabled={!formIsValid}>
                        Verify email
                    </button>
                    </div>
                    <Link to="/sendemailverification" className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
                        Resend e-mail verification code
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Verifyemail;
