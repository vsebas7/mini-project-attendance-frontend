import { createSlice } from "@reduxjs/toolkit";

import {
    login,
    logout,
    keepLogin,
    forgotPassword,
    resetPassword,
} from "./slices"

const INITIAL_STATE = {
    id : "",
    email : "",
    role: "",
    shift: "",
    isLoginLoading : false,
    isLogoutLoading : false,
    isKeepLoginLoading : false,
    isForgotPasswordLoading : false,
    isResetPasswordLoading : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState : INITIAL_STATE,
    reducers : {

    },
    extraReducers : {
        [login.pending] : (state, action) => {
            state.isLoginLoading = true
        },
        [login.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                id : action.payload?.user?.id,
                username : action.payload?.user?.username,
                email : action.payload?.user?.email,
                role : action.payload?.user?.roleId,
                shift : action.payload?.user?.shiftHourId,
                isLoginLoading : false,
            })
        },
        [login.rejected] : (state, action) => {
            state.isLoginLoading = false
        },
        [logout.pending] : (state, action) => {
            state.isLogoutLoading = true
        },
        [logout.fulfilled] : (state, action) => {
            state = Object.assign(state, INITIAL_STATE)         
        },
        [logout.rejected] : (state, action) => {
            state.isLogoutLoading = false
        }, 
        [keepLogin.pending] : (state, action) => {
            state.isKeepLoginLoading = true
        },
        [keepLogin.fulfilled] : (state, action)=> {
            state = Object.assign(state, {
                id : action.payload?.user?.id,
                username : action.payload?.user?.username,
                email : action.payload?.user?.email,
                role : action.payload?.user?.roleId,
                shift : action.payload?.user?.shiftHourId,
                isKeepLoginLoading : false,
            })
        },
        [keepLogin.rejected] : (state, action) => {
            state.isKeepLoginLoading = false
        }, 
        [forgotPassword.pending] : (state, action) => {
            state.isForgotPasswordLoading = true
        },
        [forgotPassword.fulfilled] : (state, action)=> {
            state.isForgotPasswordLoading = false
        },
        [forgotPassword.rejected] : (state, action) => {
            state.isForgotPasswordLoading = false
        }, 
        [resetPassword.pending] : (state, action) => {
            state.isResetPasswordLoading = true
        },
        [resetPassword.fulfilled] : (state, action)=> {
            state.isResetPasswordLoading = false
        },
        [resetPassword.rejected] : (state, action) => {
            state.isResetPasswordLoading = false
        }
    }
})

export default authSlice.reducer