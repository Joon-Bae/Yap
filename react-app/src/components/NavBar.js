import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import yelpLogoNav1 from '../Images/yelp-logo-5.png'
import './NavBar.css'


const NavBar = () => {
  return (
    <div className='nav-bar-container' >
      <div className='inner-nav-container'>
        <div className="nav-logo">
          <NavLink className='home-link' exact to='/home'>
            <img className="home-logo" src={yelpLogoNav1} />
          </NavLink>
        </div>
      </div>
      <div className='nav-bar-right-buttons'>
          <NavLink to='/businesses/new' exact={true} activeClassName='active'>
          <p className='create-a-business' >Create a Business</p>
        </NavLink>
        <LogoutButton />
      </div>
    </div>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/home' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>

    //     <li>
    //       <NavLink to='/businesses/new' exact={true} activeClassName='active'>
    //        Create a business
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
