import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPassword } from "../../../store/slices/auth/slices"
import {ResetPasswordValidationSchema} from "../../../store/slices/auth/validation.js"
import "../../../Form.scss"
import { useNavigate } from "react-router-dom";

function ResetPasswordPage () {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const passwordRef = useRef()

    const confirmpasswordRef = useRef()

    const eye = <FontAwesomeIcon icon={faEye} />;

    const eye_slash =<FontAwesomeIcon icon={faEyeSlash} />;

    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});
    const [confirmPassShown, setConfirmPassShown] = useState({value : false, field_name : ""});

    const onButtonResetPassword = () => {
        dispatch(resetPassword({
            password : passwordRef.current?.value,
            confirm : confirmpasswordRef.current?.value
        }))
    }

    return (
        <Formik
            initialValues={{ password: "", confirm:""}}
            validationSchema={ResetPasswordValidationSchema}
        >
        {({ errors, touched }) => {
            return (
            <div>
                <div className="w-full fixed bg-slate-400 bg-opacity-100 pt-[250px] flex flex-col items-center right-0 z-40 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"></div>
                <div className="ml-[-150px] container flex flex-col items-center justify-center z-50">
                <div className="form card w-4/12 bg-white rounded shadow-xl py-4 z-50">
                        <Form>
                        <h1>| Reset Password</h1>
                        <button onClick={()=>{navigate("/login","replace")}}>Already Reset Password? login here</button>
                        <div className="form-row pt-5">
                            <label htmlFor="password">New Password</label>
                            <div className="form-row-pass">
                            <Field
                                type={passwordShown.value && passwordShown.field_name === "password" ? "text" : "password"}
                                name="password"
                                id="password"
                                innerRef={passwordRef}
                                className={
                                errors.password && touched.password ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                }
                            />
                            <i className="eye-password" 
                                onClick={()=>{
                                    setPasswordShown({value : !passwordShown.value, field_name : "password" })
                                }}
                            >
                                {passwordShown.value && passwordShown.field_name === "password" ? eye_slash : eye}
                            </i>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="error"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="form-row-pass">
                            <Field
                                type={confirmPassShown.value && confirmPassShown.field_name === "password" ? "text" : "password"}
                                name="confirm"
                                id="confirm"
                                innerRef={confirmpasswordRef}
                                className={
                                errors.confirm && touched.confirm ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                                }
                            />
                            <i className="eye-password" 
                                onClick={()=>{setConfirmPassShown({value : !confirmPassShown.value, field_name : "password"})}}
                            >
                                {confirmPassShown.value && confirmPassShown.field_name === "password" ? eye_slash : eye}
                            </i>
                            </div>
                            <ErrorMessage
                                name="confirm"
                                component="span"
                                className="error"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={onButtonResetPassword}
                            className={
                                `inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                ${
                                    (
                                        passwordRef.current?.value === ""||
                                        confirmpasswordRef.current?.value === ""
                                    )
                                    ? "cursor-not-allowed" 
                                    : ""
                                }
                                `
                            } 
                            disabled = { (passwordRef.current?.value === "")|| (confirmpasswordRef.current?.value === "")}
                        >
                            Reset Password
                        </button>
                        </Form>
                    </div>
                </div>
            </div>
            );
        }}
        </Formik>
    )
}

export default ResetPasswordPage