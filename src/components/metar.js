import React from 'react';
import '../style/metar.css';
import '../style/App.css';

export default function Metar(props) {

    const metar = props.metar;
    return (
        <div>
            <p className="App-intro">
                <div className="checkwx-container">{ metar}</div>
            </p>
        </div>
    );
}