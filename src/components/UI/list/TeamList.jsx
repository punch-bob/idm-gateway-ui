import React from 'react';
import TeamListItem from './TeamListItem';
import classes from './UserList.module.css';

const TeamList = ({teamList, activeId}) => {
    return (
        <div className={classes.userList}>
        {teamList.map((team) => 
            <TeamListItem team={team} key={team.oid} active={activeId === team.oid}/>
        )}
        </div>
    );
};

export default TeamList;