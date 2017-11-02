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
        debugger;
        const dataType = "METAR";
        console.log("in CDM" + getMetarData(station, dataType));
        this.props.getMetarData(station, dataType)
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
                <div>
                    { this.props.metarList }
                </div>
                {/*<MetarSearchBar*/}
                {/*/>*/}
            </div>
        );
    }
}

function mapStateToProps(state) {
    debugger;
     const metarList = state.metar.data;
    return  { metarList };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getMetarData }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(MetarPanel);