import React, { useState } from 'react';
import DropdownItem from './DropdownItem';
import Icon from "react-icons-kit";
import {chevronRight} from 'react-icons-kit/feather/chevronRight';
import classes from './DropdownMenu.module.css';

const DropdownMenu = ({itemList, title, tid, update}) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div 
                className={classes.titleWrapper}
                onClick={() => setOpen(!open)}
            >
                <Icon className={open ? `${classes.titleIcon} ${classes.active}` : classes.titleIcon} icon={chevronRight}/>
                <span className={classes.title}>{title}</span>
            </div>
            <ul className={open ? `${classes.dropdownMenu} ${classes.active}` : classes.dropdownMenu}>
                {itemList.map((item, index) => {
                    return <DropdownItem item={item} key={index} update={update} tid={tid}/> 
                })}
            </ul>
        </div>
    );
};

export default DropdownMenu;