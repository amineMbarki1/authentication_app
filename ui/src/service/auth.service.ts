import { AxiosResponse } from "axios";

import { LoginRequest, RegisterRequest } from "../schemas/forms.schemas";
import { LoginResponse, loginResponseSchema } from "../schemas/models.schemas";
import tokenService from "./token.service";
import { Paths, axiosInstance as axios } from "../config/api.config";

// TODO: Create userDetails Model

class AuthServiece {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(Paths.LOGIN, {
      email,
      password,
    });
    const tokens = loginResponseSchema.parse(response.data);
    tokenService.saveTokens(tokens);
    return tokens;
  }

  async register(registerRequest: RegisterRequest): Promise<AxiosResponse> {
    const response = await axios.post(Paths.REGISTER, registerRequest);
    return response;
  }
}

export default new AuthServiece();
