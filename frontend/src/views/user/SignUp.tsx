import React from "react";
import UserService from "../../modules/user-service";

export default function SignUp() {
    
    const onSignIn = (e: React.SyntheticEvent) => {
        e.preventDefault();

        UserService.signUp({
            name: "test",
           email: "csyntax@outlook.com",
           password: "test"
        }).then(console.log).catch(console.error);
    }

    return (
        <button onClick={onSignIn}>Sign Up</button>
    );
}