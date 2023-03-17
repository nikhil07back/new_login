import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


let userExist = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: userExist ? userExist : null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state, action) => {
            state.user = null
            state.isSuccess = false
            state.isLoading = false
            state.isError = false
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled , (state, action) => {
                state.isLoading = false
                state.user = null
            }) 
    }
});


// Register

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {

    try {
        return authService.register(userData);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();      
        return thunkAPI.rejectWithValue(message);
    }

})

// Login

export const login = createAsyncThunk("auth/login",  async (userData, thunkAPI) => {

    try {
        return authService.login(userData);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();      
        return thunkAPI.rejectWithValue(message);
    }

});

export const logout = createAsyncThunk("auth/logout", async () => {
    return authService.logout();
});


export const { reset } = authSlice.actions

export default authSlice.reducer


