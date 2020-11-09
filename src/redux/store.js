import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import stationReducer from './stationSlice';
import allStationsReducer from './allStationsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    station: stationReducer,
    allStations: allStationsReducer,
  },
});
