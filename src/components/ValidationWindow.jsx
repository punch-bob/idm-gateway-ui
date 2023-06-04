import React from 'react';
import ValidationString from './ValidationString';

const ValidationWindow = ({valiadtion, matching}) => {
    return (
        <div>
            {!matching
            ? 
            <div className='tracker-box'>
                <ValidationString valid={valiadtion.lower}>At least one lowercase letter</ValidationString>
                <ValidationString valid={valiadtion.upper}>At least one uppercase letter</ValidationString>
                <ValidationString valid={valiadtion.number}>At least one number</ValidationString>
                <ValidationString valid={valiadtion.special}>At least one special character</ValidationString>
                <ValidationString valid={valiadtion.length}>At least 8 characters</ValidationString>
            </div>
            : 
            <div className='tracker-box'>
                <ValidationString valid={valiadtion.match}>Password matches</ValidationString>
            </div>
            }
        </div>
        
    );
};

export default ValidationWindow;