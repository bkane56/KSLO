import axios from 'axios';
import { metarConstants } from '../consatants';

function getMetarData(station, dataType) {
  const wxURL = `${metarConstants.WX_METAR_URL + station}/decoded`;
  return {
    type: metarConstants.FETCH_METAR,
    payload: axios.get(wxURL, {
      headers: { 'x-api-key': metarConstants.X_API_KEY },
    }),
  };
}
const metarActions = {
  getMetarData,
};

export default metarActions;
