import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStationId,
} from '../redux/stationSlice';
import { 
  Row, Col, Form, Input, Button, Table, Divider, message 
} from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
    width: 200,
  },
  {
    title: 'classification',
    dataIndex: 'classification',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.classification - b.classification,
    width: 200,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    classification: 0.1,
  },
  {
    key: '2',
    name: 'Jim Green',
    classification: 0.94,
  },
  {
    key: '3',
    name: 'Joe Black',
    classification: 0.1,
  },
  {
    key: '4',
    name: 'Jim Red',
    classification: 0.4,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}


export default function Template() {
  const dispatch = useDispatch();

  function onSubmit({stationId}) {
    console.log('form submit', stationId)
    if (stationId)
      dispatch(setStationId(stationId))
    else
      message.error(`Invalid station id: "${stationId}"`)
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <Form.Item
              label="Station Id"
              name="stationId"
              rules={[{ required: true, message: 'Select station' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Row justify="center">
        <Col>
          <Table columns={columns} dataSource={data} onChange={onChange} 
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {console.log(event, record)}, // click row
                onDoubleClick: event => {}, // double click row
                onContextMenu: event => {}, // right button click row
                onMouseEnter: event => {}, // mouse enter row
                onMouseLeave: event => {}, // mouse leave row
              };
            }}
          />
        </Col>
      </Row>
    </>
  );
}
