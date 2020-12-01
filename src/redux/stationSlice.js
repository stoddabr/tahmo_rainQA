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
		console.log('api data', action.payload); 
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
console.log('asdf', {fakeWeatherData}, JSON.stringify(fakeWeatherData))

const environment = 
{
  username: process.env.REACT_APP_TAHMOAPI_USERNAME,
  password: process.env.REACT_APP_TAHMOAPI_PASSWORD
}

let options = {
  method: 'GET',
  //mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  }
}

fetch('http://time.jsontest.com/', options)
.then(response => {
  if (response.ok) {
    response.json().then(json => {
      console.log(json);
    });
  }
});

const all_weather_data = [require("./data/station-TA00061-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00076-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00077-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00388-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00394-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00587-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00589-data-2020-10-14-to-2020-11-15-pr-sums.json"),
require("./data/station-TA00590-data-2020-10-14-to-2020-11-15-pr-sums.json")];
parseWeatherData(all_weather_data);

const weather_data_61 = require("./data/station-TA00061-data-2020-10-14-to-2020-11-15-pr-sums.json");
console.log('weather data: ', {all_weather_data}, JSON.stringify(all_weather_data));

/*
let options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + environment.username + ':' + environment.password
  }
}

fetch('https://datahub.tahmo.org/services/assets/v2/stations', options)
.then(response => {
  if (response.ok) {
    response.json().then(json => {
      console.log(json);
    });
  }
});
*/
/*
.then(response => response.json())
.then((response) => {
  console.log("Hello", response);
}).catch(error => { console.log('request failed', error)});
*/


/*
console.log("This is the data I got!!!", environment.username);
var request = require ('request');
request('https://datahub.tahmo.org/services/assets/v2/stations', 
{
  'auth': {
    'user': environment.username,
    'pass': environment.password,
    'sendImmediately': true
  }
},
function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
*/

//var tahmo_data = request.get('https://datahub.tahmo.org/services/assets/v2/stations').auth(environment.username, environment.password, false);
//console.log("This is the data I got!!!", tahmo_data);//, {tahmo_data}, JSON.stringify(tahmo_data));
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
   //const appData = apiData;
   
   const station_name = [];
   for(var i = 0; i < apiData.length; i++)
   {
		station_name.push(apiData[i].station_name);
   }
   
   const all_daily_vals = [];
   
   const x_daily_vals = [];
   for(var i = 0; i < apiData.length; i++)
   {
	   const daily_vals = [];
	   for (const value in apiData[i].daily_sums)
	   {
		   daily_vals.push(apiData[i].daily_sums[value]);
	   }
	   all_daily_vals.push(daily_vals);
   }
   for (const value in apiData[0].daily_sums)
   {
      x_daily_vals.push(value);
   }
   
   const all_weekly_vals = [];
   const x_weekly_vals = [];
   for(var i = 0; i < apiData.length; i++)
   {
	   const weekly_vals = [];
	   for (const value in apiData[i].weekly_sums)
	   {
		   weekly_vals.push(apiData[i].weekly_sums[value]);
	   }
	   all_weekly_vals.push(weekly_vals);
   }
   for (const value in apiData[0].weekly_sums)
   {
      x_weekly_vals.push(value);
   }
   
   const all_running_vals = [];
   const x_running_vals = [];
   for(var i = 0; i < apiData.length; i++)
   {
	   const running_vals = [];
	   for (const value in apiData[i].running_sums)
	   {
		   running_vals.push(apiData[i].running_sums[value]);
	   }
	   all_running_vals.push(running_vals);
   }
   for (const value in apiData[0].running_sums)
   {
      x_running_vals.push(value);
   }
   
   const appData = {
	"daily": {
		"colors": ['blue', 'green', 'orange'],
		"ys": {
			//[station_name]: daily_vals
		},
		"x": x_daily_vals,
		"threshold": 0
	},
	"weekly": {
		"colors": ['blue', 'green', 'orange'],
		"ys": {
			//[station_name]: weekly_vals
		},
		"x": x_weekly_vals,
		"threshold": 0
	},
	"dm": {
		"colors": ['blue', 'green', 'orange'],
		"ys": {
			//[station_name]: running_vals
		},
		"x": x_running_vals,
		"threshold": 0
	}
   }
   for(var i = 0; i < apiData.length; i++)
   {
       appData.daily.ys[station_name[i]] = all_daily_vals[i];
	   appData.weekly.ys[station_name[i]] = all_weekly_vals[i];
	   appData.dm.ys[station_name[i]] = all_running_vals[i];
   }
   
   
   console.log("app data: ", appData);
  return appData;
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
    dispatch(setWeatherData(all_weather_data));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectStationId = state => state.station.id;
export const selectStationData = state => state.station.data;
export const selectChartType = state => state.station.chartType;

export default stationSlice.reducer;

