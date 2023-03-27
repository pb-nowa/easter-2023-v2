import React, { useState, useEffect } from 'react'
import { usePosition } from './usePosition'
import { RED_PAGE } from './distanceRed'

const DistancePage = (lat, lon, pageName, partnerDeviceStatus) => {
  const {
    position,
    distance,
    error,
    hasAllowedGeoTracking,
    allowGeoTracking,
    isInRange,
  } = usePosition(lat, lon)

  return (
    <>
      <section>
        <div>
          <div>
            {!isInRange ?
              
              <div>{pageName === RED_PAGE ? 'You Must Stay by the Start to Track' : ''}</div> :
              <div>{distance}ft</div>
            }
          </div>
        </div>
      </section>
      {!hasAllowedGeoTracking &&
        <button onClick={allowGeoTracking}>Click to allow location tracking</button>
      }
      <strong>{position.lat}</strong>
      <strong>{position.lon}</strong>
      <strong></strong>
      {error && <div>{error}</div>}
    </>
  )
}

export default DistancePage