import React from 'react';

export default function MetarSearchBar(props) {

        return(
            <div>
                <form onSubmit={props.onFormSubmit(event)} className="input-group">
                    <input
                        placeholder="Enter A Different Station"
                        className="form-control"
                        value={props.searchTerm}
                        onChange={props.onSearchChange(event)}/>
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Search</button>
                    </span>
                </form>
                <br/>
                <h4 >These Are The Results Of A Search For '{props.searchResult} '</h4>
            </div>
        );


}
