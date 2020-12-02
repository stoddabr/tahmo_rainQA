import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStationName, selectStationNeighbors
} from '../../redux/stationSlice';
import {
  selectAllStations, selectHighlightedStation, 
  setHighlightedStation, clearHighlightedStation,
} from '../../redux/allStationsSlice';
import { setSelectedStation } from '../../redux/stationSlice';
import { 
  MapContainer , CircleMarker, Polyline, Popup, TileLayer, 
  useMap, useMapEvent,
} from "react-leaflet";
import "leaflet/dist/images/marker-shadow.png";
import 'leaflet/dist/leaflet.css';

// https://react-leaflet.js.org/docs/api-map


const limeOptions = { color: 'lime', fillColor: 'lime', fillOpacity: 0.5 }
const redOptions = { color: 'red', fillColor: 'red', fillOpacity: 0.5 }
const chartColorList = ['blue', 'green', 'orange', 'magenta'] // should be same as in stationSlice.jsx

function Station({station, index}) {
  const inputEl = useRef(null);
  const [pathOptions, setPathOptions] = useState(station.isFlagged ? redOptions : limeOptions);
  const dispatch = useDispatch();
  const highlightedStationKey = useSelector(selectHighlightedStation);
  const stationNeighbors = useSelector(selectStationNeighbors);

  useEffect(()=>{
    if (highlightedStationKey && station.key === highlightedStationKey) {
      setPathOptions( { ...pathOptions, fillColor:'white' } )
      inputEl.current.openPopup()
    }  else {
      setPathOptions( station.isFlagged ? redOptions : limeOptions )
      inputEl.current.closePopup()
    }

    // highlight to match chart
    const neighborIndex = stationNeighbors.findIndex(
      el => el.id === station.key  // find index of element with same id/key as data
    )
    console.log('station neighbor', neighborIndex)
    if (neighborIndex !== -1) { // match chart color if neighbor
      setPathOptions({ ...pathOptions, color: chartColorList[neighborIndex] || 'red' })
    }
  }, [highlightedStationKey, stationNeighbors])

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
    console.log('onMarkerClick selected', station)
    const name = station.name
    const id = station.key
    const neighbors = station.neighbors
    dispatch(setSelectedStation({name, id, neighbors}))
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
      <Popup>{`${station.name} (${station.key})`}</Popup>
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
  const stationName = useSelector(selectStationName);
  const [connections, setConnections] = useState([])
  const [mainGps, setMainGps] = useState([0,0])

  function setupLines() {
    const station = stationList.find(el=> el.name === stationName)
    if(station){
      console.log({stationName, station})
      setConnections(station.neighbors)
      setMainGps(station.gps)
    } else {
      setConnections([])
    }
  }

  useEffect(()=>{ // update connections when a station is selected
    setupLines()
  },[stationName])
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
