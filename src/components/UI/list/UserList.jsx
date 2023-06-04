import React from 'react';
import UserListItem from './UserListItem';
import classes from './UserList.module.css';

const UserList = ({userList, activeId}) => {
    return (
        <div className={classes.userList}>
        {userList.map((user) => 
            <UserListItem user={user} key={user.oid} active={activeId === user.oid}/>
        )}
        </div>
    );
};

export default UserList;