import HttpService from "./http-service";

import { SIGNUP_URL, SIGNIN_URL } from "./apiConfig";

export type UserSignIn = {
    email: string;
    password: string;
}

export type UserSignUp = {
    name: string;
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
}