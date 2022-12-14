import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LoginService from "@services/LoginService";
import RegistrationService from "@services/RegistrationService";
import { LoginAnswer, LoginData, RegistrationData } from "@entities/auth";
import LocalStorageService from "@services/LocalStorageService";

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

export const register = createAsyncThunk<LoginAnswer, RegistrationData>(
  "auth/login",
  async (registrationData) => {
    const loginAnswer = await RegistrationService.register(registrationData);
    return loginAnswer;
  }
);

interface AuthState {
  token: string | null;
  isAuthorized: boolean;
  isLogging: boolean;
  wasInitLoginAttempt: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthorized: false,
  isLogging: false,
  wasInitLoginAttempt: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLogging = false;
      state.isAuthorized = false;
      state.wasInitLoginAttempt = true;

      state.token = null;
      LocalStorageService.clearToken();
    },
    setWasInitAuthAttempt(state, action: PayloadAction<boolean>) {
      state.wasInitLoginAttempt = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLogging = true;
        state.isAuthorized = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogging = false;
        state.isAuthorized = true;
        state.wasInitLoginAttempt = true;

        state.token = action.payload.token;
        LocalStorageService.setToken(action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.isLogging = false;
        state.isAuthorized = false;
        state.wasInitLoginAttempt = true;

        state.token = null;
        LocalStorageService.clearToken();
      })
  }
});

export const { logout, setWasInitAuthAttempt } = authSlice.actions;

export default authSlice.reducer;