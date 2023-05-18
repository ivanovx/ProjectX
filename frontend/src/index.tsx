import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/Layout/Dashboard';
import Home from './views/Home';
import SignIn from './views/User/SignIn';
import SignUp from './views/User/SignUp';
import DashboardHome from './views/Dashboard';
import CreateDevice from './views/Dashboard/Devices/Create';

import Devices from "./views/Dashboard/Devices";

const root = ReactDOM.createRoot(document.getElementById('root')!);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true,  element: <Home /> },
            //{ path: "dashboard", element: <Dashboard /> },
            //{ path: "dashboard/devices/create", element: <CreateDevice /> },
            { path: "user/signin", element: <SignIn /> },
            { path: "user/signup", element: <SignUp /> }
        ]
    },
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <DashboardHome /> },
            { path: "devices", element: <Devices /> },
            { path: "devices/create", element: <CreateDevice /> }
        ] 
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);