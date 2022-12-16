export default interface GroupDialogDTO {
  id: number;
  userIds: number[];
  name: string;
  avatarUrl: string | null;
  createdTimestamp: number;
  lastUpdatedTimestamp: number;
}