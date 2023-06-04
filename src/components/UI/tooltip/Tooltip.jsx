import React, { useState } from 'react'
import './Tooltip.css'

const Tooltip = (props) => {
    const [active, setActive] = useState(props.active)

    return (
        <div
            className="Tooltip-Wrapper"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            {props.children}
            {active || (props.isInput && props.active) 
                ? (<div className={`Tooltip-Tip ${props.direction || "top"}`}>
                        {props.content}
                    </div>)
                : <div></div> 
            }
        </div>
    );
};

export default Tooltip;