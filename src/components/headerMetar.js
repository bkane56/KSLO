import React from 'react';
import '../style/metar.css';

export default function HeaderMetar(props) {
  return (
    <div className="checkwx-container">
      <div className="checkwx-item">
        <p >{ props.metar }</p>
        <p>{ props.flightCategory }</p>
      </div>
    </div>
  );
}
