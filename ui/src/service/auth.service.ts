import axios, { AxiosResponse } from "axios";

import { LoginRequest, RegisterRequest } from "../schemas/forms.schemas";
import { LoginResponse, loginResponseSchema } from "../schemas/models.schemas";
import { Paths } from "../config/api.config";
import tokenService from "./token.service";

// TODO: Create userDetails Model

class AuthServiece {
  // TODO: export base url to axios config
  private loginUrl = `${Paths.BASE_URL}${Paths.LOGIN}`;
  private registerUrl = `${Paths.BASE_URL}${Paths.REGISTER}`;
  // TODO: export common headers to axios config
  private headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        this.loginUrl,
        { email, password },
        { headers: this.headers }
      );
      const tokens = loginResponseSchema.parse(response.data);
      tokenService.saveTokensIntoStorage(tokens);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async register(registerRequest: RegisterRequest): Promise<AxiosResponse> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(this.registerUrl, registerRequest, {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthServiece();
