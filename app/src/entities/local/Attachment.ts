import AttachmentDTO from "@entities/dtos/message/AttachmentDTO";

export enum AttachmentType {
  photo = 0,
  video = 1,
  file = 2
}

export default interface Attachment {
  id: string;
  apiId: number | null;
  type: AttachmentType;
  url: string;
}

export const getAttachmentFromAttachmentDTO = (dto: AttachmentDTO): Attachment => {
  const attachment: Attachment = {
    id: "",
    apiId: dto.id,
    type: dto.type,
    url: dto.url
  }
  return attachment;
}