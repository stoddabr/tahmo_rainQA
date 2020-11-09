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
  selectChartType,
} from '../../redux/stationSlice';

const Plot = createPlotlyComponent(Plotly);

function StationChart() {
  const [hovering, setHovering] = useState(false)
  const [datasets, setDatasets] = useState([])
  
  const weatherData = useSelector(selectStationData);
  const selectedPlot = useSelector(selectChartType);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getWeatherData())
  },[])

  function parseDataToPlots(data) {
    const {x, ys, threshold, colors} = data
    console.log('xs or y is not defined in data', data)

    if (x && ys) {
      const plots = []
      Object.keys(ys).forEach((yKey, i) => {
        plots.push({
          x,
          y: ys[yKey],
          name: yKey,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: colors ? colors[i] : 'red'},
        })
      })
      if (threshold) {
        plots.push(        {
          y: [threshold, threshold],
          x: [x[0], x[x.length-1]],
          name: 'Threshold',
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'red'},
        })
      }
      return plots
    }
    console.log('xs or y is not defined in data', data)
  }
  useEffect(()=> {
    if (weatherData && weatherData[selectedPlot])
      setDatasets(
        parseDataToPlots(weatherData[selectedPlot])
      )
  },[weatherData, selectedPlot])

  return (
    <>
      {datasets.length > 0 ? 
        <Plot
          data={datasets}
          layout={{title: `Rain Data: ${selectedPlot}`}}
          config={{displaylogo: false}}
          onHover={()=>setHovering(true)}
          onUnhover={()=>setHovering(false)}
        />
        : <p>No data</p>
      }
    </>
  );
}

export default StationChart;