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
        <Col span={12}>
          <div>
            <Title type='secondary'>Tahmo RainQA</Title>
          </div>
        </Col>
        <Col>
          {/** @TAHMO_TODO add img logo here */}
          <Image
            width={20}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Row>
    </>
  );
}
