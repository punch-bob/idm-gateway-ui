import React, { useMemo, useState } from 'react';
import Modal from './UI/modal/Modal';
import Input from './UI/input/Input';
import CheckboxList from './UI/list/CheckboxList';
import Button from './UI/button/Button';
import classes from '../styles/SelectTeamsModal.module.css';
import { useEffect } from 'react';

const SelectModal = ({active, setActive, setNextActive, withCreate, setCreateActive, selectedList, setSelectedList, title}) => {
    const [searchValue, setSearchValue] = useState('')

    const addToSelectedList = obj => {
        setSelectedList([...selectedList, obj])
        let copy = list.map(l => {
            if (l.id === obj.id) {
                return ({...l, checked: true})
            } else {
                return l
            }
        })
        setList(copy)
    }

    const deleteFromSelectedList = obj => {
        setSelectedList(selectedList.filter(l => l.id !== obj.id))
        let copy = list.map(l => {
            if (l.id === obj.id) {
                return ({...l, checked: false})
            } else {
                return l
            }
        })
        setList(copy)
    }

    const changeModal = () => {
        if (setNextActive === undefined) {
            //request
            setActive(false)
        } else {
            setActive(false)
            setNextActive(true)
        }
    }

    const changeOnCreate = () => {
        setActive(false)
        setCreateActive(true);
    }

    const [list, setList] = useState([{
            id: 1,
            name: 'idm-gateway 1'
        },
        {
            id: 2,
            familyName: 'Рыбалко',
            givenName: 'Константин'
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
        setList(list.map(l => l?.checked !== undefined ? l : ({...l, checked: false})))
    }, [])

    const sortedAndSearchedList = useMemo(() => {
        let sorted = [...list].sort((a, b) => {
            const A = a?.name === undefined ? a.familyName.toUpperCase() : a.name.toUpperCase()  
            const B = b?.name === undefined ? b.familyName.toUpperCase() : b.name.toUpperCase()  

            if (A < B) {
                return -1;
            }
            if (A > B) {
                return 1;
            }

            return 0;
        })
        return sorted.filter(item => {
            const name = item?.name === undefined ? item.familyName.toUpperCase() : item.name.toUpperCase()
            const searchQueryCopy = searchValue.toUpperCase();
            return name.includes(searchQueryCopy)
        })
    }, [list, searchValue, active])

    return (
        <Modal active={active} setActive={setActive}>
            <div className={classes.wrapper}>
                <h2>{'Select ' + title}</h2>
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
                        addToList={addToSelectedList} 
                        deleteFromList={deleteFromSelectedList}
                    />
                </div>
                <div className={classes.buttonsWrapper}>
                    <Button onClick={changeModal} disabled={selectedList.length <= 0}>{setNextActive === undefined ? 'Add' : 'Continue'}</Button>
                    <Button id='cancel' onClick={() => setActive(false)}>Cancel</Button>
                </div>
                {withCreate
                ? <div className={classes.createButton}>
                    <Button id='cancel' onClick={changeOnCreate}>Create</Button>
                </div>
                :<></>}
            </div>
        </Modal>
    );
};

export default SelectModal;