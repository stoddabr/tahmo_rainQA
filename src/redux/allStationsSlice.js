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
//for testing
const map_data = require('./anomaly_list.json');
console.log("check anaomaly_list");
console.log("num values: ", map_data[0].id, map_data[0].date, map_data[1].station_id);
console.log("the length of struct ", map_data.length);
const get_station = [];
const numStation = map_data.length;
// add neighbors
const genNeighborData = (id) => ({
  id: map_data[id].station_id,
  name: map_data[id].station_name,
  gps: [map_data[id].station_latitude, map_data[id].station_longitude],
  weight: Math.floor(Math.random()*10+1),
})
for(var i=0; i<numStation; i++){
  var station_name = map_data[i].station_name;
  var station_id = map_data[i].station_id;
  var classification = map_data[i].scoring_response.results[0].score;
 
  const num_neightbor = map_data[i].scoring_response.neighbors.length;
  const neighbors_set = [];
  var neighbors = [];
  // add neighbors
  for(var j =0; j< num_neightbor; j++){
    // using list to remeber which station is neighbor
    neighbors_set.push(map_data[i].scoring_response.neighbors[j]);
    var neighbor = map_data[i].scoring_response.neighbors[j];
    var k=0;
    console.log("map station_id ", map_data[0].station_id);
    for(var next=0; next<map_data.length; next++){
      if(map_data[next].station_id == map_data[i].scoring_response.neighbors[j]){
        console.log("print next value", next);
        neighbors.push(genNeighborData(next));
        break;
      }
    }
  }
  var local_station_lat = map_data[i].station_latitude;
  var local_station_lon = map_data[i].station_longitude;
  var check_flag = map_data[i].scoring_response.results.qc_flag;
  var description = map_data[i].description;
  const station = {
    classification: classification,
    neighbors: neighbors || [],
    name: station_name,
    key: station_id,
    gps: [local_station_lat, local_station_lon], 
    isFlagged: classification > 1000,  // check_flag,
    description: description,
  };
  get_station.push(station)
};
console.log('check station info',{get_station},JSON.stringify(get_station));
// const fakeLat = ()=> Math.random()*15+5; 
// const fakeLon = ()=> Math.random()*40-5; 
// const numFakes = 10
// const fakeStations = []
// const genNeighborData = (key) => ({
//   key: key,
//   name: fakeStations[key].name,
//   gps: fakeStations[key].gps,
//   weight: Math.floor(Math.random()*10+1),
// })
// for(var i = 1; i <= numFakes; i++) {
//   const classification = Math.random();
//   let neighbors = false;
//   if (i > 3) {
//     const neightbor1Id = Math.max(0,Math.floor(Math.random()*i-1));
//     const neightbor2Id = Math.max(0,Math.floor(Math.random()*i-1));
//     console.log({i,neightbor1Id, neightbor2Id, fakeStations});
//     neighbors = [genNeighborData(neightbor1Id)];
//     if (neightbor1Id !== neightbor2Id) {
//       neighbors.push(genNeighborData(neightbor2Id));
//     }
//   }
//   const station = {
//     classification,
//     neighbors: neighbors || [],
//     key: i,
//     name: `Example ${i}`,
//     gps: [fakeLat(), fakeLon()],
//     isFlagged: Math.random() > 0.8,
//   };
//   fakeStations.push(station)
// };
// console.log('asdf', {fakeStations}, JSON.stringify(fakeStations));
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
    //console.log('stations set', fakeStations)
    //dispatch(setStationData(fakeStations)); // amount
    console.log('stations set', get_station)
    dispatch(setStationData(get_station));
  }, 2000);
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllStations = state => state.allStations.stations;
export const selectHighlightedStation = state => state.allStations.highlightedStationKey;
export default allStationsSlice.reducer;