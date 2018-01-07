import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './login/logOut';
import '../style/navBar.css';
import { routesConstants } from '../consatants';


const NavBar = ({ authUser }) =>
  (
    <nav className="navbar navbar-default">
      <div className="continer-fluid">
        <div className="navbar-header">
          { authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
        }
        </div>
      </div>
    </nav>
  );

const NavigationAuth = () =>

  (
    <ul className="nav navbar-nav">
      <li><Link to={routesConstants.LANDING}>Landing</Link></li>
      <li><Link to={routesConstants.MAIN}>Home</Link></li>
      <li><Link to={routesConstants.ACCOUNT}>Account</Link></li>
      <li><SignOutButton /></li>
    </ul>
  );

const NavigationNonAuth = () =>
  (
    <ul className="nav navbar-nav">
      <li><Link to={routesConstants.LOGIN_PAGE}>Login</Link></li>
      <li><Link to={routesConstants.LANDING}>Landing</Link></li>
      <li><SignOutButton /></li>
    </ul>
  );

export default NavBar;
