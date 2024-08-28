import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match.');
        }

        if (passwordRef.current.value.length < 6) {
            return setError('Password length should be greater than 6.');
        }
        
        const promises = [];
        setError('');
        setLoading(true);
        
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }
        
        Promise.all(promises).then(() => {
            navigate("/");
        }).catch(() => {
            setError('Failed to update profile.')
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                </Form.Group>
                <Form.Group className="mt-2" id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Keep blank to keep the same" />
                </Form.Group>
                <Form.Group className="mt-2" id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmPasswordRef} placeholder="Keep blank to keep the same" />
                </Form.Group>
                <Button disabled={loading} className="mt-4 w-100" type="submit">
                    Update
                </Button>
                </Form>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to={"/"} style={{ textDecoration: "none" }}>Cancel</Link>
            </div>
        </>
    );
}

export default UpdateProfile
