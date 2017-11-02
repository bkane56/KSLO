import getMetarInfo from '../services/metarService';
export const UPDATE_METAR = 'UPDATE_METAR';
export const FETCH_METAR = 'FETCH_METAR';

export function getMetarData(station, dataType) {
    console.log("In Action");
    return {
        type: FETCH_METAR,
        payload: getMetarInfo(station, dataType)
    };
}





