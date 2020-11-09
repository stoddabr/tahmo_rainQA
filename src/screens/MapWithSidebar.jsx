import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectStationId, clearStation } from '../redux/stationSlice';
import { getStationsData } from '../redux/allStationsSlice'
import { Row, Col, } from 'antd';
import {Map, AnomalyList, StationInfo, Header} from '../components'

function MapWithSidebar() {
  const dispatch = useDispatch();
  const stationId = useSelector(selectStationId);
  console.log({stationId})

  useEffect(()=>{
    dispatch(clearStation())
    dispatch(getStationsData())
  }, [])

  return (
    <>
      <Header/>
      <Row>
        <Col span={12}>
          { stationId ? 
            <StationInfo />
            :
            <AnomalyList />
          }
        </Col>
        <Col span={12}>
          <Map/>
        </Col>
      </Row>
    </>
  )
}

export default MapWithSidebar