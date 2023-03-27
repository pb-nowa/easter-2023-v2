import React, { useState, useEffect } from 'react'
import DistancePage from './distancePage'
import useDistanceSocket from './useDistanceSocket'

export const BLUE_PAGE = 'distance-blue'
const DistanceBlue = () => {
  // Gazeebo
  const targetLat = 37.546811
  const targetLon = -122.236681
  const pageName = BLUE_PAGE
  const { redStatus } = useDistanceSocket(pageName)

  return (
    <div className="App">
      <header className="App-header">
        <div className="blue-theme">
          <div>BLUE</div>
          <div>
            <div>Partner device</div>
            <div>{redStatus}</div>
          </div>
          <article>
            Lead your partner to the next clue
          </article>
          <small>
            Must stay in range of the start position to track
          </small>
          <div>BLUE</div>
          <DistancePage 
            lat={targetLat} 
            lon={targetLon} 
            pageName={pageName} 
            partnerDeviceStatus={redStatus}/>
        </div>
    </header>
  </div>

  )
}

export default DistanceBlue