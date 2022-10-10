import { LoginResponse } from "../schemas/models.schemas";

class TokenService {
  // Tokens saved in localstorage under
  private KEY: string = "tokens";

  saveTokens(tokens: LoginResponse) {
    localStorage.setItem(this.KEY, JSON.stringify(tokens));
  }

  getSavedTokens(): LoginResponse | null {
    const tokens = localStorage.getItem(this.KEY);
    if (!tokens) return null;
    return JSON.parse(tokens);
  }

  clearSavedTokens() {
    localStorage.removeItem(this.KEY);
  }
}

export default new TokenService();
