import $api from "@http/api";
import { LoginAnswer, RegistrationData } from "@entities/auth";

export default class RegistrationService {
  static async register(registrationData: RegistrationData): Promise<LoginAnswer> {
    const { data } = await $api.post<LoginAnswer>("/Registration", registrationData);
    return data;
  }
}