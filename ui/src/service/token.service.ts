import { LoginResponse } from "../schemas/models.schemas";
import axios from "axios";

import { Paths } from "../config/api.config";

class TokenService {
  getTokensFromStorage(): LoginResponse {
    let tokens = localStorage.getItem("authState");
    if (!tokens) throw new Error("No tokens in storage");
    return JSON.parse(tokens);
  }

  saveTokensIntoStorage(tokens: LoginResponse) {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }

  clearSavedTokens() {
    localStorage.removeItem("tokens");
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
