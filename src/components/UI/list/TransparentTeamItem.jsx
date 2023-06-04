import React from 'react';
import Icon from "react-icons-kit";
import {trash2} from 'react-icons-kit/feather/trash2';
import { useNavigate } from 'react-router-dom';
import classes from './TransparentTeamList.module.css';

const TransparentTeamItem = ({team, setDeleteTeam, setDeleteTeamModal}) => {
    const navigate = useNavigate()

    const changeTeam = () => {
        navigate('/team/' + team.id)
    }

    return (
        <div className={classes.itemWrapper}>
            <span className={classes.user} onClick={changeTeam}>{team.name}</span>
            <Icon 
                className={classes.deleteIcon} 
                icon={trash2}
                onClick={() => {
                    console.log('click')
                    setDeleteTeamModal(true)
                    setDeleteTeam(team)
                }}
            />
        </div>
    );
};

export default TransparentTeamItem;