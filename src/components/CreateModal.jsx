import React, { useState } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import TextArea from './UI/textarea/TextArea';
import Button from './UI/button/Button';
import Icon from "react-icons-kit";
import {users} from 'react-icons-kit/feather/users';
import {gitlab} from 'react-icons-kit/feather/gitlab';
import {link} from 'react-icons-kit/feather/link';
import classes from '../styles/CreateModal.module.css';
import { useEffect } from 'react';

const CreateModal = ({active, setActive, setNextActive, setPrevActive, title, isCreate, createCallback}) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [icon, setIcon] = useState(users)

    const changeModal = () => {
        createCallback(name, name, desc)
        if (isCreate) {
            setActive(false)
            setPrevActive(true)
        } else {
            setActive(false)
            setNextActive(true)
        }
    }

    useEffect(() => {
        const t = title.toLowerCase()
        if (t === 'chat') {
            setIcon(link)
        } else if (t === 'repository') {
            setIcon(gitlab)
        }
    }, [title])

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    <Icon icon={icon} size={'calc(2.1rem)'}/>
                    <h1>Create{' ' + title}</h1>
                </div>
                <div className={classes.inputWrapper}>
                    <Input 
                        type='text'
                        placeholder={title + ' name'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={classes.textareaWrapper}>
                    <TextArea 
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        placeholder='Description'
                    />
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={changeModal} disabled={name === ''}>{isCreate ? 'Create' : 'Continue'}</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateModal;