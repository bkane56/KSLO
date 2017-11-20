import axios from 'axios';
import { metarConstants } from '../consatants';

export const metarServices = {
  getMetarInfo
};

function getMetarInfo(station, dataType) {
  const wxURL = `${metarConstants.WX_METAR_URL + station}/decoded`;
  return axios.get(wxURL, {
    headers: { 'x-api-key': metarConstants.X_API_KEY },
  });
}

