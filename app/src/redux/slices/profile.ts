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

export const uploadAvatar = createAsyncThunk<string, File>(
  "profile/uploadAvatar",
  async (file) => {
    const url = await ProfileService.uploadAvatar(file);
    return url;
  }
);

interface ProfileState {
  user: User | null;
  wasInitLoadAttempt: boolean;
  isLoading: boolean;
}

const initialState: ProfileState = {
  user: null,
  wasInitLoadAttempt: false,
  isLoading: false
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder // loadProfile
      .addCase(loadProfile.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.wasInitLoadAttempt = true;
        state.isLoading = false;
      })
      .addCase(loadProfile.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });

    builder // uploadAvatar
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.user.avatarUrl = action.payload;
      });
  }
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;