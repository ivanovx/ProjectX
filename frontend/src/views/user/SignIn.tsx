import React from "react";
import UserService from "../../modules/user-service";

export default function SignIn() {
    
    const onSignIn = (e: React.SyntheticEvent) => {
        e.preventDefault();

        UserService.signIn({
           email: "csyntax@outlook.com",
           password: "test"
        }).then(console.log).catch(console.error);
    }

    return (
        <button onClick={onSignIn}>Sign In</button>
    );
}