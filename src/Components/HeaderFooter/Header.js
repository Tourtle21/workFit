import React from 'react';

const Header = (props) => (
    <header>
        <h1 id='logo'>workFit &#x2713;</h1>
        <nav className='head-nav'>
            <span className={`nav-item ${props.displayType === 1 ? 'nav-item-active' : null}`}>View</span>
            <span className={`nav-item ${props.displayType === 2 ? 'nav-item-active' : null}`}>Edit</span>
            <span onClick={props.newWorkoutFn} className={`nav-item ${props.displayType === 3 ? 'nav-item-active' : null}`}>New</span>
        </nav>
    </header>
);

export default Header;