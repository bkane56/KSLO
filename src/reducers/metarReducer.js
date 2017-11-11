import { UPDATE_METAR, FETCH_METAR } from '../actions/metarActions';

const defaultMetarState = {
    "results": null,
    "data": [
        {
            "icao": "",
            "name": "",
            "observed": "",
            "raw_text": "",
            "barometer": {
                "hg": "",
                "kpa": null,
                "mb": null
            },
            "ceiling_code": "",
                "ceiling_ft_agl": null,
                "ceiling_meters_agl": null,
                "ceiling_text": "",
                "clouds": [
                    {
                    "cloud_base_ft_agl": null,
                    "cloud_base_meters_agl": null,
                    "cloud_code": "",
                    "cloud_text": ""
                    }
            ],
            "dewpoint": {
                "celsius": null,
                "fahrenheit": null
            },
            "elevation": {
                "feet": null,
                "meters": null
            },
            "flight_category": "",
            "humidity_percent": null,
            "temperature": {
                "celsius": null,
                "fahrenheit": null
            },
            "visibility": {
                "miles": "",
                "meters": ""
            },
            "wind": {
                "degrees": null,
                "speed_kt": null,
                "speed_mph": null,
                "speed_mps": null,
                "gust_kts": null,
                "gust_mph": null,
                "gust_mps": null
            }
        }    
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
