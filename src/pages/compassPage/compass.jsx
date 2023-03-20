import { useEffect, useState, useRef, useCallback } from 'react'
import { useRotationInputLock } from './useRotationInputLock'
export const TICK = 8
function Compass() {
  const [orientation, setOrientation] = useState()
  

  const handleOrientation = (e) => {
    // offset from 0 north in degrees
    const offset = 0
    const max = 360
    const range = max / TICK
    const intValue = Math.floor(e.webkitCompassHeading - offset)
    const val = Math.floor(intValue / range)

    setOrientation(val)
  }

  const { lockInput, clearLock, response } = useRotationInputLock(orientation)

  const requestPermission = () => {
    if ("DeviceOrientationEvent" in window) {
      DeviceOrientationEvent.requestPermission().then(res => {
        if (res === 'granted') {
          window.addEventListener("deviceorientation", handleOrientation)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <div>
      <button onClick={requestPermission}>allow device orientation</button>
      <button onClick={clearLock}>clear password input</button>
      <br />
      <div style={{
        fontSize: '36px'
      }}>{orientation}</div>
      <br />
      <section style={{ display: 'flex', }}>
        <div>#</div>
        <div>#</div>
        <div>#</div>

        <div>{lockInput[0] || '.'}</div>
        <div>{lockInput[1] || '.'}</div>
        <div>{lockInput[2] || '.'}</div>
        <div>{response}</div>
      </section>
    </div>
  );
}

export default Compass;
