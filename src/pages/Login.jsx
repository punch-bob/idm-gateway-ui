import React, { useState } from 'react';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import { Link } from "react-router-dom";
import { handleKey, validate } from '../services/RegistrationServices';
import '../styles/Registration.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const login = () => {
        console.log('click')
    }

    return (
        <div className='wrapper'>
            <h1>Login</h1>
            <form className='input-list-wrapper'>
                <Input 
                    placeholder='Email' 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => handleKey(e)}
                />

                <Input 
                    placeholder='Password' 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    onKeyDown={e => handleKey(e)}
                />
            </form>
            <Button
                onClick={login}
                disabled={password === '' || email === ''}
            >
                Sign Up
            </Button>
            <div className='link-wrapper'>
                <Link to='/registration' className='link login'>Create an account</Link>
                <Link to='/password-recovery' className='link login'>Forgot your password?</Link>
            </div>
            
        </div>
    );
};

export default Login;