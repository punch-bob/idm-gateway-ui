import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './UserList.module.css'

const TeamListItem = ({team, active}) => {
    const navigate = useNavigate()

    const changeTeam = () => {
        navigate('/team/' + team.oid)
    }

    return (
        <div className={active ? `${classes.userListItem} ${classes.active}` : classes.userListItem} onClick={changeTeam}>
            {team.name}
        </div>
    );
};

export default TeamListItem;