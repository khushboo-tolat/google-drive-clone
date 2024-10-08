import React, { useState } from 'react';
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import CenterContainer from "./CenterContainer";

function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();


    async function handleLogout() {
        setError('')

        try {
            await logout();
            navigate("/login");
        }
        catch (e) {
            setError('Failed to log out.')
        }
    }

    return (
        <CenterContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                    <Link to={"/update-profile"} className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div style={{ textAlign: "center" }}>
                <Button variant="link" onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </CenterContainer>
    );
}

export default Profile
