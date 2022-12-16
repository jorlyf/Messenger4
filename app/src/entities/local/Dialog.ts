import { GroupDialogDTO, PrivateDialogDTO } from "@entities/dtos/dialog";
import { getTimestampFromUTCTimestamp } from "@helpers/index";

export enum DialogType {
  private = 0,
  group = 1
}

export default interface Dialog {
  id: string;
  apiId: number;
  type: DialogType;
  name: string;
  messages: [];
  totalMessageCount: number;
  unreadedMessageCount: number;
  userIds: number[];
  avatarUrl: string | null;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}

export const getDialogFromPrivateDialogDTO = (dto: PrivateDialogDTO): Dialog => {
  const dialog: Dialog = {
    id: "",
    apiId: dto.id,
    type: DialogType.private,
    name: "",
    messages: [],
    totalMessageCount: 0,
    unreadedMessageCount: 0,
    userIds: [dto.firstUserId, dto.secondUserId],
    avatarUrl: null,
    createdTimestamp: getTimestampFromUTCTimestamp(dto.createdTimestamp),
    lastUpdatedTimestamp: getTimestampFromUTCTimestamp(dto.lastUpdatedTimestamp)
  };
  return dialog;
}

export const getDialogFromGroupDialogDTO = (dto: GroupDialogDTO): Dialog => {
  const dialog: Dialog = {
    id: "",
    apiId: dto.id,
    type: DialogType.group,
    name: dto.name,
    messages: [],
    totalMessageCount: 0,
    unreadedMessageCount: 0,
    userIds: dto.userIds,
    avatarUrl: dto.avatarUrl,
    createdTimestamp: getTimestampFromUTCTimestamp(dto.createdTimestamp),
    lastUpdatedTimestamp: getTimestampFromUTCTimestamp(dto.lastUpdatedTimestamp)
  };
  return dialog;
}