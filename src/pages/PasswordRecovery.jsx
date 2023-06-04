import React, { useState } from 'react';
import Input from '../components/UI/input/Input';
import Button from '../components/UI/button/Button';
import Timer from '../components/UI/timer/Timer';
import { useNavigate } from "react-router-dom";
import '../styles/Registration.css'
import '../styles/PasswordRecovery.css'

const PasswordRecovery = () => {
    const [firstStep, setFirstStep] = useState('active')
    const [secondStep, setSecondStep] = useState('inactive')
    
    const [email, setEmail] = useState('')
    const [emailCode, setEmailCode] = useState('')

    const [minutes, setMinutes] = useState(5)
    const [seconds, setSeconds] = useState(0)

    const nextStep = () => {
        setFirstStep('inactive')
        setSecondStep('active')
    }

    const sendCode = () => {
        console.log('new code')
        setMinutes(5)
        setSeconds(0)
    }

    const navigate = useNavigate()
    const goToCreateNewPassword = () => {
        navigate('/create-new-password')
    }

    return (
        <div className='wrapper'>
            <h1>Password recovery</h1>
            <div className='steps-wrapper'>
                <div className='step'>
                    <div className={`step-circle ${firstStep}`}>1</div>
                    <div className={`step-text ${firstStep}`}>Checking email</div> 
                </div>
                
                <div className='step'>
                    <div className={`step-circle ${secondStep}`}>2</div>
                    <div className={`step-text ${secondStep}`}>Password recovery</div>
                </div>
                <div 
                    className='input-list-wrapper'
                    style={{margin: '1% 0 -6% 0', width: '100%'}}>
                    {firstStep === 'active'
                    ? <Input 
                        placeholder='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                      />
                    : <Input 
                        placeholder='Email code' 
                        value={emailCode} 
                        onChange={e => setEmailCode(e.target.value)}
                      />
                    }
                    
                </div>
                {secondStep === 'active'
                ? <div className='update-code-msg'>
                    <div>The message can go up to 5 minutes. You can</div>
                    <div style={{display: 'inline'}}>
                        <div 
                            style={{display: 'inline'}} 
                            className={`code-msg-link ${minutes === 0 && seconds === 0 ? 'available' : 'not-available'}`} 
                            onClick={sendCode}
                        >
                            send the code again
                        </div>
                        {` `}in{` `}
                        <Timer 
                            minutes={minutes} 
                            setMinutes={setMinutes} 
                            seconds={seconds} 
                            setSeconds={setSeconds}
                        />
                    </div>
                  </div>    
                : null
                }
                <div style={{alignSelf: 'flex-end'}}>
                    {firstStep === 'active'
                    ? <Button 
                        onClick={nextStep}
                        disabled={email === ''}
                      >
                        Continue
                      </Button>
                    : <Button
                        disabled={emailCode === ''}
                        onClick={goToCreateNewPassword}
                      >
                        Recovery
                      </Button>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default PasswordRecovery;