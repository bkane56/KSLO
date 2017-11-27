import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { metarActions } from '../actions';
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
    return (
      <div className="App">
        <Header />
        <Planner />
      </div>

    );
  }
}

function mapStateToProps(state) {

  return {};
}

function mapDispatchToProps(dispatch) {
  const { getMetarData } = metarActions;
  return bindActionCreators({ getMetarData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
