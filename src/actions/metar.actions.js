import { metarConstants } from '../consatants';
import { metarServices } from '../services';

function getMetarData(station, dataType) {
  return {
    type: metarConstants.FETCH_METAR,
    payload: metarServices.getMetarInfo(station),
  };
}

export const metarActions = {
  getMetarData,
};
