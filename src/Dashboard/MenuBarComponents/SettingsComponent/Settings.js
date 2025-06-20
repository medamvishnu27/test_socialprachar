import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import style from './settings.module.css'

const Settings = () => {
    const [activeLink, setActiveLink] = useState('profile-settings');

    const handleClick = (link) => {
      setActiveLink(link);
    };

    return (
        <div className='container-fluid p-3 mb-4 '>
            <h3 className='mb-3'>Settings</h3>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{borderBottom:'1px solid #cbc0f3'}}>
                <li className="nav-item dashboard-toggle-nav-item" role="presentation">
                    <Link className={`${style.navLink} ${activeLink === 'profile-settings' ? style.active : ''}`}
                        onClick={() => { handleClick('profile-settings') }} to='profile-settings'>Profile</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className={`${style.navLink} ${activeLink === 'password-settings' ? style.active : ''}`}
                        onClick={() => { handleClick('password-settings') }} to='password-settings'>
                            Password
                        </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className={`${style.navLink} ${activeLink === 'socialProfile-settings' ? style.active : ''}`}
                        onClick={() => { handleClick('socialProfile-settings') }} to='socialProfile-settings'>
                            Social Profile
                        </Link>
                </li>
             
            </ul>
            <div className='mt-3 p-2'>
            <Outlet />
            </div>
         
        </div>
    );
};

export default Settings;
