import React from 'react';
import Icon from "react-icons-kit";
import {tick} from 'react-icons-kit/ikons/tick';
import classes from './Checkbox.module.css';

const Checkbox = ({checked, setChecked}) => {
    return (
        <label className={classes.wrapper}>
            <input 
                type="checkbox" 
                onChange={() => setChecked(!checked)}
            />
            <Icon 
                className={checked ? `${classes.checkbox} ${classes.active}` : classes.checkbox} 
                size={checked ? '100%' : '0'} 
                icon={tick}
            />
        </label>
    );
};

export default Checkbox;