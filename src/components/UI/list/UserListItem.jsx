import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './UserList.module.css'

const UserListItem = ({user, active}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const changeUser = () => {
        let path = location.pathname.split('/')
        path.pop()
        const newPath = path.join('/') + '/' + user.oid
        navigate(newPath)
    }

    return (
        <div className={active ? `${classes.userListItem} ${classes.active}` : classes.userListItem} onClick={changeUser}>
            {`${user.familyName} ${user.givenName}`}
        </div>
    );
};

export default UserListItem;