import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import SignIn from './views/user/SignIn';
import SignUp from './views/user/SignUp';
import Dashboard from './views/dashboard';
import CreateDevice from './views/dashboard/devices/Create';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="home" /> },
            { path: "home", element: <Home /> },
            { path: "map", element: <div>Map</div> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "dashboard/devices/create", element: <CreateDevice /> },
            { path: "user/signin", element: <SignIn /> },
            { path: "user/signup", element: <SignUp /> }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);