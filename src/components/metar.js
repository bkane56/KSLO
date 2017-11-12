import React from 'react';
import '../style/metar.css';

export default function Metar(props) {
    return (
        <li className="checkwx-container">{ props.metar}</li>
    );
}