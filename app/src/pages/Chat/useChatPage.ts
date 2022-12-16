import { DialogInfo, DialogType } from "@entities/local";
import useAppSelector from "@hooks/useAppSelector";
import { handleChangeCurrentDialog } from "@redux/slices/dialog";
import { AppDispatch } from "@redux/store";
import { useDispatch } from "react-redux";

const useChatPage = (dialogInfo?: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const dialogs = useAppSelector(state => state.dialog.dialogs);

  const changeCurrentDialog = () => {
    if (!dialogInfo) return;
    if (dialogInfo.split("=").length !== 2) return;

    const stringType = dialogInfo.split("=").at(0);
    const id = parseInt(dialogInfo.split("").at(1));
    if (id == NaN) return;

    let dialogType: DialogType;
    switch (stringType) {
      case "user": {
        dialogType = DialogType.private;
        break;
      }
      case "group": {
        dialogType = DialogType.group;
        break;
      }
      default: {
        return;
      }
    }

    const info: DialogInfo = { id: "", apiId: id, type: dialogType };
    dispatch(handleChangeCurrentDialog({ dialogs: dialogs, dialogInfo: info }));
  }
}

export default useChatPage;