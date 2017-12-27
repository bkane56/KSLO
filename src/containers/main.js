import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

import { firebaseConstants } from '../consatants';
import { metarActions } from '../actions';
import NavBar from '../components/navBar';
import Header from '../components/header';
import Planner from '../components/planner';
import '../style/App.css';

class Main extends Component {

  componentDidMount() {
    const station = 'KSLO';
    const dataType = 'METAR';
    this.props.getMetarData(station, dataType);
  }

  render() {
    const { flightCategory } = this.props;
    return (
      <div className="App">
        <NavBar />
        <Header
          flightCategory={flightCategory}
        />
        <Planner />
      </div>

    );
  }
}

function mapStateToProps(state) {
  const flightCategory = state.metar.data[0].flight_category;
  return { flightCategory };
}

function mapDispatchToProps(dispatch) {
  const { getMetarData } = metarActions;
  return bindActionCreators({ getMetarData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
