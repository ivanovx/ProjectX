import React from "react";
import useAuth from "./useAuth";
import UserService from "../modules/user-service";

export default function useUser() {
    const { token } = useAuth();

    const [user, setUser] = React.useState<any>({});

    React.useEffect(() => {
        if (token === null) {
            setUser(null);
        }

        UserService
            .me(token.accessToken)
            .then(u => {
                console.log(u)
                setUser(u);
            })
            .catch(console.log);
    }, [token]);

    return {
        token, 
        user,
    };
}