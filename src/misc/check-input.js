const checkInput = (type, value) => {
    switch (type) {
        case "email":
            let re = /\S+@\S+\.\S+/;
            return re.test(value);
        case "password":
            return value.length > 5;
        case "verificationCode":
            return value.length > 10;
        case "date":
            const watchedDate = new Date(value);
            const currentDate = Date.now();
            if (isNaN(watchedDate) || currentDate < watchedDate) { return false; } else { return true; }
        default:
            return value.length > 5;
    }
}

export default checkInput;