import React, { useState } from 'react';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import Tooltip from '../components/UI/tooltip/Tooltip';
import ValidationWindow from '../components/ValidationWindow';
import { handleKey, isValid, validate } from '../services/RegistrationServices';
import { useNavigate } from "react-router-dom";
import '../styles/Registration.css'

const CreateNewPassword = () => {
    const [password, setPassword] = useState('')
    const [repeatPswd, setRepeatPswd] = useState('')
    const [validation, setValidation] = useState({
        lower: false,
        upper: false,
        number: false,
        special: false,
        length: false,
        match: false
    })

    const [pswdInputActive, setPswdInputActive] = useState(false)
    const [rpswdInputActive, setRpswdInputActive] = useState(false)
    const navigate = useNavigate()

    const createNewPassword = () => {
        console.log('click')
        navigate('/authorization')
    }

    const handleChangePswd = value => {
        setPassword(value)

        let validationCopy = {...validation}

        validationCopy = validate(validationCopy, value)

        if (value === repeatPswd && repeatPswd !== '' && value !== '') {
            validationCopy = {...validationCopy, match: true}
        } else {
            validationCopy = {...validationCopy, match: false}
        }

        setValidation(validationCopy)
    }

    const handlePasswordsMatching = value => {
        setRepeatPswd(value)

        let validationCopy = {...validation}
        if (password !== value || password === '' || value === '') {
            validationCopy = {...validationCopy, match: false}
        } else {
            validationCopy = {...validationCopy, match: true}
        }

        setValidation(validationCopy)
    }

    return (
        <div className='wrapper'>
            <h1>Create new password</h1>
            <form className='input-list-wrapper'>
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
                        type='password'
                        onKeyDown={e => handleKey(e)}
                        onFocus={() => setPswdInputActive(true)}
                        onBlur={() => setPswdInputActive(false)}
                    />
                </Tooltip>
                

                <Tooltip
                    direction='right'
                    content={<ValidationWindow valiadtion={validation} matching/>}
                    isInput
                    inputFocused={rpswdInputActive}
                    active={rpswdInputActive}>
                    <Input 
                        placeholder='Repeat password' 
                        value={repeatPswd} 
                        onChange={e => handlePasswordsMatching(e.target.value)}
                        type='password'
                        onKeyDown={e => handleKey(e)}
                        onFocus={() => setRpswdInputActive(true)}
                        onBlur={() => setRpswdInputActive(false)}
                    />  
                </Tooltip>
                
            </form>
            <div style={{alignSelf: 'flex-end', marginRight: '10%'}}>
                <Button
                    onClick={createNewPassword}
                    disabled={!isValid(password) || password !== repeatPswd}
                >
                    Recovery
                </Button>
            </div>
            
        </div>
    );
};

export default CreateNewPassword;