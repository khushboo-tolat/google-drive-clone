import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoute component={Dashboard} />,
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
            path: "update-profile",
            element: <PrivateRoute component={UpdateProfile} />,
        },
        {
            path: "*",
            element: <Login />,
        },
    ]);

    return (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
            <div style={{ minWidth: "400px" }}>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </div>
        </Container>
    );
}

export default App; 
