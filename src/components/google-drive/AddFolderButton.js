import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { database } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

function AddFolderButton() {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    
    function openModal() {
        setOpen(true);
    }
    
    function closeModal() {
        setOpen(false);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        database.folders.add({
            name: folderName,
        })
        
        setFolderName("");
        closeModal();
    }
    
    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name: </Form.Label>
                            <Form.Control type="text" required value={folderName} onChange={e => setFolderName(e.target.value)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal}>Close</Button>
                        <Button variant='success' type='submit'>Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddFolderButton
