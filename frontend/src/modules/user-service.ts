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
    static async signIn(userDetails: UserSignIn) {
        return await HttpService.doPost(SIGNIN_URL, userDetails);
    }

    static async signUp(userDetails: UserSignUp) {
        return await HttpService.doPost(SIGNUP_URL, userDetails);
    }
}