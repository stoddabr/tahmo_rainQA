import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStationId,
} from '../redux/stationSlice';
import { 
  Row, Col, Typography, Table, Divider, message 
} from 'antd';
const { Paragraph } = Typography;

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

const data = [...Array(10).keys()].map((i)=>{
  return {
    key: i,
    name: `Example ${i}`,
    classification: Math.random(),
  }
})
console.log({data})

const explination = `A longwinded explination of the machine learning that powers this system can go here. It's expandable so that people who are interested in learning more can but it's still compact for people who don't care`
const Shakespeare = '. To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them?'

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}


export default function AnomalyList() {
  const dispatch = useDispatch();

  function onSubmit({stationId}) {
    console.log('form submit', stationId)
    if (stationId)
      dispatch(setStationId(stationId))
    else
      message.error(`Invalid station id: "${stationId}"`)
  }

  function rowSelected(row, i) {
    console.log("rowSelected", row, i)
    onSubmit({stationId: row.name})
  }

  return (
    <div style={{maxHeight: '90vh', overflow:'auto'}}>
      <Row>
        <Col flex={2}>
          <Paragraph
            style={{ padding: '16px 16px 0px 16px' }}
            ellipsis={{
              rows: 2,
              expandable: true,
              suffix: '',
              onEllipsis: ellipsis => console.log('Ellipsis changed:', ellipsis),
            }}
          >
            {explination+Shakespeare}
          </Paragraph>
          {/* Search station
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
          */}
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Table columns={columns} dataSource={data} onChange={onChange} 
        onRow={(record, rowIndex) => {
          return {
            onClick: () => rowSelected(record, rowIndex), // click row
            onDoubleClick: event => {}, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
    </div>
  );
}
