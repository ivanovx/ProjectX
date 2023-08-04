import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type Props = {
    children: React.ReactNode;
}

export default function RequireAuth({ children } : Props) {
    const auth = useAuth();

    if (auth.token == null) {
        return <Navigate to="/" />
    }

    return children;
}