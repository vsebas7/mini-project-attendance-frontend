import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
import Toast from "react-hot-toast";

export const clockIn = createAsyncThunk(
    "attendance/clock-in",
     
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("attendance/clock-in", payload)

            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const clockOut = createAsyncThunk(
    "attendance/clock-out",
     
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("attendance/clock-out", payload)

            Toast.success(data.message)

            return data
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const attendanceList = createAsyncThunk(
    "attendance/history",
     
    async (payload, { rejectWithValue }) => {
        try {
            const { date, page, startDate, endDate,employeeId } = payload

            let response ={}

            if(window.location.pathname=="/attendance"){

                response = await api.get(`${date ? "attendance/history" + encodeURI(`?date=${date}`) : "attendance/history" + encodeURI(`?page=${page}`) }` )
                
            }else {
                
                const PARAMETER = !employeeId ? `?startDate=${startDate}&endDate=${endDate}&page=${page}` :`?startDate=${startDate}&endDate=${endDate}&page=${page}&employeeId=${employeeId}`
                
                response = await api.get("attendance/history" + encodeURI(PARAMETER) )
            } 

            if(window.location.pathname !=="/attendance"){
                Toast.success(response.data.message)
            }

            return response.data.attendances
        } catch (error) {
            Toast.error(error.response?.data?.message)

            return rejectWithValue(error.response?.data?.message)
        }
    }
)