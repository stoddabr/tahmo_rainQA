import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStationId,
} from '../../redux/stationSlice';
import {
  selectAllStations,
} from '../../redux/allStationsSlice';
import { Row, Col, } from 'antd';
import { 
  MapContainer , CircleMarker, Polyline, Popup, TileLayer, 
  useMap, useMapEvent
} from "react-leaflet";
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


function StationCircles({stations}) {
  if (stations)
    return stations.map((station,i) => {
      const stationStyle = station.isFlagged ? redOptions : limeOptions
      return (
        <CircleMarker 
          key={'stationMarker'+i}
          center={station.gps} pathOptions={stationStyle} radius={15}
          eventHandlers={{
            click: () => {
              console.log('marker clicked')
            },
            onhover: (e) => e.target.openPopup(),
          }}
        >
          <Popup>{station.name}</Popup>
        </CircleMarker>
      );
    })
  return null
}

function StationConnections({connections, mainGps}) {
  if (connections && Array.isArray(connections) && connections.length > 0)
    return connections.map((neighbor, i) => {
      const pathOptions = { color: 'blue', weight: neighbor.weight }
      return (
        <Polyline 
          key={`connection ${i}`} 
          pathOptions={pathOptions} 
          positions={[neighbor.gps, mainGps]} 
          onMouseOver={e => e.target.setStyle({fillColor: 'green'})}
          onMouseOut={e => e.target.closePopup()}
        >
          <Popup>{`From ${neighbor.name}, weight: ${neighbor.weight}`}</Popup>
        </Polyline>
      );
    })
  return null
}

export default function StationsMapper() {
  const stationList = useSelector(selectAllStations)
  const stationId = useSelector(selectStationId);
  const [connections, setConnections] = useState([])
  const [mainGps, setMainGps] = useState([0,0])

  function setupLines() {
    const station = stationList.find(el=> el.name === stationId)
    if(station){
      console.log({stationId, station})
      setConnections(station.neighbors)
      setMainGps(station.gps)
    }
  }
  useEffect(()=>{ // update connections when a station is selected
    setupLines()
  },[stationId])
  useEffect(()=>{ // update connections when a station is selected
    setupLines()
  },[])
  console.log({connections, mainGps})

  return (
    <>
      <StationCircles stations={stationList} />
      <StationConnections connections={connections} mainGps={mainGps}/>
      {/*
      <CircleMarker center={gpsStations[0]} pathOptions={redOptions} radius={20}>
        <Popup>Example 4</Popup>
      </CircleMarker>
      <CircleMarker center={gpsStations[1]} pathOptions={limeOptions} radius={20}>
        <Popup>Example 2</Popup>
      </CircleMarker>
      <CircleMarker center={gpsStations[2]} pathOptions={limeOptions} radius={20}>
        <Popup>Example 3</Popup>
      </CircleMarker>
      <CircleMarker center={gpsStations[3]} pathOptions={limeOptions} radius={20}>
        <Popup>Example 7</Popup>
      </CircleMarker>
      */}
      {/*
        <Polyline pathOptions={pathOptions2} positions={polyline2} />
      */}
    </>
  );
}
