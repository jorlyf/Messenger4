import { DialogType } from "@entities/local";
import AttachmentDTO from "./AttachmentDTO";

export default interface MessageDTO {
  id: number;
  dialogId: number;
  dialogType: DialogType;
  replyToMessageId: number | null;
  replieIds: number[];
  senderUserId: number;
  text: string;
  attachments: AttachmentDTO[];
  edited: boolean;
  lastEditedTimestamp: number;
  sentTimestamp: number;
}
