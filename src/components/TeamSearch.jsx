import React, { useMemo, useState } from 'react';
import Input from './UI/input/Input';
import TeamList from './UI/list/TeamList';
import TransparentButton from './UI/transparent-button/TransparentButton';
import classes from '../styles/UserSearch.module.css';

const TeamSearch = ({teamsList, activeId, setActive}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const sortedAndSearchedList = useMemo(() => {
        let sortedTeams = [...teamsList].sort((a, b) => {
            const A = a.name.toUpperCase();
            const B = b.name.toUpperCase();

            if (A < B) {
                return -1;
            }
            if (A > B) {
                return 1;
            }

            return 0;
        })
        return sortedTeams.filter(team => {
            const teamName = team.name.toUpperCase();
            const searchQueryCopy = searchQuery.toUpperCase();
            return teamName.includes(searchQueryCopy)
        })
    }, [teamsList, searchQuery])

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <Input 
                    type='search'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}/>
            </div>
            <TeamList teamList={sortedAndSearchedList} activeId={activeId}/>
            <TransparentButton className={classes.createNewButton} onClick={() => setActive(true)}>Create new</TransparentButton>
        </div>
    );
};

export default TeamSearch;