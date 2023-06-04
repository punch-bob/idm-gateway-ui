import React from 'react';
import TransparentTeamItem from './TransparentTeamItem';
import TransparentButton from '../transparent-button/TransparentButton';
import classes from './TransparentTeamList.module.css'

const TransparentTeamList = ({teamList, setOpenModal, setDeleteTeam, setDeleteTeamModal}) => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.listTitle}>Teams:</span>
            <div className={classes.transparentListWrapper}>
                {teamList !== undefined
                ? teamList.map((team) => {
                    return <TransparentTeamItem 
                                team={team} 
                                key={team.id}
                                setDeleteTeam={setDeleteTeam}
                                setDeleteTeamModal={setDeleteTeamModal}
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

export default TransparentTeamList;