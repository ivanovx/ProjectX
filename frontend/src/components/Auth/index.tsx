import React from "react";
import { useNavigate } from "react-router-dom";
//import UserService from "../../modules/user-service";
import Storage from "../../modules/storage";
import axios from "axios";
import { SIGNIN_URL, SIGNUP_URL } from "../../modules/apiConfig";
import UserService from "../../modules/user-service";

type IProps = {
    children: React.ReactNode;
}

type IAuthContext = {
    token: any;
    signUp: (user: any) => void;
    signIn:  (user: any) => void;
    signOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
    token: null,
    signUp: () => {},
    signIn:  () => {},
    signOut: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export default function Auth({ children }: IProps) {
    const navigate = useNavigate();
    const [token, setToken] = React.useState<any>(Storage.get("token") || null);

    React.useEffect(() => {
        Storage.set("token", token);
    }, [token]);

    const signUp = (userDetails: any) => {
        UserService
            .signUp(userDetails)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });

       /* axios
            .post(SIGNUP_URL, userDetails)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.log(err);
            });*/
    };

    const signIn = (userDetails: any) => {
        UserService
            .signIn(userDetails)
            .then((token) => {
                console.log(token);
                setToken(token);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
            
           /* axios
                .post(SIGNIN_URL, userDetails)
                .then(res => {
                    console.log(res);
                    setToken(res.data);
                    navigate("/");
                })
                .catch(err => {
                    console.log(err);
                });*/
    };

    const signOut = () => {    
        alert("Are you sure?");
    };

    return <AuthContext.Provider value={{ token, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}