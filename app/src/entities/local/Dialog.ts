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