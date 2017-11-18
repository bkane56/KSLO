import React from 'react';
import HeaderMetar from './headerMetar';
import '../style/App.css';

export default function Header(props) {
  const { metar, flightCategory } = props;

  return (
    <div>
      <div className="App-header" >
        <h3>Welcome to KSLO Plane Scheduling Planner</h3>
        <h4>Cessna 172 N4SW</h4>
      </div>
      <HeaderMetar
        metar={metar}
        flightCategory={flightCategory}
      />
    </div>
  );
}
