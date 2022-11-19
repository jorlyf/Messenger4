import { Attachment, DialogType, User } from "./index";

export enum MessageSendingStatus {
  sended,
  sending,
  error
}

export default interface Message {
  id: string,
  apiId: number | null;
  dialogId: number;
  dialogType: DialogType;
  replyToMessageId: number | null;
  replies: number[];
  senderUser: User;
  text: string | null;
  attachments: Attachment[];
  status: MessageSendingStatus;
  edited: boolean;
  sentTimestamp: number;
}