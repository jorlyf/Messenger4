import MessageDTO from "@entities/dtos/message/MessageDTO";
import { getAttachmentFromAttachmentDTO } from "./Attachment";
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
  replieIds: number[];
  senderUserId: number;
  text: string | null;
  attachments: Attachment[];
  status: MessageSendingStatus;
  edited: boolean;
  lastEditedTimestamp: number;
  sentTimestamp: number;
}

export const getMessageFromMessageDTO = (dto: MessageDTO): Message => {
  const message: Message = {
    id: "",
    apiId: dto.id,
    dialogId: dto.dialogId,
    dialogType: dto.dialogType,
    replyToMessageId: dto.replyToMessageId,
    replieIds: dto.replieIds,
    senderUserId: dto.senderUserId,
    text: dto.text,
    attachments: dto.attachments.map(attachmentDTO => getAttachmentFromAttachmentDTO(attachmentDTO)),
    status: MessageSendingStatus.sended,
    edited: dto.edited,
    lastEditedTimestamp: dto.lastEditedTimestamp,
    sentTimestamp: dto.sentTimestamp
  }
  return message;
}