import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions';
import '../style/navBar.css';

export default function NavBar() {
  return (
    <nav className="navbar navbar-default">
      <div className="continer-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">HOME</Link>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/login">Logout</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
