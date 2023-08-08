import { createSlice } from "@reduxjs/toolkit";

import {
    employeeDetail,
    employeeList,
    shiftList,
    registerEmployee
} from "./slices"

const INITIAL_STATE = {
    list :[],
    currentPage:"",
    totalPage: "",
    detail: [],
    shiftList:[],
    isDetailLoading : false,
    isListLoading : false,
    isRegisterLoading : false
}

const employeeSlice = createSlice({
    name : "employee",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [employeeDetail.pending] : (state, action) => {
            state.isDetailLoading = true
        },
        [employeeDetail.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                detail : action.payload,
                isDetailLoading : false,
            })
        },
        [employeeDetail.rejected] : (state, action) => {
            state.isDetailLoading = false
        },
        [employeeList.pending] : (state, action) => {
            state.isListLoading = true
        },
        [employeeList.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                list : action.payload.data,
                currentPage : action.payload.currentPage,
                totalPage : action.payload.totalPage,
                isListLoading : false,
            })
        },
        [employeeList.rejected] : (state, action) => {
            state = Object.assign(state, {
                list : [],
                isListLoading : false,
            })
        },
        [shiftList.pending] : (state, action) => {
            state.isListLoading = true
        },
        [shiftList.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                shiftList : action.payload,
                isListLoading : false,
            })
        },
        [shiftList.rejected] : (state, action) => {
            state.isListLoading = false
        },
        [registerEmployee.pending] : (state, action) => {
            state.isRegisterLoading = true
        },
        [registerEmployee.fulfilled] : (state, action) => {
            state.isRegisterLoading = false
        },
        [registerEmployee.rejected] : (state, action) => {
            state.isRegisterLoading = false
        },
    }
})

export default employeeSlice.reducer