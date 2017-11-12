import axios from 'axios';
export const UPDATE_METAR = 'UPDATE_METAR';
export const FETCH_METAR = 'FETCH_METAR';
import { X_API_KEY, WX_METAR_URL } from '../utils/constants'


export function getMetarData(station, dataType) {
    const wxURL = WX_METAR_URL + station + '/decoded';
    return {
        type: FETCH_METAR,
        payload: axios.get(wxURL, {
            headers: {"x-api-key":X_API_KEY}
        })
    };
}
