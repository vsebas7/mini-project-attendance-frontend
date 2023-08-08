import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

export const employeeDetail = createAsyncThunk(
    "employee/detail",
     
    async (payload, { rejectWithValue }) => {
        try {
            const {employeeId} = payload

            const {data} = await api.get("employee/detail/"+ encodeURI(employeeId))

            Toast.success(data.message)

            return data.employee
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const employeeList = createAsyncThunk(
    "employee/list",
     
    async (payload, { rejectWithValue }) => {
        try {
            const {screening} = payload
            const PARAMETER = `?screening=${screening}`

            const {data} =await api.get("employee" + encodeURI(PARAMETER))

            Toast.success(data.message)

            return data.employee
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const shiftList = createAsyncThunk(
    "employee/shift-list",
     
    async (payload, { rejectWithValue }) => {
        try {

            const {data} = await api.get("employee/shift")

            Toast.success(data.message)

            return data.shift
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const registerEmployee = createAsyncThunk(
    "employee/register",
     
    async (payload, { rejectWithValue }) => {
        try {

            const {data} = await api.post("employee/register", payload)

            Toast.success(data.message)
            
            document.getElementById('form_regist').reset()

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const activateEmployee = createAsyncThunk(
    "employee/activate",
     
    async (payload, { rejectWithValue }) => {
        try {
            const token = window.location.pathname.toString().replace('/employee/active-account/',"")
            
            localStorage.setItem("token", token)

            const {data} = await api.patch("employee/activate", payload)

            Toast.success(data.message)

            document.getElementById('form_activate').reset()

            localStorage.removeItem("token")

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)