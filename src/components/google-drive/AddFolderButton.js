import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const { currentUser } = useAuth();
    
    function openModal() {
        setOpen(true);
    }
    
    function closeModal() {
        setOpen(false);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        if (currentFolder == null) return;
        
        database.folders.add({
            name: folderName,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            //path,
            createdAt: database.getCurrentTimestamp(),
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
