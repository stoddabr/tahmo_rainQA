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
  selectStationData, selectChartType, selectStationNeighbors, // selectors
} from '../../redux/stationSlice';
import { selectHighlightedStation } from '../../redux/allStationsSlice'

const Plot = createPlotlyComponent(Plotly);

function StationChart() {
  const [hovering, setHovering] = useState(false)
  const [datasets, setDatasets] = useState([])
  // https://github.com/plotly/react-plotly.js/#state-management 
  const [plotConfig, setPlotConfig] = useState({
    data: [], layout: {title:'Tahmo Data'}, frames: [], config: {displaylogo: false
  }})

  const weatherData = useSelector(selectStationData);
  const stationNeighbors = useSelector(selectStationNeighbors)
  const selectedPlot = useSelector(selectChartType);
  const selectedStation = useSelector(selectHighlightedStation)
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getWeatherData(selectedStation))
  },[selectedStation])

  useEffect(()=>{
    console.log(plotConfig)
    setPlotConfig({...plotConfig, layout: { ...plotConfig.layout, title: `Rain Data: ${selectedPlot}`}})
  }, [selectedPlot])

  function parseDataToPlots(data) {
    const {x, ys, threshold, colors} = data
    console.log('xs or y is not defined in data', data)

    if (x && ys) {
      const plots = []
      Object.keys(ys).forEach((yKey, i) => {
        const stationNeighborIndex = stationNeighbors.findIndex(
          el => el.id === yKey  // find index of element with same id/key as data
        )
        if (stationNeighborIndex !== -1) {
          plots.push({
            x,
            y: ys[yKey],
            name: yKey,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: colors ? colors[i] : 'red'},
          })
        }
      })
      if (threshold) {
        plots.push(        {
          y: [threshold, threshold],
          x: [x[0], x[x.length-1]],
          name: 'Threshold',
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'black'},
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
          onHover={()=>setHovering(true)}
          onUnhover={()=>setHovering(false)}
          layout={plotConfig.layout}
          frames={plotConfig.frames}
          config={plotConfig.config}
          onInitialized={(figure) => setPlotConfig(figure)}
          onUpdate={(figure) => setPlotConfig(figure)}
        />
        : 
        <div style={{width:'40vw', textAlign:'center'}}>
          <p>Loading Data...</p>
        </div>
      }
    </>
  );
}

export default StationChart;