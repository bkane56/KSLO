import React, {Component} from 'react';
import MetarPanel from '../components/metarPanel';
import Header from '../components/header';
import '../style/App.css';

export default class Main extends Component {

    render() {
        return (
            <div className="App">
                <Header />
                <MetarPanel />
            </div>

        );
    }
}