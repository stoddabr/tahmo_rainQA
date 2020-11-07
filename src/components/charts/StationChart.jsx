/**
 * plot.ly open source javascript library
 * https://github.com/plotly/react-plotly.js#state-management
 * https://images.plot.ly/plotly-documentation/images/plotly_js_cheat_sheet.pdf
 */
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory';
import generatePlotlyChart from './configStationChart'
import {
  getWeatherData, // thunk
  selectStationData,
} from '../../redux/stationSlice';

const Plot = createPlotlyComponent(Plotly);

const testData = {
   x : [1,2,3,4,5,6,7],
   y : [2,4,25,2,3,5,1],
   threshold : 4
}

function StationChart() {
  const [hovering, setHovering] = useState(false)
  // TODO get from redux
  const datasets = []
  const thresholds = []

  const {x={}, y={}, threshold=-999} = useSelector(selectStationData) || testData;
  const dispatch = useDispatch();

  useEffect(()=>{
    if (threshold === -999) { // sentinal value
      dispatch(getWeatherData(testData))
    }
  },[])

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'blue'},
        },
        {
          y: [threshold, threshold],
          x: [x[0], x[x.length-1]],
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'red'},
        }
      ]}
      layout={{title: 'Rain Data: Monthly'}}
      config={{displaylogo: false}}
      onHover={()=>setHovering(true)}
      onUnhover={()=>setHovering(false)}
    />
  );
}

export default StationChart;