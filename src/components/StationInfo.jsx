import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearStation,selectStationId,
} from '../redux/stationSlice';
import { Row, Col, PageHeader, Tabs } from 'antd';
import StationChart from './charts/StationChart'

const { TabPane } = Tabs;

export default function StationInfo() {
  const dispatch = useDispatch();
  const close = () => dispatch(clearStation());
  const stationId = useSelector(selectStationId);

  function onTabSelect(key) {
    console.log(onTabSelect, key)
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
        <TabPane tab="Daily" key="1">
          Rainfall is summed daily
        </TabPane>
        <TabPane tab="Monthly" key="2">
          Rainfall is summed monthly
        </TabPane>
        <TabPane tab="Double Mass" key="3">
          Double mass graph sums the rainfall or something idk 
          <a href='https://pubs.usgs.gov/wsp/1541b/report.pdf'> just read this</a>
        </TabPane>
      </Tabs>
      <div style={{padding: '10px'}}>
        <StationChart style={{width: '100%', padding: '0 0 10px 0'}} />
      </div>
    </>
  );
}
