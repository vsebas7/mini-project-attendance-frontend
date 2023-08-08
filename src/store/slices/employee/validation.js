import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object({
    email : Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    salary : Yup.number()
        .required("Salary is required")
        .positive()
        .min(1)
})

export const ActivateUserValidationSchema = Yup.object({
    username : Yup.string()
        .required("Username is required")
        .min(6,"Username must contain 6 or more characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain 8 or more characters with at least one of each: uppercase, special character and number")
        .minUppercase(1, "Password must contain at least 1 upper case letter")
        .minSymbols(1, "Password must contain at least 1 special character")
        .minNumbers(1,"Password must contain at least 1 number"),
    confirmPass: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref('password'), null], 'Must match "Password" field value'),
    dob : Yup.date()
        .required("Employee D.O.B is required"),
    phone : Yup.string()
        .matches(/[0-9]/,"phone must be a number")
        .min(10,"phone must contain 10 or more digits")
        .required("Phone number is required"),
})