import { useEffect, useState } from 'react'
import haversine from 'haversine-distance'

export const usePosition = (targetLat, targetLon) => {
  const [isInRange, setIsInRange] = useState(false)
  const [position, setPosition] = useState({ lat: '', lon: '' })
  const [distance, setDistance] = useState()
  const [error, setError] = useState('')
  const [hasAllowedGeoTracking, setHasAllowedGeoTracking] = useState(false)

  const distanceRangeOfError = 30
  useEffect(() => {
    distance < distanceRangeOfError
      ? setIsInRange(false)
      : setIsInRange(true)
  }, [distance])

  const allowGeoTracking = () => setHasAllowedGeoTracking(true)

  useEffect(() => {
    if (!hasAllowedGeoTracking) {
      return
    }
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser. Please use a different device")
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition

    const params = {
      // device cannot use a cached position and must attempt to retrieve the real current position
      maximumAge: 0,
      enableHighAccuracy: true
    }

    // TODO: use watchPosition instead?
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(showPosition, handleError, params)
    }, 1000)

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

    function handleError(err) {
      alert('Please enable location sharing in your settings. Refresh the page to try again.')
      console.log(err)
    }
  
    return () => {
      clearInterval(intervalId)
    }

    
  }, [targetLat, targetLon, hasAllowedGeoTracking])

  return { 
    position, 
    distance, 
    error, 
    hasAllowedGeoTracking, 
    allowGeoTracking,
    isInRange, 
  }
}

