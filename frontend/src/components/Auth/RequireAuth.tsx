import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth({ children }) {
    const auth = useAuth();

    if (auth.token == null) {
        return <Navigate to="/" />
    }

    return children;
}