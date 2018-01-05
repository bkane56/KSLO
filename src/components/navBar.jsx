import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './login/logOut';
import '../style/navBar.css';
import { routesConstants } from '../consatants';


const NavBar = () =>
  (<nav className="navbar navbar-default">
    <div className="continer-fluid">
      <div className="navbar-header">
        <ul className="nav navbar-nav">
          <li><Link to={routesConstants.LOGIN_PAGE}>Login</Link></li>
          <li><Link to={routesConstants.LANDING}>Landing</Link></li>
          <li><Link to={routesConstants.MAIN}>Home</Link></li>
          <li><Link to={routesConstants.ACCOUNT}>Account</Link></li>
          <li><Link to={routesConstants.REGISTER_PAGE}>Register</Link></li>
          <li><SignOutButton /></li>
        </ul>
      </div>
    </div>
  </nav>);

export default NavBar;
