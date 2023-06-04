import React, { useState, useEffect }from 'react';
import Modal from './UI/modal/Modal';
import AccessManageList from './UI/list/AccessManageList';
import Button from './UI/button/Button';
import Icon from "react-icons-kit";
import {gitlab} from 'react-icons-kit/feather/gitlab';
import {link} from 'react-icons-kit/feather/link';
import classes from '../styles/AccessManageModal.module.css';

const AccessManageModal = ({active, setActive, user, title}) => {
    const [list, setList] = useState([
        {
            id: 1,
            name: 'idm-gateway',
            chats: [
                {
                    id: 1,
                    name: 'chat 1',
                    checked: false
                },
                {
                    id: 2,
                    name: 'chat 2',
                    checked: true
                },
                {
                    id: 3,
                    name: 'chat 3',
                    checked: true
                }
            ]
        },
        {
            id: 2,
            name: 'ui-kit-team',
            chats: [
                {
                    id: 1,
                    name: 'chat 1',
                    checked: true
                },
                {
                    id: 3,
                    name: 'chat 3',
                    checked: true
                }]
        },
    ])   

    const [icon, setIcon] = useState(gitlab)

    const [changeKey, setChangeKey] = useState('chats')
    useEffect(() => {
        setChangeKey(title === 'Gitlab' ? 'repos' : 'chats')
        setIcon(title === 'Gitlab' ? gitlab : link)
    }, [active, title])

    const editList = () => {
        let copy = list.map(l => {
            let newl = JSON.parse(JSON.stringify(l).replace(changeKey, 'objects'))
            return newl
        })
        return copy
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    <Icon icon={icon} size={'calc(1.7rem)'}/>
                    <h2>{title}</h2>
                </div>
                
                <div className={classes.userDescription}>
                    <span className={classes.username}>{user.familyName + ' ' + user.givenName + ' ' + user.additionalName}</span> 
                    <span className={classes.userRole}>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;{user.description}</span> 
                </div>
                <h3 style={{marginTop: 'calc(2rem)'}}>Manage access</h3>
                <div className={classes.listWrapper}>
                    <AccessManageList list={editList()} setList={setList}/>
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button>Apply</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AccessManageModal;