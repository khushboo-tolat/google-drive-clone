import React from 'react';
import { Container } from "react-bootstrap";

function CenterContainer({ children }) {
  return (
    <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
    >
        <div style={{ minWidth: "400px" }}>
            {children}  
        </div>
    </Container>
  )
}

export default CenterContainer
