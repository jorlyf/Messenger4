import $api from "@http/api";
import { User } from "@entities/local";
import { UserDTO } from "@entities/dtos/user";

export default class ProfileService {
  static async getProfile(): Promise<User> {
    const { data } = await $api.get<UserDTO>("/Profile/Get");
    const user: User = {
      id: data.id,
      login: data.login,
      avatarUrl: data.avatarUrl
    }
    return user;
  }

  /** return avatar url */
  static async uploadAvatar(avatar: File): Promise<string | null> {
    const formData: FormData = new FormData();
    formData.set("avatar", avatar);

    try {
      const { data } = await $api.post<string>("/Profile/UploadAvatar", formData);
      return data;
    } catch (error) {
      return null;
    }
  }
}