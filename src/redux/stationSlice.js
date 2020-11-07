import { createSlice } from '@reduxjs/toolkit';
// wheat is create slice? https://redux-toolkit.js.org/api/createSlice 

function parseWeatherData(initData) {
  /**
   * TODO code for parsing database query goes here
   */
  return initData
}

export const stationSlice = createSlice({
  name: 'station',
  initialState: {
    id: false,
    data: false,
  },
  reducers: {
    setStationId: (state, action) => {
      state.id = action.payload;
      state.data = false;
    },
    clearStation: state => {
      state.id = false;
      state.data = false;
    },
    setWeatherData: (state, action) => {
      state.data = parseWeatherData(action.data);
    },
  },
});

export const { setStationId, clearStation, setWeatherData } = stationSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getWeatherData = amount => dispatch => {
  setTimeout(() => {
    dispatch(setWeatherData(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStationId = state => state.station.id;
export const selectStationData = state => state.station.data;

export default stationSlice.reducer;
