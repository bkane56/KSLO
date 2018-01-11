import { metarConstants } from '../consatants';

const defaultMetarState = {
  isPending: false,
  isFulfilled: false,
  isError: false,
  results: null,
  data: [
    {
      icao: '',
      name: '',
      observed: '',
      raw_text: '',
      barometer: {
        hg: '',
        kpa: null,
        mb: null,
      },
      ceiling_code: '',
      ceiling_ft_agl: null,
      ceiling_meters_agl: null,
      ceiling_text: '',
      clouds: [
        {
          cloud_base_ft_agl: null,
          cloud_base_meters_agl: null,
          cloud_code: '',
          cloud_text: '',
        },
      ],
      dewpoint: {
        celsius: null,
        fahrenheit: null,
      },
      elevation: {
        feet: null,
        meters: null,
      },
      flight_category: '',
      humidity_percent: null,
      temperature: {
        celsius: null,
        fahrenheit: null,
      },
      visibility: {
        miles: '',
        meters: '',
      },
      wind: {
        degrees: null,
        speed_kt: null,
        speed_mph: null,
        speed_mps: null,
        gust_kts: null,
        gust_mph: null,
        gust_mps: null,
      },
    },
  ],
};

export default function metar(state = defaultMetarState, action) {
  switch (action.type) {
    case metarConstants.FETCH_METAR_PENDING:
      return {
        ...state,
        isFulfilled: false,
        isPending: true,
      };

    case metarConstants.FETCH_METAR_FULFILLED:
      console.log('Metar data: ', action.payload.data.data)

      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        data: action.payload.data.data,
      };


    case metarConstants.UPDATE_METAR:
      return action.payload.data;

    default:
      return state;
  }
}
