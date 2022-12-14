import axios from "axios";
import tokenService from "../service/token.service";

enum Paths {
  BASE_URL = "http://localhost:5000",
  LOGIN = "/login",
  REGISTER = "/register",
  PROTECTED = "/protected",
  CURRENT_USER = "/me",
  UPDATE_CURRENT_USER = "/me/update",
}

export const publicRoutes = [Paths.LOGIN, Paths.REGISTER];

const axiosInstance = axios.create({
  baseURL: Paths.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  if (!publicRoutes.includes(request.url as Paths))
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${tokenService.getSavedTokens()!.access_token}`,
    };
  //console.log(request.headers);
  return request;
});

export { Paths, axiosInstance };
