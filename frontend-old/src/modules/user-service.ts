import HttpService from "./http-service";

import { API_URL, SIGNUP_URL, SIGNIN_URL } from "./apiConfig";

export type UserSignIn = {
    username: string;
    password: string;
}

export type UserSignUp = {
    name: string;
    username: string;
    email: string;
    password: string;
};

export default class UserService {
    static signIn(userDetails: UserSignIn) {
        return HttpService.doPost(SIGNIN_URL, userDetails);
    }

    static signUp(userDetails: UserSignUp) {
        return HttpService.doPost(SIGNUP_URL, userDetails);
    }

    static me(token: string) {
        return HttpService.doGet(`${API_URL}/user`,  {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
}