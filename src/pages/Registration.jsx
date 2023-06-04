import React, { useState } from 'react';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import Tooltip from '../components/UI/tooltip/Tooltip';
import ValidationWindow from '../components/ValidationWindow';
import { Link } from "react-router-dom";
import { handleKey, validate, isValid } from '../services/RegistrationServices';
import '../styles/Registration.css';

const Registration = () => {
    const [email, setEmail] = useState('')
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

    const registration = () => {
        console.log('click')
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
            <h1>Registration</h1>
            <form className='input-list-wrapper'>
                <Input 
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
            <Button
                onClick={registration}
                disabled={!isValid(password) ||
                          email === '' ||
                          password !== repeatPswd}
            >
                Sign Up
            </Button>
            <Link to='/authorization' className='link'>Already have an account?</Link>
        </div>
    );
};

export default Registration;