import React, { useState } from 'react';
import TransparentButton from '../transparent-button/TransparentButton';
import Icon from "react-icons-kit";
import {x} from 'react-icons-kit/feather/x';
import classes from './DragAndDrop.module.css';

const DragAndDrop = ({photo, setPhoto}) => {
    const [drag, setDrag] = useState(false)

    const dragStartHandler = e => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = e => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = e => {
        e.preventDefault()
        setPhoto(URL.createObjectURL(e.dataTransfer.files[0]))
        setDrag(false)
    }

    const onChangeHandler = e => {
        e.preventDefault()
        setPhoto(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div className={classes.wrapper}
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)}
        onDrop={e => onDropHandler(e)}
        >
            {drag
                ? <div className={classes.dndText}>Drop the photo to upload it</div>
                : photo
                    ? <div className={classes.photoWrapper}>
                        <img className={classes.photo} src={photo} alt='user avatar'/>
                        <TransparentButton className={classes.removePhoto} onClick={() => setPhoto()}><Icon icon={x}/></TransparentButton>
                      </div>
                    : <div className={classes.dndText}>
                        {'Drag and drop or '}
                        <label className={classes.fileInput}>
                            <input type="file" accept="image/*" onChange={e => onChangeHandler(e)}/>
                            <span className={classes.fileInputText}>click to upload</span>
                        </label><br />
                        {' a photo from your computer'}
                      </div>
            }
        </div>
    );
};

export default DragAndDrop;