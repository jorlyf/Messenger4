import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@entities/local";
import ProfileService from "@services/ProfileService";

export const loadProfile = createAsyncThunk<User>(
  "profile/load",
  async () => {
    const user = await ProfileService.getProfile();
    return user;
  }
);

interface ProfileState {
  user: User | null;
  wasInitLoad: boolean;
}

const initialState: ProfileState = {
  user: null,
  wasInitLoad: false
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      
  }
});

export const {  } = profileSlice.actions;

export default profileSlice.reducer;