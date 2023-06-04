import React from 'react';
import Modal from './UI/modal/Modal';
import Button from './UI/button/Button';
import classes from '../styles/DeleteModal.module.css'

const DeleteModal = ({active, setActive, deleteText, deleteCallback, deleteId}) => {
    const deleteItem = () => {
        deleteCallback(deleteId)
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <span className={classes.title}>Delete</span>
                <span>Are you sure you want to delete</span>
                <span>"<span className={classes.deleteObject}>{deleteText}</span>"?</span>
                <div className={classes.buttonWrapper}>
                    <Button id='delete' className={classes.deleteButton} onClick={deleteItem}>Delete</Button>
                    <Button id='cancel' className={classes.deleteButton} onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;