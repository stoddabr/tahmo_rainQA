import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedStation,
} from '../redux/stationSlice';
import {
  selectAllStations, selectHighlightedStation, 
  setHighlightedStation, clearHighlightedStation,
} from '../redux/allStationsSlice';
import { 
  Row, Col, Typography, Table, Divider, Spin, Space, message
} from 'antd';
const { Paragraph } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    // filters: [],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
    width: 200,
  },
  {
    title: 'Station Id',
    dataIndex: 'key',
    // filters: [],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
    width: 150,
  },
  {
    title: 'classification',
    dataIndex: 'classification',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.classification - b.classification,
    width: 200,
  },
];

// @TAHMO_TODO, edit text explination
const explination = `RainQC System Version 1.1. Model training date: 15 September 2020. Current anomaly scoring computed using the MixLinearResidual method. 51 models currently active.`

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

// list highlighting should be possible using custom selector by passing highlightedStationKey
// https://ant.design/components/table/#components-table-demo-row-selection-custom

export default function AnomalyList() {
  const dispatch = useDispatch();
  const stationList = useSelector(selectAllStations)
  const highlightedStationKey = useSelector(selectHighlightedStation);

  function onSubmit(station) {
    const id = station.key
    const name = station.name
    const neighbors = station.neighbors
    console.log('form submit', {id, name})
    if (id)
      dispatch(setSelectedStation({id, name, neighbors}))
    else
      message.error(`Invalid station id: "${id}"`)
  }

  function rowSelected(row, i) {
    console.log("rowSelected", row, i)
    onSubmit(row)
  }

  function onRowHover(record) {
    console.log('onRowHover',record)
    dispatch(setHighlightedStation(record.key))
  }

  function onRowHoverEnd(record) {
    console.log('onRowHoverEnd',record)
    dispatch(clearHighlightedStation())
  }

  return (
    <div style={{maxHeight: '90vh', overflow:'auto'}}>
      <Row>
        <Col flex={2}>
          {/* start header explination section @TAHMO_TODO */}
          <Paragraph
            style={{ padding: '16px 16px 0px 16px' }}
            ellipsis={{
              rows: 2,
              expandable: true,
              suffix: '',
              onEllipsis: ellipsis => console.log('Ellipsis changed:', ellipsis),
            }}
          >
            {explination}
          </Paragraph>
          {/* end header explination section @TAHMO_TODO */}
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      { stationList && stationList.length > 0 ?
        <Table columns={columns} dataSource={stationList} onChange={onChange} 
          onRow={(record, rowIndex) => {
            return {
              onClick: () => rowSelected(record, rowIndex), // click row
              // onDoubleClick: e => {}, // double click row
              // onContextMenu: e => {}, // right button click row
              onMouseEnter: e => { onRowHover(record) }, // mouse enter row
              onMouseLeave: e => { onRowHoverEnd(record) }, // mouse leave row
            };
          }}
          pagination={false} // hides bottom bar
        />
      :
        <div style={{width:'50vw', height: '200px', textAlign:'center'}}>
          <Spin size="large"  />
        </div>
      }
    </div>
  );
}
