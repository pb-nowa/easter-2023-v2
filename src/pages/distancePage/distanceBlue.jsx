import React, { useState, useEffect } from 'react'
import { usePosition } from './usePosition'

const DistanceBlue = () => {
  // Gazeebo
  const targetLat = 37.546811
  const targetLon = -122.236681

  const { position, distance, error } = usePosition(targetLat, targetLon)

  return (
    <div className="App">
      <header className="App-header">

        <strong>{position.lat}</strong>
        <strong>{position.lon}</strong>
        <strong>{distance}ft</strong>
        {error && <div>{error}</div>}
      </header>
    </div>
  )
}

export default DistanceBlue