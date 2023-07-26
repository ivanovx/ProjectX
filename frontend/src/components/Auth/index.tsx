import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, IconButton } from "@mui/material";

import Storage from "../../modules/storage";
import AuthContext, { type Token } from "../../modules/authContext";
import UserService, { type UserSignIn, type UserSignUp } from "../../modules/user-service";

type Props = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
    const navigate = useNavigate();
    const [token, setToken] = React.useState<Token>(Storage.get("token") || null);

    const [error, setError] = React.useState<any | null>(null);

    React.useEffect(() => {
        Storage.set("token", token);
    }, [token]);

    const signUp = (userDetails: UserSignUp) => {
        UserService
            .signUp(userDetails)
            .then(() => {
                navigate("/user/signin");
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            });
    };

    const signIn = (userDetails: UserSignIn) => {
        UserService
            .signIn(userDetails)
            .then((token: Token) => {
                setToken(token);
                navigate("/");
            })
            .catch((err) => {
                setError(err);
                console.log(err);
            });
    };

    const signOut = () => {
        setToken(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, signUp, signIn, signOut }}>
            { error && <ErrorMessage value={error.message} onClick={() => setError(null)} />}
            {children}
        </AuthContext.Provider>
    );
}

function ErrorMessage({ value, onClick }) {
    return (
        <Alert
        action={
          <IconButton
            aria-label="close"
            color="error"
            size="small"
            onClick={onClick}
          >
            X
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {value}
      </Alert>
    );
}