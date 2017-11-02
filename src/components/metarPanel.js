import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { getMetarData  } from '../actions/metarActions'
import MetarSearchBar from './metarSearchBar';

class MetarPanel extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        // this.state = { searchTerm: '', searchResult: ''};
    }

    componentDidMount() {
        const station = "KSTL,KBLV";
        const dataType = "METAR";
        console.log("in CDM" + getMetarData(station, dataType));
        getMetarData(station, dataType)
    }

    onSearchChange(event){
        // this.setState({searchTerm: event.target.value})
    }

    onFormSubmit(event){
        event.preventDefault();
        // this.setState({ searchTerm: '', searchResult: this.state.searchTerm, station: this.state.searchTerm});

    }

    render() {


        return(
            <div>
                <p>BOB</p>
                { this.props.metarText }
                {/*<MetarSearchBar*/}
                {/*/>*/}
            </div>
        );
    }
}

function mapStateToProps(metar) {
    const metarText = metar.data;
    console.log("MSTP - metarText: " + metarText);
    return  { metarText };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMetarData }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(MetarPanel);