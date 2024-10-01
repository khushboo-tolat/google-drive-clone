import React from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './Navbar';
import AddFolderButton from './AddFolderButton';

function Dashboard() {
    return (
        <>
            <NavbarComponent />    
            <Container fluid>
                content
                <AddFolderButton/>
            </Container>
        </>
    )
}

export default Dashboard
