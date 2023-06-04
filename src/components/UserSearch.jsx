import React, { useMemo, useState } from 'react';
import Input from './UI/input/Input';
import UserList from './UI/list/UserList';
import TransparentButton from './UI/transparent-button/TransparentButton';
import classes from '../styles/UserSearch.module.css';

const UserSearch = ({usersList, activeId, setActive}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const sortedAndSearchedList = useMemo(() => {
        let sortedUsers = [...usersList].sort((a, b) => {
            const A = a.familyName.toUpperCase();
            const B = b.familyName.toUpperCase();

            if (A < B) {
                return -1;
            }
            if (A > B) {
                return 1;
            }

            return 0;
        })
        return sortedUsers.filter(user => {
            const first_name = user.givenName.toUpperCase();
            const last_name = user.familyName.toUpperCase();
            const searchQueryCopy = searchQuery.toUpperCase();
            return first_name.includes(searchQueryCopy) || last_name.includes(searchQueryCopy)
        })
    }, [usersList, searchQuery])

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <Input 
                    type='search'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}/>
            </div>
            <UserList userList={sortedAndSearchedList} activeId={activeId}/>
            <TransparentButton className={classes.createNewButton} onClick={() => setActive(true)}>Create new</TransparentButton>
        </div>
    );
};

export default UserSearch;