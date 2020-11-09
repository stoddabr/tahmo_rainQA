import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStationId,
} from '../../redux/stationSlice';
import { Row, Col, } from 'antd';
import { 
  MapContainer , CircleMarker, Polyline, Popup, TileLayer, 
  useMap, useMapEvent
} from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';
import StatonsMapper from './StationsMapper'

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
  [23.263537, -5.210972],
  [14.029675, 40.690370]
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

function MapController() {
  /* test, zoom out on click
  see https://react-leaflet-v3.now.sh/docs/api-map 
  const map = useMap()
  const onClick = useCallback((e)=> {
    map.setView(e.latlng, 1)
  }, [map])
  useMapEvent('click', onClick)
  */
  return null
}

export default function TahmoMap() {

  const stationId = useSelector(selectStationId);
  console.log({stationId})


  return (
    <Row justify="center" align="middle">
      <Col>
        <MapContainer 
          center={position} 
          zoom={4} 
          scrollWheelZoom={true} 
          style={mapStyle}
          >
          <MapController/>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <StatonsMapper/>
        </MapContainer>
      </Col>
    </Row>
  );
}
