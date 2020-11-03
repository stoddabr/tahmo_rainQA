import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setStationId,
} from '../redux/stationSlice';
import { Row, Col, Form, Input, Button, Checkbox, message } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

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
    </>
  );
}
