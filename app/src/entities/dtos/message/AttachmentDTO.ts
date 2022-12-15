import { AttachmentType } from "@entities/local/Attachment";

export default interface AttachmentDTO {
  id: number;
  type: AttachmentType;
  url: string;
}
