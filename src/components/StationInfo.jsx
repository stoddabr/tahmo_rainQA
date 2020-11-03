import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearStation,selectStationId,
} from '../redux/stationSlice';
import { Row, Col, PageHeader } from 'antd';
import ExampleGraphPlotly from './charts/ExamplePlotly'

export default function StationInfo() {
  const dispatch = useDispatch();
  const close = () => dispatch(clearStation());
  const stationId = useSelector(selectStationId);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={close}
        title={`Station ${stationId}`}
        subTitle="Showing weather information"
      />
      <Row>
        <Col>
          <ExampleGraphPlotly />
        </Col>
      </Row>
    </>
  );
}
