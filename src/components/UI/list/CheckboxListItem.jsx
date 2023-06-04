import React, { useState } from 'react';
import { useEffect } from 'react';
import Checkbox from '../checkbox/Checkbox';
import classes from './CheckboxList.module.css';

const CheckboxListItem = ({item, addToList, deleteFromList}) => {
    const [checked, setChecked] = useState(item.checked)
    
    useEffect(() => {
        checked ? addToList(item) : deleteFromList(item)
    }, [checked])

    return (
        <div className={classes.itemWrapper}>
            {item?.name === undefined ? item.familyName + ' ' + item.givenName : item.name}
            <Checkbox checked={checked} setChecked={setChecked}/>
        </div>
    );
};

export default CheckboxListItem;