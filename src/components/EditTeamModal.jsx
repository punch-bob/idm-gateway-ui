import React, { useState, useEffect } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import Button from './UI/button/Button';
import TextArea from './UI/textarea/TextArea';
import { handleKey } from '../services/RegistrationServices';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/typicons/pencil'
import classes from '../styles/CreateModal.module.css';

const EditTeamModal = ({active, setActive, team, setTeam}) => {
    const [teamCopy, setTeamCopy] = useState('')

    useEffect(() =>{
        setTeamCopy(team)
    }, [team])

    const  updateTeam = () => {
        setTeam(teamCopy)
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <div className={classes.titleWrapper}>
                    <Icon className={classes.pencilIcon} size={'calc(1.7rem)'} icon={pencil}/>
                    <h2>Edit Team</h2>
                </div>
                <div className={classes.inputWrapper}>
                    <Input 
                        type='text'
                        placeholder='Team name'
                        defaultValue={teamCopy.name}
                        onChange={e => setTeamCopy({...teamCopy, name: e.target.value})}
                    />
                </div>
                <div className={classes.textareaWrapper}>
                    <TextArea 
                        defaultValue={teamCopy.description}
                        onChange={e => setTeamCopy({...teamCopy, description: e.target.value})}
                        placeholder='Description'
                    />
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={updateTeam} disabled={teamCopy.name === ''}>Apply</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditTeamModal;