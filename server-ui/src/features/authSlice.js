import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    admin: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginAdmin = createAsyncThunk("api/admin/login", async(data, thunkAPI) => {
    try {
        // console.log(data)
        const response = await axios.post('http://18.210.63.173:8080/api/admin/login', {
            email: data.email,
            password: data.password
        });
        // console.log(response.data)
        return response.data;
    } catch (error) {
        if(error.response){
            // console.log(error.response.data)
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("api/admin/getMe", async(_, thunkAPI) => {
    try {
        const response = await axios.get('http://18.210.63.173:8080/api/admin/my_admin');
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("api/admin/LogOut", async() => {
    await axios.delete('http://18.210.63.173:8080/api/admin/logout', {
        withCredentials: true
    });
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginAdmin.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(LoginAdmin.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
        });
        builder.addCase(LoginAdmin.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get Admin Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.admin = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
