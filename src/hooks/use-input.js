import { useState, useMemo, useCallback, useRef } from 'react';
import checkInput from '../misc/check-input';
import debounce from 'lodash.debounce';

function useInput(type) {

    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;
    console.log("Useinput rendered: " + renderCount.current);

    const valueHandler = useCallback((event) => {
        setValue(event.target.value);
        setTouched(true);
    }, []);

    const debouncedValueHandler = useMemo(() => {
        return debounce(valueHandler, 800);
    }, [valueHandler]);

    const blurHandler = () => {
        setTouched(true);
    }

    const isValid = checkInput(type, value);
    const hasError = touched && !isValid;


    return { value, isValid, hasError, valueHandler: debouncedValueHandler, blurHandler };

}

export default useInput;
