import React, { useEffect } from 'react';
import classes from './Timer.module.css'

const Timer = ({minutes, setMinutes, seconds, setSeconds}) => {
    useEffect(() => {
        let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                } else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className={classes.wrapper}>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;