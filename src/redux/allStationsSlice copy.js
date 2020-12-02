import { createSlice } from '@reduxjs/toolkit';
// wheat is create slice? https://redux-toolkit.js.org/api/createSlice 


const initialState = {
  stations: [],
  highlightedStationKey: -1,
}

export const allStationsSlice = createSlice({
  name: 'allStations',
  initialState,
  reducers: {
    clearStationData: state => {
      state.stations = initialState.stations;
    },
    setStationData: (state, action) => {
      state.stations = parseStationData(action.payload);
    },
    clearHighlightedStation: state => {
      state.highlightedStationKey = initialState.highlightedStationKey;
    },
    setHighlightedStation: (state, action) => {
      state.highlightedStationKey = action.payload;
    },
  },
});

export const { 
  clearStationData, setStationData, 
  clearHighlightedStation, setHighlightedStation,  
} = allStationsSlice.actions;

// for testing
const fakeLat = ()=> Math.random()*15+5; 
const fakeLon = ()=> Math.random()*40-5; 
const numFakes = 10
const fakeStations = []
const genNeighborData = (key) => ({
  key: key,
  name: fakeStations[key].name,
  gps: fakeStations[key].gps,
  weight: Math.floor(Math.random()*10+1),
})
for(var i = 1; i <= numFakes; i++) {
  const classification = Math.random();

  let neighbors = false;
  if (i > 3) {
    const neightbor1Id = Math.max(0,Math.floor(Math.random()*i-1));
    const neightbor2Id = Math.max(0,Math.floor(Math.random()*i-1));
    console.log({i,neightbor1Id, neightbor2Id, fakeStations});
    neighbors = [genNeighborData(neightbor1Id)];
    if (neightbor1Id !== neightbor2Id) {
      neighbors.push(genNeighborData(neightbor2Id));
    }
  }

  const station = {
    classification,
    neighbors: neighbors || [],
    key: i,
    name: `Example ${i}`,
    gps: [fakeLat(), fakeLon()],
    isFlagged: Math.random() > 0.8,
  };
  fakeStations.push(station)
};
console.log('asdf', {fakeStations}, JSON.stringify(fakeStations));

/**
 * parses api data to app-usable form
 * see fakeStations construction above for example
 * @TAHMO_TODO 
 * @param {object} apiData 
 * @returns {object} parsed api data in form the app can use, eg fakeStations
 */
function parseStationData(apiData) {
  /**
   * TODO code for parsing database query goes here
   * 
   * @TAHMO_TODO parse api data into datastructure used by app
   * @TAHMO_TODO see how fakeStations is constructed for example
   */
  const appData = apiData
  return appData
}


//The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

/**
 * fetches, parses, then stores list of all stations (both anomalous and otherwise)
 * @TAHMO_TODO replace code in this function with a call to the api
 * @see parseStationData used for parsing from api to datastructure
 * @see dispatch(setStationData(*)) for storing data to the redux store
 * @param {*} amount used for getting proper station information *TBD*
 */ 
export const getStationsData = amount => dispatch => {
  setTimeout(() => {
    console.log('stations set', fakeStations)
    dispatch(setStationData(fakeStations)); // amount
  }, 2000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllStations = state => state.allStations.stations;
export const selectHighlightedStation = state => state.allStations.highlightedStationKey;

export default allStationsSlice.reducer;
