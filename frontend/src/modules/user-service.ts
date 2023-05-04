import axios from "axios";

type UserSignIn = {
    email: string;
    password: string;    
}

export default class UserService {
    static async signIn(userDetails: UserSignIn) {
        const signInReq = await axios.post('http://localhost:8080/auth/signin', userDetails)
        const signInData = await signInReq.data;
        
        return signInData;
    }
}