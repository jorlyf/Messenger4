import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginService } from "@services/index";
import { LoginAnswer, LoginData } from "@entities/auth";

export const login = createAsyncThunk<LoginAnswer, LoginData>(
  "auth/login",
  async (loginData) => {
    const loginAnswer = await LoginService.login(loginData);
    return loginAnswer;
  }
);

export const tokenLogin = createAsyncThunk<LoginAnswer>(
  "auth/login",
  async () => {
    const loginAnswer = await LoginService.tokenLogin();
    return loginAnswer;
  }
);

interface AuthState {
  token: string | null;
  isAuthorized: boolean;
  isLogging: boolean;
  wasLoginAttempt: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthorized: false,
  isLogging: false,
  wasLoginAttempt: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLogging = true;
        state.isAuthorized = false;

        state.token = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogging = false;
        state.isAuthorized = true;
        state.wasLoginAttempt = true;

        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLogging = false;
        state.isAuthorized = false;
        state.wasLoginAttempt = true;

        state.token = null;
      })
  }
});

export default authSlice.reducer;