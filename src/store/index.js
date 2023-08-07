import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import attendanceSlice from "./slices/attendance"
import payrollSlice from "./slices/payroll"

const store = configureStore({
    reducer : {
        auth : authReducer,
        attendance : attendanceSlice,
        payroll : payrollSlice,
    },
})

export default store