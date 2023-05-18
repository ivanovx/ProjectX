import React from "react";
import { useNavigate } from "react-router-dom";
import Storage from "../../modules/storage";
import UserService from "../../modules/user-service";

type IProps = {
    children: React.ReactNode;
}

type Token = {
    accessToken: string;
    refreshToken: string;
};

type IAuthContext = {
    token: Token | null;
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

export default function AuthProvider({ children }: IProps) {
    const navigate = useNavigate();
    const [token, setToken] = React.useState<Token>(Storage.get("token") || null);

    React.useEffect(() => {
        Storage.set("token", token);
    }, [token]);

    const signUp = (userDetails: any) => {
        UserService
            .signUp(userDetails)
            .then(() => {
                navigate("/user/signin");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const signIn = (userDetails: any) => {
        UserService
            .signIn(userDetails)
            .then((token: Token) => {
                setToken(token);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const signOut = () => {
        setToken(null);
        navigate("/");
    };

    return <AuthContext.Provider value={{ token, signUp, signIn, signOut }}>{children}</AuthContext.Provider>;
}