import $api from "@http/api";
import { User } from "@entities/local";
import { UserDTO } from "@entities/dtos/user";
import { getUserFromUserDTO } from "@entities/local/User";

export default class UserService {
  static async getUserById(id: number): Promise<User | null> {
    const { data } = await $api.get<UserDTO | null>(`/User/GetUserById?id=${id}`);
    if (data === null) return null;
    const user = getUserFromUserDTO(data);
    return user;
  }

  static async getUserByLogin(login: string): Promise<User | null> {
    const { data } = await $api.get<UserDTO | null>(`/User/GetUserByLogin?login=${login}`);
    if (data === null) return null;
    const user = getUserFromUserDTO(data);
    return user;
  }

  static async getUsersByLoginContains(login: string): Promise<User[]> {
    const { data } = await $api.get<UserDTO[] | null>(`/User/GetUsersByLoginContains?login=${login}`);
    const users = data.map(user => getUserFromUserDTO(user));
    return users;
  }
}