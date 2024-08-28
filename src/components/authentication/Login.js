import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value.length < 6) {
            return setError('Password length should be greater than 6.');
        }

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (e) {
            //console.log(e);
            setError("Failed to Log In.");
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group className="mt-2" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="mt-4 w-100" type="submit">
                    Log In
                </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>Forgot Password?</Link>
                </div>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to={"/signup"} style={{ textDecoration: "none" }}>Sign Up</Link>
            </div>
        </>
    );
}

export default Login;
