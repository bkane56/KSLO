import React, { Component } from 'react';

class MetarSearchBar extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.state = { searchTerm: '', searchResult: '' };
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.setState({ searchTerm: '', searchResult: this.state.searchTerm });
    this.props.fetchAlbumByName(this.state.searchTerm);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Enter Your Search Term"
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.onSearchChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Search</button>
          </span>
        </form>
        <br />
        <h4 >These Are The Results Of A Search For '{this.state.searchResult} '</h4>
      </div>
    );
  }
}


export default MetarSearchBar;
