import HttpService from "./http-service";

import { SIGNUP_URL, SIGNIN_URL } from "./apiConfig";

type UserSignIn = {
    email: string;
    password: string;    
}

type UserSignUp = {
    name: string;
    email: string;
    password: string;
};

export default class UserService {
    static async signIn(userDetails: UserSignIn) {
        return HttpService.doPost(SIGNIN_URL, userDetails);
    }

    static async signUp(userDetails: UserSignUp) {
        return HttpService.doPost(SIGNUP_URL, userDetails);
    }
}