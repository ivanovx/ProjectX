import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "map", element: <div>Map</div> }
        ]
    }
]);

export default function App() {
    return <RouterProvider router={router} />
}