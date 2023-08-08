import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerEmployee, shiftList } from "../../../store/slices/employee/slices";
import { RenderShiftList } from "../../../components/employee/shift";
import { RegisterValidationSchema } from "../../../store/slices/employee/validation";
import "../../../Form.scss"

const initialValuesRegister = {
    email:"",
    gender: "",
    shift: "",
    salary: "",
}

function RegisterEmployeePage () {

    const emailRef = useRef()
    const salaryRef = useRef()
    const [gender,setGender] = useState("male")
    const [shift,setShift] = useState("1")

    const [confirmation, setConfirmation] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isRegisterLoading, listShift } = useSelector(state => {
        return {
            isRegisterLoading : state.auth.isRegisterLoading,
            listShift : state.employee.shiftList
        }
    })
    
    const handleOnChangeGender = (event) => {
        setGender(event.target.selectedOptions[0].className)
    }

    const handleChangeshift = (event) => {
        setShift(event.target.selectedOptions[0].className)
    }

    const onButtonRegister = () => {
        dispatch(
            registerEmployee({
                email : emailRef.current.value,
                roleId : 2,
                gender:gender,
                shiftHourId:shift,
                status : 0,
                salary: salaryRef.current.value
            })
        )
        setConfirmation(false)
    }
    useEffect(()=>{
        dispatch(
            shiftList()
        )
    },[])

    return (
        <Formik
            initialValues={initialValuesRegister}
            validationSchema={RegisterValidationSchema}
        >
        {({ errors, touched, isSubmitting }) => {
            return (
            <div className="container flex flex-col items-center justify-center">
                <div className="form card w-4/12 bg-base-100 shadow-xl py-4 ">
                    <Form id="form_regist">
                    <h1>| Register a New Employee</h1>
                    <div className="form-row pt-5">
                        <label >Email</label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            innerRef={emailRef}
                            className={
                                errors.email && touched.email ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label >Salary</label>
                        <Field
                            type="number"
                            name="salary"
                            id="salary"
                            innerRef={salaryRef}
                            className={
                                errors.salary && touched.salary ? "input-error input input-md w-full " : "input input-bordered input-md w-full "
                            }
                        />
                        <ErrorMessage name="salary" component="span" className="error" />
                    </div>

                    <div className="form-row">
                        <label >Gender</label>
                        <select 
                            onChange={handleOnChangeGender}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        <option selected value="male">Male</option>
                        <option  value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label >Shift Start</label>                
                        <select 
                            value={shift?.name} 
                            onChange={handleChangeshift}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                        <RenderShiftList list={listShift}/>
                        </select>
                    </div>

                    <button
                        type="button"
                        className={
                            `inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            ${(emailRef.current?.value === "") || (salaryRef.current?.value === "")
                                ? "cursor-not-allowed"
                                : ""
                            }
                            `
                        }
                        disabled={(emailRef.current?.value === "") || (salaryRef.current?.value === "")|| isSubmitting || isRegisterLoading}
                        onClick={() =>{setConfirmation(true)}}
                    >
                        Register
                    </button>
                    <div 
                        id="popup-modal" 
                        class={`
                            fixed bg-slate-400 bg-opacity-50 pt-[150px] flex flex-col items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full 
                            ${!confirmation ? "hidden" : ""}
                        `}
                    >
                        <div class="relative text-center p-3 bg-white w-[20%] rounded-lg shadow dark:bg-gray-700">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure employee's data already correct?
                            </h3>
                            <button 
                                type="button" 
                                class="text-sm font-medium px-5 py-2.5 mr-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={onButtonRegister}
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
            );
        }}
        </Formik>
    )
}

export default RegisterEmployeePage