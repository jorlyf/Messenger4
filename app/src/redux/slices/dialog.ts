import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DialogService from "@services/DialogService";
import { Dialog, DialogInfo, DialogType } from "@entities/local";
import { getTimestampNow } from "@helpers/index";

export const initLoadDialogs = createAsyncThunk<Dialog[]>(
  "dialog/initLoad",
  async () => {
    const { } = await DialogService.initLoadDialogs();

    return [];
  }
);

export interface handleChangeCurrentDialogProps {
  dialogs: Dialog[];
  dialogInfo: DialogInfo;
}

export const handleChangeCurrentDialog = createAsyncThunk<Dialog | null, handleChangeCurrentDialogProps>(
  "dialog/handleChangeCurrentDialog",
  async ({ dialogs, dialogInfo }) => {
    let dialog = DialogService.findDialog(dialogs, dialogInfo);
    if (dialog === null)
    {
      try {
        dialog = await DialogService.getDialogById(dialogInfo.apiId, dialogInfo.type);
      } catch (error) {
        console.error("Не получилось получить диалог в handleChangeCurrentDialog()");
      }
    }

    if (dialog === null && dialogInfo.type === DialogType.private) { // диалог не создан, но должна быть возможность выбрать его
      dialog = {
        id: "",
        apiId: dialogInfo.apiId,
        type: dialogInfo.type,
        name: "",
        messages: [],
        totalMessageCount: 0,
        unreadedMessageCount: 0,
        userIds: [],
        avatarUrl: null,
        createdTimestamp: getTimestampNow(),
        lastUpdatedTimestamp: getTimestampNow()
      }
    }

    return dialog;
  }
)

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