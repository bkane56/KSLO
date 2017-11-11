import React from 'react';
import HeaderMetar from './headerMetar'
import '../style/App.css';

export default function Header(props) {
    const imageUrl = null;

    function getUrl(props) {
        const baseUrl = getBaseUrl();
        return `I:\\kslo\\src\\resources\\${ props.flight_category}.jpg`;
    }

    function getBaseUrl() {
        if (typeof window !== 'undefined') {
            return location.protocol + '//' + location.host;
        } else {
            return "I:\\kslo\\src\\resources\\";
        }
    }

    const className = `App-header .${props.flight_category}`;

    return(
        <div>
            <div className= { className }>
                <h5>Welcome to KSLO Plane Scheduling Planner</h5>
                <h6>Cessna 172 N4SW</h6>
            </div>
            <HeaderMetar
                metar= { props.metar }
                flightCategory= { props.flightCategory }
            />
        </div>
    )
    
}