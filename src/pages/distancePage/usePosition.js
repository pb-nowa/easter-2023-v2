import { useEffect, useState } from 'react'
import haversine from 'haversine-distance'

export const usePosition = (targetLat, targetLon) => {
  const [position, setPosition] = useState({ lat: '', lon: '' })
  const [distance, setDistance] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
    }

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(showPosition)
    }, 250)

    function showPosition(position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      setPosition({
        lat,
        lon,
      })
      // Dock
      // const targetLat = 37.548116
      // const targetLon = -122.234408

      const metersToFeetRatio = 3.28084

      const calculatedDistance = Math.floor(haversine({ lat, lon }, { lat: targetLat, lon: targetLon }) * metersToFeetRatio)
      setDistance(calculatedDistance)
    }
  
    return () => {
      clearInterval(intervalId)
    }

    
  }, [targetLat, targetLon])

  return { position, distance, error }
}

