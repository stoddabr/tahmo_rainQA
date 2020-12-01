import React from 'react';
import { Row, Col, Typography, Image } from 'antd';

const { Title } = Typography;

const backgroundStyle = {
  backgroundColor: '#1890ff',
  width: '100vw',
  // height: '',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white', // font color
  textAlign: 'center',
}

export default function Header() {
  return (
    <>
      <Row style={backgroundStyle}>
	   <Col>
          {/** @TAHMO_TODO add img logo here */}
          <Image
            width={200}
            src="https://tahmo.org/wp-content/uploads/2014/02/TAHMO_logo1.png"
          />
        </Col>
        <Col span={12}>
          <div>
            <Title type='primary'>RainAVT</Title>
          </div>
        </Col>       
      </Row>
    </>
  );
}
