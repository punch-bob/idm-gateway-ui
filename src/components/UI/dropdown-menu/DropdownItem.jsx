import React, { useState, useEffect } from 'react';
import Checkbox from '../checkbox/Checkbox';
import classes from './DropdownMenu.module.css';

const DropdownItem = ({item, update, tid}) => {
    const [checked, setChecked] = useState(item.checked)

    useEffect(() => {
        update(tid, {...item, checked: checked})
    }, [checked])

    return (
        <li className={classes.dropdownItem}>
            <span>{item?.name === undefined ? item.familyName + ' ' + item.givenName : item.name}</span><Checkbox checked={checked} setChecked={setChecked}/>
        </li>
    );
};

export default DropdownItem;