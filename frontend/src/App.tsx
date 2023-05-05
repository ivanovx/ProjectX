import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import SignIn from './views/SignIn';
import Home from './views/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="home" /> },
            { path: "home", element: <Home /> },
            { path: "map", element: <div>Map</div> },
            { path: "dashboard", element: <div>Dashboard</div> },
            { path: "user/signin", element: <SignIn /> }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />
}