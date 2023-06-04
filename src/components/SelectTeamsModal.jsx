import React, { useMemo, useState } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import CheckboxList from './UI/list/CheckboxList';
import Button from './UI/button/Button';
import classes from '../styles/SelectTeamsModal.module.css';
import { useEffect } from 'react';

const SelectTeamsModal = ({active, setActive, setNextActive, withCreate, selectedTeams, setSelectedTeams}) => {
    const [searchValue, setSearchValue] = useState('')

    const addToSelectedTeams = team => {
        setSelectedTeams([...selectedTeams, team])
        let teamsCopy = teams.map(t => {
            if (t.id === team.id) {
                return ({...t, checked: true})
            } else {
                return t
            }
        })
        setTeams(teamsCopy)
    }

    const deleteFromSelectedTeams = team => {
        setSelectedTeams(selectedTeams.filter(t => t.id !== team.id))
        let teamsCopy = teams.map(t => {
            if (t.id === team.id) {
                return ({...t, checked: false})
            } else {
                return t
            }
        })
        setTeams(teamsCopy)
    }

    const changeModal = () => {
        setActive(false)
        setNextActive(true);
    }

    const [teams, setTeams] = useState([{
            id: 1,
            name: 'idm-gateway 1'
        },
        {
            id: 2,
            name: 'ui-kit-team'
        },
        {
            id: 3,
            name: 'idm-gateway 2'
        },
        {
            id: 4,
            name: 'idm-gateway 3'
        },
        {
            id: 5,
            name: 'idm-gateway 4'
        },
        {
            id: 6,
            name: 'idm-gateway 5'
        },
        {
            id: 7,
            name: 'idm-gateway 6'
        },
        {
            id: 8,
            name: 'idm-gateway 7'
        },
    ])

    // useEffect(() => {
    //     setTeams(teams.map(team => {return ({...team, checked: false})}))
    //     setSelectedTeams([])
    // }, [active])

    useEffect(() => {
        setTeams(teams.map(team => team?.checked !== undefined ? team : ({...team, checked: false})))
    }, [])

    const sortedAndSearchedList = useMemo(() => {
        let sorted = [...teams].sort((a, b) => {
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
        return sorted.filter(item => {
            const name = item.name.toUpperCase();
            const searchQueryCopy = searchValue.toUpperCase();
            return name.includes(searchQueryCopy)
        })
    }, [teams, searchValue, active])

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <h2>Select teams</h2>
                <div className={classes.searchWrapper}>
                    <Input 
                        type='search'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder='Search ...'
                    />
                </div>
                <div className={classes.listWrapper}>
                    <CheckboxList 
                        list={sortedAndSearchedList} 
                        addToList={addToSelectedTeams} 
                        deleteFromList={deleteFromSelectedTeams}
                    />
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={() => changeModal()} disabled={selectedTeams.length <= 0}>Continue</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
                {withCreate
                ? <div className={classes.createButton}>
                    <Button id='cancel'>Create</Button>
                </div>
                :<></>}
            </div>
        </Modal>
    );
};

export default SelectTeamsModal;