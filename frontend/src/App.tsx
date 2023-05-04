import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import SignIn from './views/SignIn';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "map", element: <div>Map</div> },
            { path: "user/signin", element: <SignIn /> }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />
}