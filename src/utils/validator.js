// import RNFS from 'react-native-fs';

const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
const submitValidator = (email, setState) => {
    if (!email) {
        setState({
            emailErr: "Email is required",
        })
        return false;
    }

    if (!validateEmail(email)) {
        setState({
            emailErr: "Invalid email format",
        })
        return false; // Validation failed
    }
    setState({
        emailErr: "",
    })
    return true;
};
const validateBase64 = (base64String) => {
    return base64String && base64String.startsWith('data:image/');
};
const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
};
const checkPasswordStrength = (password) => {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (!lengthValid) {
        errors.push('Password should be at least 8 characters long.');
    }
    if (!uppercaseValid) {
        errors.push('Password should include at least one uppercase letter.');
    }
    if (!lowercaseValid) {
        errors.push('Password should include at least one lowercase letter.');
    }
    if (!numberValid) {
        errors.push('Password should include at least one number.');
    }
    if (!specialValid) {
        errors.push('Password should include at least one special character.');
    }

    if (errors.length === 0) {
        return 'Strong';
    }
    return errors;
};

const validateRegisterData = (data) => {
    const errors = [];
    if (!data.FullName) errors.push({ field: 'FullName', message: 'Full Name is required.' });
    if (!data.FirstName) errors.push({ field: 'firstName', message: 'First Name is required.' });
    if (!data.LastName) errors.push({ field: 'lastName', message: 'Last Name is required.' });
    if (!data.EmailId) errors.push({ field: 'email', message: 'Email is required.' });
    if (!data.MobileNumber) errors.push({ field: 'phoneNumber', message: 'Mobile Number is required.' });
    if (!data.Password) {
        errors.push({ field: 'password', message: 'Password is required.' });
    } else {
        if (!/[a-z]/.test(data.Password)) {
            errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' });
        }
        if (!/[A-Z]/.test(data.Password)) {
            errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.Password)) {
            errors.push({ field: 'password', message: 'Password must contain at least one special character' });
        }
        if (!/\d/.test(data.Password)) {
            errors.push({ field: 'password', message: 'Password must contain at least one number' });
        }
        if (data.Password.length < 8) {
            errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
        }
    }


    return errors;
};

const handleErrors = (errors, setState) => {
    const errorState = errors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
    }, {});

    setState({

        validationErrors: errorState,
    })
};


// const handleErrors = (errors, setState) => {
//     setState({
//       
//         loading: false,
//         valationErrors: errors
//     }));
//     console.log("Validation Errors:", errors); // or use another logging mechanism
// };

const getErrorMessage = (field) => {
    const error = state.validationErrors.find(error => error.field === field);
    return error ? error.message : '';
};

const base64ToFile = async (base64, fileName, contentType) => {
    try {
        const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.writeFile(filePath, base64, 'base64');
        return filePath;
    } catch (error) {
        console.error("Error writing base64 to file:", error);
        throw new Error("Failed to convert base64 to file");
    }
};


export { validateRegisterData, submitValidator, handleErrors, getErrorMessage, checkPasswordStrength };
