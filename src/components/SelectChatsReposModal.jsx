import React, { useState } from 'react';
import Modal from './UI/modal/Modal';
import DropdownMenuList from './UI/list/DropdownMenuList';
import Button from './UI/button/Button';
import Icon from "react-icons-kit";
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft';
import classes from '../styles/SelectChatsReposModal.module.css';

const SelectChatsReposModal = ({active, setActive, setPrevActive, selectedList, id}) => {
    const [teamsObjects, setTeamsObjects] = useState([{
        id: 1,
        name: 'idm-gateway 1',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        },
        {
            id: 3,
            name: 'chat 3',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        },
        {
            id: 2,
            name: 'repo 2',
            checked: true
        }]
    },
    {
        id: 2,
        name: 'ui-kit-team',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        },
        {
            id: 3,
            name: 'chat 3',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        },
        {
            id: 2,
            name: 'repo 2',
            checked: true
        }]
    },
    {
        id: 3,
        name: 'idm-gateway 2',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        },
        {
            id: 3,
            name: 'chat 3',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: false
        }]
    },
    {
        id: 4,
        name: 'idm-gateway 3',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        },
        {
            id: 3,
            name: 'chat 3',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        },
        {
            id: 2,
            name: 'repo 2',
            checked: true
        }]
    },
    {
        id: 5,
        name: 'idm-gateway 4',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        }]
    },
    {
        id: 6,
        name: 'idm-gateway 5',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        },
        {
            id: 2,
            name: 'chat 2',
            checked: false
        },
        {
            id: 3,
            name: 'chat 3',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        },
        {
            id: 2,
            name: 'repo 2',
            checked: true
        }]
    },
    {
        id: 7,
        name: 'idm-gateway 6',
        chats: [{
            id: 1,
            name: 'chat 1',
            checked: true
        }],
        repos: [{
            id: 1,
            name: 'repo 1',
            checked: true
        },
        {
            id: 2,
            name: 'repo 2',
            checked: true
        }]
    }])

    const changeModal = () => {
        setActive(false)
        setPrevActive(true)
    }

    const add = () => {
        //request
        setActive(false)
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <div className={classes.headWrapper}>
                    <Icon 
                        className={classes.backIcon} 
                        size={'32'} 
                        icon={arrowLeft} 
                        onClick={() => changeModal()}
                    />
                    <h2>Select chats and repositories</h2>
                </div>
                <DropdownMenuList list={teamsObjects} setList={setTeamsObjects}/>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={add}>Add</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default SelectChatsReposModal;