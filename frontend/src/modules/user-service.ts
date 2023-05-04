import axios from "axios";

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
        return await this.doPost("http://localhost:8080/auth/signin", userDetails);
    }

    static async signUp(userDetails: UserSignUp) {
       return await this.doPost("http://localhost:8080/auth/signup", userDetails);
    }

    private static async doPost(url: string, data: any) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        });
    }
}