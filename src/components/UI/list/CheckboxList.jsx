import React from 'react';
import CheckboxListItem from './CheckboxListItem';
import classes from './CheckboxList.module.css';

const CheckboxList = ({list, addToList, deleteFromList}) => {
    return (
        <div className={classes.listWrapper}>
            {list
            ? list.map(listItem => {
                return <CheckboxListItem 
                    item={listItem} 
                    key={listItem.id} 
                    addToList={addToList} 
                    deleteFromList={deleteFromList}
                />
            })
            : null}
        </div>
    );
};

export default CheckboxList;