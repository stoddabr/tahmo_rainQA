import {
  thresholdColors, stationColors,
} from '../../constants/colors'

/**
 * 
 * @param {array} x plotly x axis
 * @param {array} y plotly y axis
 * @param {integer} index station index
 */
function generatePlotlyData(x, y, name, index) {
  return {
    x,
    y,
    name,
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: stationColors[index]},
  }
}

/**
 * 
 * @param {array} x plotly x axis
 * @param {array} y plotly y axis
 * @param {integer} index threshold index 
 */
function generatePlotlyThresholds(x, y, index) {
  return {
    y: [y, y],
    x,
    type: 'scatter',
    mode: 'lines',
    name: 'Threshold',
    marker: {color: thresholdColors[index]},
  }
}

/**
 * 
 * @param {array<object>} datasets array of datasets
 * @param {array<} thresholds array of thresholds
 */
function generatePlotlyChart(datasets, thresholds) {
  const xs = datasets.reduce((acc, val) => acc = [...acc, ...val.x])
  const earliest = Math.min(xs)
  const latest = Math.max(xs)

  return [
    ...datasets.map((data, i) => {
      generatePlotlyData(data.x, data.y, data.name, i)
    }),
    ...thresholds.map((value, i) => 
      generatePlotlyThresholds(value, [earliest, latest], i)
      )
  ]
}

export {
  generatePlotlyData,
  generatePlotlyChart,
}