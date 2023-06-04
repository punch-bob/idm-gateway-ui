import React, { useState } from 'react';
import Modal from './UI/modal/Modal';
import ValidationWindow from './ValidationWindow';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import { handleKey, validate, isValid } from '../services/RegistrationServices';
import classes from '../styles/ChangePasswordModal.module.css'
import { useEffect } from 'react';

const ChangePasswordModal = ({active, setActive, id, title}) => {
    const [password, setPassword] = useState('1qQ!1111')
    const [validation, setValidation] = useState({
        lower: false,
        upper: false,
        number: false,
        special: false,
        length: false,
        match: false
    })

    useEffect(() => {
        handleChangePswd(password)
    }, [])

    const [pswdInputActive, setPswdInputActive] = useState(false)

    const handleChangePswd = value => {
        setPassword(value)
        setValidation(validate(validation, value))
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <h2>Change{' ' + title + ' '} password</h2>
                <div className={classes.inputWrapper}>
                    <Input 
                        placeholder='Password' 
                        defaultValue={password} 
                        onChange={e => handleChangePswd(e.target.value)}
                        type='text'
                        onKeyDown={e => handleKey(e)}
                        onFocus={() => setPswdInputActive(true)}
                        onBlur={() => setPswdInputActive(false)}
                    />
                    <ValidationWindow valiadtion={validation}/>
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button disabled={!isValid(password)}>Apply</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;