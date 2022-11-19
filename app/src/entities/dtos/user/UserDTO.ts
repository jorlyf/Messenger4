export default interface UserDTO {
  id: number;
  login: string;
  avatarUrl: string | null;
  lastActivityTimestamp: number;
}