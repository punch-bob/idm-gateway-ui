import React, { useEffect, useState } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import Tooltip from './UI/tooltip/Tooltip';
import ValidationWindow from './ValidationWindow';
import DragAndDrop from './UI/drag-n-drop/DragAndDrop';
import Button from './UI/button/Button';
import TextArea from './UI/textarea/TextArea';
import Icon from "react-icons-kit";
import {user} from 'react-icons-kit/feather/user';
import { handleKey, validate, isValid } from '../services/RegistrationServices';
import UserService from '../api/UserService';
import classes from '../styles/CreateUserModal.module.css';

const CreateUserModal = ({active, setActive, setNewUser, setNextActive, title}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [photo, setPhoto] = useState()
    const [desc, setDesc] = useState('')

    const [pswdInputActive, setPswdInputActive] = useState(false)
    const [validation, setValidation] = useState({
        lower: false,
        upper: false,
        number: false,
        special: false,
        length: false,
        match: false
    })

    const handleChangePswd = value => {
        setPassword(value)
        setValidation(validate(validation, value))
    }

    useEffect(() => {
        if (active) {
            setEmail('')
            setFirstName('')
            setLastName('')
            handleChangePswd('')
            setPatronymic('')
            setPhoto()
        }
    }, [active])

    async function createUser() {
        const name = firstName.charAt(0).toLowerCase() + '.' + patronymic.charAt(0).toLowerCase() + '.' + lastName.toLowerCase()
        const res = await UserService.createUser(name, firstName, lastName, patronymic, email, name, desc, password)
    }

    const createNewUser = () => {
        createUser()
        const id = 10
        setNewUser({
            id,
            firstName,
            lastName,
            patronymic,
            email,
            password
        })
        setActive(false)
        if (setNextActive !== undefined) {
            setNextActive(true)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.mainWrapper}>
                <div className={classes.title}>
                    <Icon icon={user} size={'calc(2.1rem)'}/>
                    <h1>Create {title}</h1>
                </div>
                <div className={classes.wrapper}>
                    <form className={classes.inputWrapper}>
                        <Input 
                            placeholder='First name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            onKeyDown={e => handleKey(e)}
                        />
                        <Input 
                            placeholder='Last name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            onKeyDown={e => handleKey(e)}
                        />
                        <Input 
                            placeholder='Patronymic'
                            value={patronymic}
                            onChange={e => setPatronymic(e.target.value)}
                            onKeyDown={e => handleKey(e)}
                        />
                        <Input 
                            type='email'
                            pattern=".+@globex\.com"
                            placeholder='Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => handleKey(e)}
                        />
                        <Tooltip
                            direction='right'
                            content={<ValidationWindow valiadtion={validation}/>}
                            isInput
                            inputFocused={pswdInputActive}
                            active={pswdInputActive}>
                            <Input 
                                placeholder='Password' 
                                value={password} 
                                onChange={e => handleChangePswd(e.target.value)}
                                type='text'
                                onKeyDown={e => handleKey(e)}
                                onFocus={() => setPswdInputActive(true)}
                                onBlur={() => setPswdInputActive(false)}
                            />
                        </Tooltip>
                        <TextArea 
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder='Description'
                        />
                    </form>
                    <div className={classes.dragAndDropWrapper}>
                        <DragAndDrop photo={photo} setPhoto={setPhoto}/>
                    </div>
                </div>
                <div className={classes.btnWrapper}>
                    <Button 
                        onClick={createNewUser}
                        disabled={firstName === '' ||
                                  lastName === '' ||
                                  patronymic === '' ||
                                  email === '' ||
                                  !isValid(password)}
                    >{setNextActive === undefined ? 'Create' : 'Continue'}</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateUserModal;