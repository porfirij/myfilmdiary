import { useState } from 'react';
import checkInput from '../misc/check-input';

function useInput(type) {

    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const valueHandler = (event) => {
        setValue(event.target.value);
        setTouched(true);
    }

    const resetHandler = () => {
        setValue("");
        setTouched(false);
    }

    const blurHandler = () => {
        setTouched(true);
    }

    const isValid = checkInput(type, value);
    const hasError = touched && !isValid;


    return { value, isValid, hasError, valueHandler, blurHandler, resetHandler };

}

export default useInput;
