import $api from "@http/api";
import { LoginAnswer, LoginData } from "@entities/auth";

export default class AuthService {
  static async login(loginData: LoginData): Promise<LoginAnswer> {
    const { data } = await $api.post<LoginAnswer>("/Login", loginData);
    return data;
  }

  static async tokenLogin(): Promise<LoginAnswer> {
    const { data } = await $api.post<LoginAnswer>("/Login/TokenLogin");
    return data;
  }
}