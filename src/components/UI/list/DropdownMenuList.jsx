import React from 'react';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import classes from './DropdownMenuList.module.css';

const DropdownMenuList = ({list, setList}) => {
    const updateChats = (tid, item) => {
        let copy = list.map(l => {
            if (l.id === tid) {
                return {...l, chats: l.chats.map(c => {
                    if (c.id === item.id) {
                        return {...c, checked: item.checked}
                    } else {
                        return c
                    }
                })}
            } else {
                return l
            }
        })

        setList(copy)
    }

    const updateRepos = (id, item) => {
        let copy = list.map(l => {
            if (l.id === id) {
                return {...l, repos: l.repos.map(r => {
                    if (r.id === item.id) {
                        return {...r, checked: item.checked}
                    } else {
                        return r
                    }
                })}
            } else {
                return l
            }
        })

        setList(copy)
    }

    return (
        <div className={classes.wrapper}>
            {list
            ? list.map(item => {
                return <div key={item.id} className={classes.itemWrapper}>
                            {item?.name === undefined ? item.familyName + ' ' + item.givenName : item.name}
                            <div className={classes.listsWrapper}>
                                <DropdownMenu title='chats' itemList={item.chats} id={item.id} update={updateChats}/>
                                <DropdownMenu title='repositories' itemList={item.repos} tid={item.id} update={updateRepos}/>
                            </div>
                            
                       </div>
            })
            : null}
        </div>
    );
};

export default DropdownMenuList;