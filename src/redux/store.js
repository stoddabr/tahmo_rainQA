import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import stationReducer from './stationSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    station: stationReducer,
  },
});
