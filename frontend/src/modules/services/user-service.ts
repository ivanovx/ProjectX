import HttpService from "./http-service";

import { API_URL } from "../apiConfig";

export type UserSignUp = {
    email: string;
    username: string;
    password: string;
};

export default class UserService {
    static signUp(userDetails: UserSignUp) {
        return HttpService.doPost(`${API_URL}/user/create`, userDetails);
    }
}