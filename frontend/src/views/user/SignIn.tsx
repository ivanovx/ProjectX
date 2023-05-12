import React from "react";
import { useAuth } from "../../components/Auth";

export default function SignIn() {
    const { signIn } = useAuth();
    
    const onSignIn = (e: React.SyntheticEvent) => {
        e.preventDefault();

        signIn({
            email: "csyntax@outlook.com",
           password: "test" 
        });
    }

    return <button onClick={onSignIn}>Sign In</button>;
}