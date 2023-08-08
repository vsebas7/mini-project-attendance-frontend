import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import attendanceSlice from "./slices/attendance"
import payrollSlice from "./slices/payroll"
import employeeSlice from "./slices/employee"

const store = configureStore({
    reducer : {
        auth : authReducer,
        attendance : attendanceSlice,
        payroll : payrollSlice,
        employee : employeeSlice,
    },
})

export default store