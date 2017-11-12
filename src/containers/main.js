import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { getMetarData  } from '../actions/metarActions';
import Header from '../components/header';
import Planner from '../components/Planner';
import '../style/App.css';

class Main extends Component {

    componentDidMount() {
        const station = "KSTL";
        const dataType = "METAR";
        this.props.getMetarData(station, dataType)
    }

    render() {
        const metar = this.props.metar;
        const flightCategory = this.props.flightCategory;
        return (
            <div className="App">
                <Header 
                    metar= { metar }
                    flightCategory= { flightCategory }
                />
                <Planner/>
            </div>

        );
    }
    
}

function mapStateToProps(state) {
    const flightCategory = state.metar.data[0].flight_category;
    const metar = state.metar.data[0].raw_text;
    return  { flightCategory, metar};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMetarData }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Main);