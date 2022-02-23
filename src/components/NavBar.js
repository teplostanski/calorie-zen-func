import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar({onLogout}) {
  return (
    <nav className="menu">
      <NavLink exact className="menu__item" activeClassName="menu__item_active" to="/diary">Дневник</NavLink>
      <NavLink className="menu__item" activeClassName="menu__item_active" to="/tips">Советы</NavLink>
      <a href='#' className='menu__item' onClick={onLogout}>Выйти</a>
    </nav>
  );
}

export default NavBar;