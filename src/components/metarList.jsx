import React from 'react';
import Metar from './metar';

export default function MetarList(props) {
  const listData = props.data;
  const listItems = listData.map(station =>
    (
      <li key={station.icao}>
        <Metar metar={station.raw_text} />
      </li>));
  return (
    <ul id="no-bullet-list">{listItems}</ul>
  );
}
