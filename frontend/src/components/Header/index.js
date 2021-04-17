import React from 'react';
import './styles.css';

import {Link} from 'react-router-dom';

export default function Header() {

    return (
        <header id="main-header">
            <div className="header-container">
                <h3> <Link to="/">Renato Gomes Marcacini</Link></h3>
                <ul>
                    <li> <Link to="/"> Home </Link></li>
                    <li> <Link to="/about"> Sobre </Link></li>
                    <li> <Link to="/login"> Login </Link></li>
                </ul>
            </div>
        </header>
    );
}