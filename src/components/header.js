import React from 'react';
import '../style/App.css';
import '../style/calendar.css';

export default function Header(props) {
  const { flightCategory } = props;
  const headerClass = `App-header ${flightCategory}`;

  return (
    <div>
      <div className='App-header' >
        <h3>Welcome to KSLO Plane Scheduling Planner</h3>
        <h4>Cessna 172 N4SW</h4>
      </div>

    </div>
  );
}
