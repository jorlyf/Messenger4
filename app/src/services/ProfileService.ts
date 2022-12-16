import $api from "@http/api";
import { User } from "@entities/local";
import { UserDTO } from "@entities/dtos/user";
import { getUserFromUserDTO } from "@entities/local/User";

export default class ProfileService {
  static async getProfile(): Promise<User> {
    const { data } = await $api.get<UserDTO>("/User/GetMyUser");
    if (data === null) return null;
    const user = getUserFromUserDTO(data);
    return user;
  }

  /** return avatar url */
  static async uploadAvatar(avatar: File): Promise<string> {
    const formData: FormData = new FormData();
    formData.set("avatar", avatar);

    const { data } = await $api.post<string>("/User/UploadAvatar", formData);
    return data;
  }
}