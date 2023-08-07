import { createSlice } from "@reduxjs/toolkit";

import {
    clockIn,
    clockOut,
    attendanceList,
} from "./slices"

const INITIAL_STATE = {
    list : [],
    history :[],
    currentPage:"",
    totalPage: "",
    isClockInLoading : false,
    isClockOutLoading : false,
    isGetHistoryLoading : false,
}

const attendanceSlice = createSlice({
    name : "attendance",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [clockIn.pending] : (state, action) => {
            state.isClockInLoading = true
        },
        [clockIn.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : [action.payload.attendance],
                isClockInLoading : false,
            })
        },
        [clockIn.rejected] : (state, action) => {
            state.isClockInLoading = true
        },
        [clockOut.pending] : (state, action) => {
            state.isClockOutLoading = true
        },
        [clockOut.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : [action.payload.attendance],
                isClockOutLoading : false,
            })
        },
        [clockOut.rejected] : (state, action) => {
            state.isClockOutLoading = true
        },
        [attendanceList.pending] : (state, action) => {
            state.isGetHistoryLoading = false
        },
        [attendanceList.fulfilled] : (state, action) => {
            if(action.payload.history.length==1 && window.location.pathname=="/attendance"){
                state.list = action.payload.history
            }

            if(action.payload.history.length>1 || window.location.pathname=="/payroll"){
                state.history = action.payload.history
            }

            state = Object.assign(state, {
                currentPage : action.payload.currentPage,
                totalPage : action.payload.totalPage,
                isGetHistoryLoading : false,
            })
        },
        [attendanceList.rejected] : (state, action) => {
            state = Object.assign(state, {
                list : [],
                history : [],
                isGetHistoryLoading : true,
            })
        },
    }
})

export default attendanceSlice.reducer