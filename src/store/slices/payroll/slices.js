import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

export const payroll = createAsyncThunk(
    "payroll",
     
    async (payload, { rejectWithValue }) => {
        try {
            const { startDate, endDate, employeeId } = payload

            const PARAMETER = `?startDate=${startDate}&endDate=${endDate}&employeeId=${employeeId}`

            const {data} = await api.get("/payroll" + encodeURI(PARAMETER))

            Toast.success(data.message)

            return data.payroll
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const deduction = createAsyncThunk(
    "payroll/deduction",
     
    async (payload, { rejectWithValue }) => {
        try {
            const { startDate, endDate, employeeId } = payload

            const PARAMETER = `?startDate=${startDate}&endDate=${endDate}&employeeId=${employeeId}`

            const {data} = await api.get("/payroll/deduction" + encodeURI(PARAMETER))

            Toast.success(data.message)

            return data.deduction
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)