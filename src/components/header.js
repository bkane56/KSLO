import React from 'react';
import HeaderMetar from './headerMetar';
import '../style/App.css';

export default function Header(props) {
  const imageUrl = null;
  const { metar, flightCategory } = props;

  function getUrl(props) {
    const baseUrl = getBaseUrl();
    return `I:\\kslo\\src\\resources\\${props.flight_category}.jpg`;
  }
  console.log(`stuff in header: ${flightCategory}`);
  function getBaseUrl() {
    if (typeof window !== 'undefined') {
      return `${location.protocol}//${location.host}`;
    }
    return 'I:\\kslo\\src\\resources\\';
  }
  return (
    <div>
      <div className={`${props.flight_category} App-header`} >
        <h5>Welcome to KSLO Plane Scheduling Planner</h5>
        <h6>Cessna 172 N4SW</h6>
      </div>
      <HeaderMetar
        metar={metar}
        flightCategory={flightCategory}
      />
    </div>
  );
}
