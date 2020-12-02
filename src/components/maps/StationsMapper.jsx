import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStationId,
} from '../../redux/stationSlice';
import {
  selectAllStations, selectHighlightedStation, 
  setHighlightedStation, clearHighlightedStation,
} from '../../redux/allStationsSlice';
import { Row, Col, } from 'antd';
import { 
  MapContainer , CircleMarker, Polyline, Popup, TileLayer, 
  useMap, useMapEvent
} from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';

// https://react-leaflet.js.org/docs/api-map


const limeOptions = { color: 'lime', fillColor: 'lime' }
const redOptions = { color: 'red', fillColor: 'red' }


function Station({station, index}) {
  const inputEl = useRef(null);
  const [pathOptions, setPathOptions] = useState(station.isFlagged ? redOptions : limeOptions);
  const dispatch = useDispatch();
  const highlightedStationKey = useSelector(selectHighlightedStation);

  useEffect(()=>{
    if (highlightedStationKey && station.key === highlightedStationKey) {
      setPathOptions( { ...pathOptions, fillColor:'blue' } )
      inputEl.current.openPopup()
    }  else {
      setPathOptions( station.isFlagged ? redOptions : limeOptions )
      inputEl.current.closePopup()
    }
  }, [highlightedStationKey])

  function onHoverStation(e) {
    console.log('hover station', e.target.options.name)
    e.target.openPopup()
    dispatch(setHighlightedStation(e.target.options.name))
  }

  function onHoverOffStation(e) {
    console.log('hover leave station', e.target.options.name)
    e.target.closePopup()
    dispatch(clearHighlightedStation())
  }

  function onMarkerClick(station) {
    console.log('asaoifjowjfoidjf', station)
  }

  return (
    <CircleMarker 
      ref={inputEl}
      key={'stationMarker'+index}
      name={station.key}
      center={station.gps} pathOptions={pathOptions} radius={15}
      eventHandlers={{
        click: () => { onMarkerClick(station) },
        mouseover: onHoverStation,
        mouseout: onHoverOffStation,
      }}
    >
      <Popup>{station.name}</Popup>
    </CircleMarker>
  );
}

function StationCircles({stations}) {
  if (stations)
    return stations.map((station,i) => (
      <Station 
        station={station} 
        index={i}
      />
    ))
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
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup()
            },
          }}
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
