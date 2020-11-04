import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from '../redux/counterSlice';
import { Row, Col, } from 'antd';
import { MapContainer , CircleMarker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';

// https://react-leaflet.js.org/docs/api-map

const backgroundStyle = {
  backgroundColor: 'blue',
  height: '90vh',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white', // font color
}
const mapStyle = {
  height: '90vh',
  width: '50vw', 
}
const position = [6.6194, 20.9367]
const limeOptions = { color: 'lime' }
const redOptions = { color: 'red' }
const gpsStations = [
  [7.6194, 21.4367],
  [6.6194, 21.9367],
  [5.6194, 21.9367],
]
const polyline = [
  gpsStations[0],
  gpsStations[1],
]
const polyline2 = [
  gpsStations[0],
  gpsStations[2]
]
const pathOptions2 = { color: 'blue', weight: 10 }
const pathOptions1 = { color: 'blue', weight: 2 }

export default function TahmoMap() {
  return (
    <Row justify="center" align="middle">
      <Col>
        <MapContainer 
          center={position} 
          zoom={5} 
          scrollWheelZoom={true} 
          style={mapStyle}
          >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <CircleMarker center={gpsStations[0]} pathOptions={redOptions} radius={20}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        <CircleMarker center={gpsStations[1]} pathOptions={limeOptions} radius={20}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        <CircleMarker center={gpsStations[2]} pathOptions={limeOptions} radius={20}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        <Polyline pathOptions={pathOptions1} positions={polyline} />
        <Polyline pathOptions={pathOptions2} positions={polyline2} />
        </MapContainer>
      </Col>
    </Row>
  );
}
