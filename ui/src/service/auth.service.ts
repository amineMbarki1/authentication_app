import axios from 'axios';

import {  LoginRequest } from '../schemas/forms.schemas';
import { LoginResponse, loginResponseSchema } from '../schemas/models.schemas';
import { Paths } from '../config/api.config';



class AuthServiece {
    async login({ email, password }: LoginRequest): Promise<LoginResponse> {
        const url = `${Paths.BASE_URL}${Paths.LOGIN}`;
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }

        try {
            const response = await axios.post<LoginResponse>(url, {email, password}, {headers});
            const tokens = loginResponseSchema.parse(response.data);
            return tokens;
        } catch (error) {
            throw error;
        }
    }
}


export default new AuthServiece();