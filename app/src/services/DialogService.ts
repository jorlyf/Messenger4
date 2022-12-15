import { Dialog } from "@entities/local";
import $api from "@http/api";

export default class DialogService {
  static async initLoadDialogs(): Promise<Dialog[]> {
    try {
      const { data } = await $api.get("/Dialog/");
      
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}