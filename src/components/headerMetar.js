import React from 'react';
import '../style/metar.css';

export default function HeaderMetar(props) {
  const { metarRawText, flightCategory, densityAlt} = props;
  const altitude = `DENSITY ALTITUDE :  ${densityAlt}`
  return (
    <div className="checkwx-container">
      <div className="checkwx-item">
        <p >{ metarRawText }</p>
        <p>{ flightCategory }</p>
        <p>{ altitude }</p>
      </div>
    </div>
  );
}
