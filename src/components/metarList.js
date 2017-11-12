import React from 'react';
import Metar from './metar';

export default function MetarList(props) {

        const listItems = props.data.map((station)=>
            <li key={ station.icao }>
                <Metar metar = { station.raw_text }/>
            </li>
        );
        return (
            <ul id="no-bullet-list">{listItems}</ul>
        );
}
