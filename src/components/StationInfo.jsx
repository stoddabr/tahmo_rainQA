import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearStation,selectStationId, selectChart, selectStationData, 
  selectStationName,
} from '../redux/stationSlice';
import { PageHeader, Tabs } from 'antd';
import StationChart from './charts/StationChart'

const { TabPane } = Tabs;

const tabData = [{ 
    title: 'Daily',
    description: <>Rainfall is summed daily</>,
    id: 'daily', // for station reducer
  },{ 
    title: 'Weekly',
    description: <>Rainfall is summed monthly</>,
    id: 'weekly', // for station reducer
  },{ 
    title: 'Double Mass',
    description: <>
      Double mass rainfall sums 
      <a href='https://pubs.usgs.gov/wsp/1541b/report.pdf'> reference link</a>
    </>,
    id: 'dm', // for station reducer
}];

export default function StationInfo() {
  const dispatch = useDispatch();
  const close = () => dispatch(clearStation());
  const stationId = useSelector(selectStationId);
  const stationName = useSelector(selectStationName);
  const weatherData = useSelector(selectStationData);

  function onTabSelect(key) {
    const chartId = tabData[key].id;
    console.log('onTabSelect', key, chartId);
    dispatch(selectChart(chartId))
  }

  useEffect(()=>{
    console.log(weatherData, 'stationInfo')

  }, [weatherData])

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={close}
        title={`Station: ${stationName}`}
        subTitle={`Id: ${stationId}`}
      />
      <Tabs onChange={onTabSelect} type="card" size="large" style={{padding:'0 10px'}}>
        { tabData && tabData.map((tab,i) => (
            <TabPane tab={tab.title} key={i}>
              {tab.description}
            </TabPane>
          ))
        }
      </Tabs>
      <div style={{padding: '10px'}}>
        <StationChart style={{width: '100%', padding: '0 0 10px 0'}} />
      </div> 
    </>
  );
}
