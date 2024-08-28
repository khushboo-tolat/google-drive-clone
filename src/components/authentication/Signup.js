import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match.');
        }

        if (passwordRef.current.value.length < 6) {
            return setError('Password length should be greater than 6.');
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        }
        catch (e) {
            //console.log(e)
            setError('Failed to create an account.')
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
                <Form.Group className="mt-2" id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} required />
                </Form.Group>
                <Button disabled={loading} className="mt-4 w-100" type="submit">
                    Sign Up
                </Button>
                </Form>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to={"/login"} style={{ textDecoration: "none" }}>Log In</Link>
            </div>
        </>
    );
}

export default Signup
