import { createSlice } from '@reduxjs/toolkit';
// wheat is create slice? https://redux-toolkit.js.org/api/createSlice 


const initialState = {
  id: false,
  data: false,
  chartType: 'daily',
}
export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setStationId: (state, action) => {
      state.id = action.payload;
      state.data = false;
    },
    clearStation: state => {
      state.id = initialState.id;
      state.data = initialState.data;
      state.chartType = initialState.chartType;
    },
    setWeatherData: (state, action) => {
      state.data = parseWeatherData(action.payload);
    },
    selectChart: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { setStationId, clearStation, setWeatherData, selectChart } = stationSlice.actions;

// for testing
const num = 40;
const generateFakeData = (max) => Array.from(
  {length: num},
  () => Math.floor(Math.random() * max)
);
const generateFakeDM = (slope) => {
  let sum = 0;
  return Array.from(
    {length: num},
    () => {
      const delta = Math.random() * 5 * slope + 5
      sum = sum + delta;
      return sum
    }
  );
};
const startingTime = 0;
const msInDay =  86400000;
const msInWeek = 604800000;
const colors = ['blue', 'green', 'orange'];
const fakeWeatherData = {
  daily: {
    colors,
    ys: {
      exampleA: generateFakeData(10),
      exampleB: generateFakeData(4),
      exampleC: generateFakeData(8)
    },
    x: Array.from({length: num}, (v, i) => new Date(startingTime+msInDay*i)),
    threshold : 7,
  },
  weekly: {
    colors,
    ys: {
      exampleA: generateFakeData(10),
      exampleB: generateFakeData(4),
      exampleC: generateFakeData(8)
    },
    x: Array.from({length: num}, (v, i) => new Date(startingTime+msInWeek*i)),
    threshold : 8,
  },
  dm: {
    colors,
    ys: {
      exampleA: generateFakeDM(1.1),
      exampleB: generateFakeDM(0.9),
      exampleC: generateFakeDM(1.4)
    },
    x: Array.from({length: num}, (v, i) => new Date(startingTime+msInWeek*i)),
  },
}

/**
 * parses api data to app-usable form
 * see fakeWeatherData construction above for example
 * @TAHMO_TODO 
 * @param {object} apiData 
 * @returns {object} parsed api data in form the app can use, eg fakeWeatherData
 */
function parseWeatherData(apiData) {
  /**
   * TODO code for parsing database query goes here
   * 
   * @TAHMO_TODO parse api data into datastructure used by app
   * @TAHMO_TODO see how fakeStations is constructed for example
   */
  const appData = apiData
  return appData
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

/**
 * fetches, parses, then stores weather data for a station and it's neighbors
 * @TAHMO_TODO replace code in this function with a call to the api
 * @see parseWeatherData used for parsing from api to datastructure
 * @see dispatch(setStationData(*)) for storing data to the redux store
 * @param {*} amount used for getting proper station information *TBD*
 */
export const getWeatherData = amount => dispatch => {
  setTimeout(() => {
    dispatch(setWeatherData(fakeWeatherData));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStationId = state => state.station.id;
export const selectStationData = state => state.station.data;
export const selectChartType = state => state.station.chartType;

export default stationSlice.reducer;
