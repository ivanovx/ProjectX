import React from "react";

export type Token = {
    accessToken: string;
    refreshToken: string;
};

type IAuthContext = {
    token: Token | null;
    signUp: (user: any) => void;
    signIn:  (user: any) => void;
    signOut: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
    token: null,
    signUp: () => {},
    signIn:  () => {},
    signOut: () => {},
});

export default AuthContext;