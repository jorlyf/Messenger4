import { UserDTO } from "@entities/dtos/user";

export default interface User {
  id: number;
  login: string;
  avatarUrl: string | null;
}

export const getUserFromUserDTO = (dto: UserDTO): User => {
  const user: User = {
    id: dto.id,
    login: dto.login,
    avatarUrl: dto.avatarUrl
  }
  return user;
}