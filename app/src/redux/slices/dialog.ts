import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DialogService from "@services/DialogService";
import { Dialog, DialogInfo } from "@entities/local";

export const initLoadDialogs = createAsyncThunk<Dialog[]>(
  "initLoad",
  async () => {
    const { } = await DialogService.initLoadDialogs();

    return [];
  }
);

interface DialogState {
  dialogs: Dialog[];
  dialogsInitFetched: boolean;
  currentDialogInfo: DialogInfo | null;
  totalDialogCount: number;
}

const initialState: DialogState = {
  dialogs: [],
  dialogsInitFetched: false,
  currentDialogInfo: null,
  totalDialogCount: 0
}

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(initLoadDialogs.pending, (state) => {
        
      })
      .addCase(initLoadDialogs.fulfilled, (state, action) => {
        state.dialogsInitFetched = true;
        state.dialogs = action.payload;
      })
      .addCase(initLoadDialogs.rejected, (state) => {
        state.dialogs = [];
        console.error("Не удалось загрузить диалоги при запуске приложения.");
      })
  }
});

export const { } = dialogSlice.actions;

export default dialogSlice.reducer;