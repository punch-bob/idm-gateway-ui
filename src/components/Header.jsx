import React from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Header.css'

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <ul>
                    <li><NavLink className='header-item' to={'/user'}>Users</NavLink></li>
                    <li><NavLink className='header-item' to={'/team'}>Teams</NavLink></li>
                    <li><NavLink className='header-item' to={'/admin'}>Admins</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;