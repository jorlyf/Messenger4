import * as React from "react";
import DialogService from "@services/DialogService";
import { Dialog } from "@entities/local";
import useAppSelector from "./useAppSelector";

const useGetCurrentDialog = () => {
  const currentDialogInfo = useAppSelector(state => state.dialog.currentDialogInfo);
  const dialogs = useAppSelector(state => state.dialog.dialogs);

  const currentDialog: Dialog | null = React.useMemo(() => {
    if (currentDialogInfo === null) return null;

    const dialog = DialogService.findDialog(dialogs, currentDialogInfo);
    return dialog;

  }, [currentDialogInfo]);

  return currentDialog;
}

export default useGetCurrentDialog;