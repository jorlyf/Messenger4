import $api from "@http/api";
import { Dialog, DialogInfo } from "@entities/local";
import { GroupDialogDTO, PrivateDialogDTO } from "@entities/dtos/dialog";
import { DialogType, getDialogFromGroupDialogDTO, getDialogFromPrivateDialogDTO } from "@entities/local/Dialog";

export default class DialogService {
  static async initLoadDialogs(): Promise<Dialog[]> {
    try {
      const { data } = await $api.get("/Dialog/");

    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async getDialogById(dialogId: number, dialogType: DialogType): Promise<Dialog | null> {
    if (dialogType === DialogType.private) return DialogService.getPrivateDialogById(dialogId);
    else return DialogService.getGroupDialogById(dialogId); 
  }

  static async getPrivateDialogById(dialogId: number): Promise<Dialog | null> {
    const { data } = await $api.get<PrivateDialogDTO | null>(`/Dialog/GetPrivateDialogById?id=${dialogId}`);
    if (data === null) return null;
    const dialog = getDialogFromPrivateDialogDTO(data);
    return dialog;
  }

  static async getGroupDialogById(dialogId: number): Promise<Dialog | null> {
    const { data } = await $api.get<GroupDialogDTO | null>(`/Dialog/GetGroupDialogById?id=${dialogId}`);
    if (data === null) return null;
    const dialog = getDialogFromGroupDialogDTO(data);
    return dialog;
  }

  static findDialog(dialogs: Dialog[], dialogInfo: DialogInfo): Dialog | null {
    const dialog = dialogs.find(x => x.apiId === dialogInfo.apiId && x.type === dialogInfo.type);
    return dialog ? dialog : null;
  }
}