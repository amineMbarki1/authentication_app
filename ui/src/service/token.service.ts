import { LoginResponse } from "../schemas/models.schemas";
import axios from "axios";

import { Paths } from "../config/api.config";

class TokenService {
  getTokensFromStorage(): LoginResponse | null {
    let tokens = localStorage.getItem("authState");
    if (!tokens) return null;
    return JSON.parse(tokens);
  }

  saveTokensIntoStorage(tokens: LoginResponse) {
    localStorage.setItem("authState", JSON.stringify(tokens));
  }

  deleteTokensFromStorage() {
    localStorage.removeItem("authState");
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await axios.get(`${Paths.BASE_URL}${Paths.PROTECTED}`);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new TokenService();
