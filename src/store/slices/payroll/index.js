import { createSlice } from "@reduxjs/toolkit";

import {
    payroll,
    deduction
} from "./slices"

const INITIAL_STATE = {
    list : [],
    deduction : [],
    isGetPayrollLoading : false,
    isGetDeductionLoading : false,
}

const attendanceSlice = createSlice({
    name : "attendance",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [payroll.pending] : (state, action) => {
            state.isGetPayrollLoading = true
        },
        [payroll.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload,
                isGetPayrollLoading : false,
            })
        },
        [payroll.rejected] : (state, action) => {
            state.isGetPayrollLoading = true
        },
        [deduction.pending] : (state, action) => {
            state.isGetDeductionLoading = true
        },
        [deduction.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                deduction : action.payload,
                isGetDeductionLoading : false,
            })
        },
        [deduction.rejected] : (state, action) => {
            state = Object.assign(state, {
                deduction : 0,
                isGetDeductionLoading : false,
            })
        },
    }
})

export default attendanceSlice.reducer