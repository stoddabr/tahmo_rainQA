import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from '../redux/counterSlice';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const backgroundStyle = {
  backgroundColor: 'blue',
  height: '90vh',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white', // font color
}

export default function Template() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <>
      <div style={backgroundStyle}>
        <h1 style={{ color: 'white' }}>Map</h1>
      </div>
    </>
  );
}
