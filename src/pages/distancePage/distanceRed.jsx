import React, { useState, useEffect } from 'react'
import DistancePage from './distancePage'
import useDistanceSocket from './useDistanceSocket'

export const RED_PAGE = 'distance-red'
const DistanceBlue = () => {
  // Gazeebo
  const targetLat = 37.546811
  const targetLon = -122.236681
  const pageName = RED_PAGE
  const { blueStatus } = useDistanceSocket(pageName)

  return (
    <div className="App">
      <header className="App-header">
        <div className="red-theme">
          <div>RED</div>
          <div>
            <div>Partner device</div>
            <div>{blueStatus}</div>
          </div>
          <article>
            Your partner will track your distance to the next clue
          </article>
          <DistancePage 
            lat={targetLat} 
            lon={targetLon} 
            pageName={pageName} 
            partnerDeviceStatus={blueStatus}/>
        </div>
      </header>
    </div>
  )
}

export default DistanceBlue