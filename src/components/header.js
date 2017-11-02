import React from 'react';
import logo from '../logo.svg';
import '../style/App.css';

export default function Header() {
    return(
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h6>Welcome to KSLO Plane Scheduling Planner</h6>
        </div>
    )
    
}