import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        
        <li>
          <NavLink to='/businesses/new' exact={true} activeClassName='active'>
           Create a business
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
