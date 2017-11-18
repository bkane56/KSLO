import React from 'react';
import axios from 'axios';
import { X_API_KEY, WX_BASE_URL } from '../consatants/metar.constants';

const url = WX_BASE_URL;

export default function getMetarInfo(station, dataType) {
  const wxURL = `${url + station}/decoded`;
  axios.get(wxURL, {
    headers: { 'x-api-key': X_API_KEY },
  }).then(response => response).catch((err) => {
    console.log(err);
  });
}

