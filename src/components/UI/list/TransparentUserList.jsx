import React from 'react';
import TransparentUserItem from './TransparentUserItem';
import TransparentButton from '../transparent-button/TransparentButton';
import classes from './TransparentTeamList.module.css'

const TransparentUserList = ({userList, setOpenModal, setDeleteUser, setDeleteUserModal}) => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.listTitle}>Members:</span>
            <div className={classes.transparentListWrapper}>
                {userList !== undefined
                ? userList.map((user) => {
                    return <TransparentUserItem 
                                user={user} 
                                key={user.id}
                                setDeleteUser={setDeleteUser}
                                setDeleteUserModal={setDeleteUserModal}
                            />
                })
                : null}
            </div>
            <TransparentButton 
                className={classes.addButton}
                onClick={() => setOpenModal(true)}
            >
                Add
            </TransparentButton>
        </div>
    );
};

export default TransparentUserList;