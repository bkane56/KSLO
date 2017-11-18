import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { metarActions } from '../actions';
import MetarList from './metarList';
import MetarSearchBar from './metarSearchBar';

import '../style/App.css';

class MetarPanel extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    // this.state = { searchTerm: '', searchResult: ''};
  }

  componentDidMount() {
    const station = 'KBLV';
    const dataType = 'METAR';
    this.props.getMetarData(station, dataType);
  }

  onSearchChange(event) {
    // this.setState({searchTerm: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    // this.setState({ searchTerm: '', searchResult: this.state.searchTerm,
    // station: this.state.searchTerm});
  }

  render() {
    const { data, metarFlightCategory } = this.props;
    return (
      <div>
        <MetarList data={data} />
        <p>{ metarFlightCategory}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const metarFlightCategory = state.metar.data[0].flight_category;
  const { data } = state.metar.data;
  return { metarFlightCategory, data };
}

function mapDispatchToProps(dispatch) {
  const { getMetarData } = metarActions.getMetarData
  return bindActionCreators({ getMetarData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MetarPanel);
