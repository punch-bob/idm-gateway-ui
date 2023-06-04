import React from 'react';
import Icon from 'react-icons-kit';
import {circle_ok} from 'react-icons-kit/ikons/circle_ok'
import {circle} from 'react-icons-kit/ikons/circle'
import '../styles/ValidationWindow.css'

const ValidationString = (props) => {
    return (
        <div className={props.valid ? 'validated' : 'not-validated'}>
            {props.valid 
            ? (
              <span className='list-icon green'>
                <Icon icon={circle_ok}/>  
              </span>
            )
            : (
              <span className='list-icon'>
                <Icon icon={circle}/>  
              </span>
            )}
            {props.children}
          </div>
    );
};

export default ValidationString;