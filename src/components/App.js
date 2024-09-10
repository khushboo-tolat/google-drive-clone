import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Dashboard from "./google-drive/Dashboard";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute component={Dashboard} />,
        },
        {
            path: "/user",
            element: <PrivateRoute component={Profile} />,
        },
        {
            path: "update-profile",
            element: <PrivateRoute component={UpdateProfile} />,
        },
        {
            path: "signup",
            element: <Signup />,
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "forgot-password",
            element: <ForgotPassword />,
        },
        {
            path: "*",
            element: <Login />,
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>        
    );
}

export default App; 
