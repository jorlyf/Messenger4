import { DialogType } from "./Dialog";

export default interface DialogInfo {
  id: string;
  apiId: number | null;
  type: DialogType;
}