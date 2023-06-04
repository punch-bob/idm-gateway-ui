import React from 'react';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import classes from './AccessManageList.module.css';

const AccessManageList = ({list, setList}) => {
    const update = (tid, item) => {
        let copy = list.map(l => {
            if (l.id === tid) {
                return {...l, objects: l.objects.map(o => {
                    if (o.id === item.id) {
                        return {...o, checked: item.checked}
                    } else {
                        return o
                    }
                })}
            } else {
                return l
            }
        })

        setList(copy)
    }

    return (
        <div className={classes.listWrapper}>
            {!list.includes(undefined)
            ? list.map((item, index) => {
                return <DropdownMenu key={index} title={item.name} tid={item.id} update={update} itemList={item.objects}/>
            })
            : null}
        </div>
    );
};

export default AccessManageList;