const checkInput = (type, value) => {
    switch (type) {
        case "email":
            let re = /\S+@\S+\.\S+/;
            return re.test(value);
        case "password":
            return value.length > 5;
        case "verificationCode":
            return value.length > 10;
        default:
            return value.length > 5;
    }
}

export default checkInput;