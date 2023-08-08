import { useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ActivateUserValidationSchema } from "../../../store/slices/employee/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../../Form.scss"
import { activateEmployee } from "../../../store/slices/employee/slices";

const initialValuesActivateAccount = {
    username:"",
    phone: "",
    dob: "",
    password: "",
    confirmPass: "",
}

function ActivateAccountPage () {

    const usernameRef = useRef()
    const phoneRef = useRef()
    const dobRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()

    const [confirmation, setConfirmation] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const eye = <FontAwesomeIcon icon={faEye} />;
    const eye_slash = <FontAwesomeIcon icon={faEyeSlash} />;
    const [passwordShown, setPasswordShown] = useState({value : false, field_name : ""});
    const [confirmPassShown, setConfirmPassShown] = useState({value : false, field_name : ""});

    const { isActivateAccountLoading } = useSelector(state => {
        return {
            isActivateAccountLoading : state.auth.isActivateAccountLoading,
        }
    })

    const onButtonActivate = () => {
        dispatch(
            activateEmployee({
                username : usernameRef.current.value,
                phone : phoneRef.current.value,
                dob: dobRef.current.value,
                password: passwordRef.current.value,
                confirmPass: confirmPassRef.current.value
            })
        )
        setConfirmation(false)
    }

    return (
        <Formik
            initialValues={initialValuesActivateAccount}
            validationSchema={ActivateUserValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
                <div>
                    <div className="w-full fixed bg-slate-400 bg-opacity-100 pt-[250px] flex flex-col items-center right-0 z-40 overflow-x-hidden overflow-y-auto md:inset-0 h-full"></div>
                        <div className="ml-[-150px] container flex flex-col items-center justify-center z-50 ">
                            <div className="form card w-4/12 bg-white rounded shadow-xl py-4  z-50  ">
                                <Form id="form_activate">
                                    <h1>| Activate Your Account</h1>
                                    <button onClick={()=>{navigate("/login","replace")}}>Already Activate Your Account? login here</button>
                                    <div className="form-row pt-5">
                                        <label >Username</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            id="username"
                                            innerRef={usernameRef}
                                            className={errors.username && touched.username ? "input-error input input-md w-full " : "input input-bordered input-md w-full "}
                                        />
                                        <ErrorMessage name="username" component="span" className="error" />
                                    </div>

                                    <div className="form-row">
                                        <label >Phone</label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            innerRef={phoneRef}
                                            className={errors.phone && touched.phone ? "input-error input input-md w-full " : "input input-bordered input-md w-full "}
                                        />
                                        <ErrorMessage name="phone" component="span" className="error" />
                                    </div>
                                    
                                    <div className="form-row">
                                        <label >D.O.B (Date of Birth)</label>
                                        <Field
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            innerRef={dobRef}
                                            className={errors.dob && touched.dob ? "input-error input input-md w-full " : "input input-bordered input-md w-full "}
                                        />
                                        <ErrorMessage name="dob" component="span" className="error" />
                                    </div>

                                    <div className="form-row">
                                        <label>Password</label>
                                        <div className="form-row-pass">
                                            <Field
                                                type={passwordShown.value && passwordShown.field_name === "password" ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                innerRef={passwordRef}
                                                className={errors.password && touched.password ? "input-error input input-md w-full " : "input input-bordered input-md w-full "}
                                            />
                                            <i className="eye-password" 
                                                onClick={()=>{setPasswordShown({value : !passwordShown.value, field_name : "password"})}}>
                                                {passwordShown.value && passwordShown.field_name === "password" ? eye_slash : eye}
                                            </i>
                                        </div>
                                        <ErrorMessage name="password" component="span" className="error"/>
                                    </div>

                                    <div className="form-row">
                                        <label>Confirm Password</label>
                                        <div className="form-row-pass">
                                            <Field
                                                type={confirmPassShown.value && confirmPassShown.field_name === "password" ? "text" : "password"}
                                                name="confirmPass"
                                                id="confirmPass"
                                                innerRef={confirmPassRef}
                                                className={errors.confirmPass && touched.confirmPass ? "input-error input input-md w-full " : "input input-bordered input-md w-full "}
                                            />
                                            <i className="eye-password" 
                                                onClick={()=>{setConfirmPassShown({value : !confirmPassShown.value, field_name : "password"})}}>
                                                {confirmPassShown.value && confirmPassShown.field_name === "password" ? eye_slash : eye}
                                            </i>
                                        </div>
                                        <ErrorMessage name="confirmPass" component="span" className="error"/>
                                    </div>

                                    <button
                                        type="button"
                                        className={
                                            `inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                            ${(usernameRef.current?.value === "") || (phoneRef.current?.value === "") || (dobRef.current?.value === "") || (passwordRef.current?.value === "") || (confirmPassRef.current?.value === "")
                                                ? "cursor-not-allowed"
                                                : ""
                                            }
                                            `
                                        }
                                        disabled={(usernameRef.current?.value === "") || (phoneRef.current?.value === "") || (dobRef.current?.value === "") || (passwordRef.current?.value === "") || (confirmPassRef.current?.value === "")|| isSubmitting || isActivateAccountLoading}
                                        onClick={() =>{setConfirmation(true)}}
                                    >
                                        Activate
                                    </button>
                                    <div 
                                        id="popup-modal" 
                                        class={`fixed bg-slate-400 bg-opacity-50 pt-[150px] flex flex-col items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full 
                                            ${!confirmation ? "hidden" : ""}
                                        `}
                                    >
                                        <div class="relative text-center p-3 bg-white w-[20%] rounded-lg shadow dark:bg-gray-700">
                                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                            </svg>
                                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Are you sure the informations is already correct?
                                            </h3>
                                            <button 
                                                type="button" 
                                                class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onClick={onButtonActivate}
                                                >
                                                Yes, I'm sure
                                            </button>
                                            <button 
                                                type="button" 
                                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center "
                                                onClick={() =>{setConfirmation(false)}}
                                            >
                                                No
                                            </button>
                                        </div>  
                                    </div>
                                </Form>
                            </div>
                        </div>

                </div>
            );
        }}
        </Formik>
    )
}

export default ActivateAccountPage