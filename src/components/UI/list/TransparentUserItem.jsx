import React from 'react';
import Icon from "react-icons-kit";
import {trash2} from 'react-icons-kit/feather/trash2';
import { useNavigate } from 'react-router-dom';
import classes from './TransparentTeamList.module.css';

const TransparentUserItem = ({user, setDeleteUser, setDeleteUserModal}) => {
    const navigate = useNavigate()

    const changeUser = () => {
        navigate('/user/' + user.id)
    }

    return (
        <div className={classes.itemWrapper}>
            <span className={classes.user} onClick={changeUser}>{`${user.familyName} ${user.givenName}`}</span>
            <Icon 
                className={classes.deleteIcon} 
                icon={trash2}
                onClick={() => {
                    console.log('click')
                    setDeleteUserModal(true)
                    setDeleteUser(user)
                }}
            />
        </div>
    );
};

export default TransparentUserItem;