enum Items {
  token = "token"
}

export default class LocalStorageService {
  static getToken(): string | null {
    return localStorage.getItem(Items.token);
  }

  static setToken(token: string) {
    localStorage.setItem(Items.token, token);
  }

  static clearToken() {
    localStorage.removeItem(Items.token);
  }
}