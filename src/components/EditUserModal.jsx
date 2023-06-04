import React, { useState, useEffect } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import { handleKey } from '../services/RegistrationServices';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/typicons/pencil'
import classes from '../styles/EditUserModal.module.css';

const EditUserModal = ({active, setActive, user, setUser, title}) => {
    const [userCopy, setUserCopy] = useState('')
    
    useEffect(() =>{
        setUserCopy(user)
    }, [user])

    const  updateUser = () => {
        setUser(userCopy)
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <div className={classes.titleWrapper}>
                    <Icon size={'calc(1.7rem)'} icon={pencil}/>
                    <h2>Edit {title}</h2>
                </div>
                <form>
                    <Input 
                        defaultValue={userCopy.givenName}
                        onChange={e => setUserCopy({...userCopy, givenName: e.target.value})}
                        placeholder='First name'
                        type='text'
                        onKeyDown={e => handleKey(e)}
                    />
                    <Input 
                        defaultValue={userCopy.familyName}
                        onChange={e => setUserCopy({...userCopy, familyName: e.target.value})}
                        placeholder='Last name'
                        type='text'
                        onKeyDown={e => handleKey(e)}
                    />
                    <Input 
                        defaultValue={userCopy.additionalName}
                        onChange={e => setUserCopy({...userCopy, additionalName: e.target.value})}
                        placeholder='Patronymic'
                        type='text'
                        onKeyDown={e => handleKey(e)}
                    />
                    <Input 
                        defaultValue={userCopy.description}
                        onChange={e => setUserCopy({...userCopy, description: e.target.value})}
                        placeholder='Description'
                        type='text'
                        onKeyDown={e => handleKey(e)}
                    />
                </form>
                <div className={classes.buttonsWrapper}>
                    <Button 
                        onClick={updateUser} 
                        disabled={userCopy.familyName === '' ||
                                 userCopy.givenName === '' ||
                                 userCopy.additionalName === '' ||
                                 userCopy.description === ''}
                    >Apply</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditUserModal;