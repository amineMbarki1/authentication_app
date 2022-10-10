import { axiosInstance as axios, Paths } from "../config/api.config";
import { UserUpdateRequest } from "../schemas/forms.schemas";
import {
  UserDetailsResponse,
  userDetailsResponseSchema,
} from "../schemas/models.schemas";

class UserService {
  async updateUser(userDetails: UserUpdateRequest) {
    console.log(userDetails);

    const response = await axios.put<UserDetailsResponse>(
      Paths.UPDATE_CURRENT_USER,
      userDetails
    );
    return response.data;
  }

  async getUserDetails() {
    const response = await axios.get<UserDetailsResponse>(Paths.CURRENT_USER);
    userDetailsResponseSchema.parse(response.data);
    return response.data;
  }
}

export default new UserService();
