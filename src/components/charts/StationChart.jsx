/**
 * plot.ly open source javascript library
 * https://github.com/plotly/react-plotly.js#state-management
 * https://images.plot.ly/plotly-documentation/images/plotly_js_cheat_sheet.pdf
 */
import React from 'react';
import Plot from 'react-plotly.js';
import generatePlotlyChart from './configStationChart'

function StationChart() {
  // TODO get from redux
  return (
    <Plot
      data={generatePlotlyChart(datasets, thresholds)}
      layout={{autosize: true, title: 'Station X'}}
    />
  );
}

export default StationChart;