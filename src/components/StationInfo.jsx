import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearStation,selectStationId, selectChart,
} from '../redux/stationSlice';
import { Row, Col, PageHeader, Tabs } from 'antd';
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

  function onTabSelect(key) {
    const chartId = tabData[key].id;
    console.log('onTabSelect', key, chartId);
    dispatch(selectChart(chartId))
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={close}
        title={`Station ${stationId}`}
        subTitle="Showing weather information"
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
