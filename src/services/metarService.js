import React from 'react';
import axios from 'axios';
import { X_API_KEY, WX_BASE_URL } from '../utils/constants'

let url = WX_BASE_URL;

export default function getMetarInfo(station, dataType) {
    const wxURL = url + 'metar/' +  station;
    console.log("url = " + wxURL);
    axios.get(wxURL, {
        headers: {"x-api-key":X_API_KEY}
    }).then((response) => {
        console.log("Service Response = " + response);
        return response;
    }).catch(err=> {
        console.log(err)
    });

}

