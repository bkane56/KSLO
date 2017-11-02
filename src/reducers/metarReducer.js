import { UPDATE_METAR, FETCH_METAR } from '../actions/metarActions';

const defaultMetarState = {
    "status": "success",
    "data": [
        "KSLO 012155Z AUTO 13005KT 10SM OVC005 08/07 A2986 RMK AO2 T00810070",
        "KMVN 012322Z AUTO 15003KT 3SM BR OVC004 09/09 A2985 RMK AO2"
    ]
};

export default function metarReducer (state = defaultMetarState , action) {
    switch (action.type) {
        case FETCH_METAR:
            return action.payload.data;

        case UPDATE_METAR:
            return action.payload.data;

        default:
            return state;
    }

}
