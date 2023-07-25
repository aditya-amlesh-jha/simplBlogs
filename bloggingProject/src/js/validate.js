export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

export const validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number and one special character:
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
};

export const validateName = (name)  => {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name);
}

export const validatePasswordConfirm = (password, passwordConfirm) => {
    return password === passwordConfirm;
}


