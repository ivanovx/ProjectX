import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import SignIn from './views/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root')!);

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

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);