/**
 * plot.ly open source javascript library
 * https://github.com/plotly/react-plotly.js#state-management
 */
import React from 'react';
import Plotly from 'plotly.js-basic-dist'
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

function PlotlyLine() {
  const x = [1,2,3,4,5,6,7]
  const y = [2,4,25,2,3,5,1]
  const threshold = 4
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
      layout={{autosize: true, title: 'A Fancy Plot'}}
    />
  );
}

export default PlotlyLine;