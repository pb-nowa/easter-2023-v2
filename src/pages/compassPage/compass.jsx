import { useState } from 'react'
import { useRotationInputLock } from './useRotationInputLock'

import '../../compass.css'
import { useEffect } from 'react'

export const TICK = 8

function Compass() {
  const [orientation, setOrientation] = useState(0)
  const [isApproved, setIsApproved] = useState(false)
  const [combo, setCombo] = useState([null, null, null])

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

  useEffect(() => {
    setCombo(lockInput)
  }, [lockInput])

  const requestPermission = () => {
    if ("DeviceOrientationEvent" in window) {
      DeviceOrientationEvent.requestPermission().then(res => {
        if (res === 'granted') {
          window.addEventListener("deviceorientation", handleOrientation)
          setIsApproved(true)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <div className="compass">
      <header>
        <div>{isApproved ? 'Spin to unlock' : ''}</div> 
        <div>{isApproved ? 'the next clue' : ''}</div>
        <small>{isApproved ? 'Rotate yourself like a combination lock to input the solution' : ''}</small>
      </header>
      <div className="body">
        {isApproved 
          ? 
            <section>
              <div className="solution-input">
                <span>→</span>
                <span>←</span>
                <span>→</span>

                <span>△</span>
                <span>○</span>
                <span>□</span>

                <span>{combo[0] || '_'}</span>
                <span>{combo[1] || '_'}</span>
                <span>{combo[2] || '_'}</span>
              </div> 
              <div className="center">
                {response 
                  ? 
                    <div className="response">{response}</div>
                  :
                    <strong>{orientation}</strong>
                }
              </div>
              <button onClick={clearLock}>clear input</button>
            </section>
          : 
          <button onClick={requestPermission}>Click to allow device compass</button>
        }
      </div>
    </div>
  );
}

export default Compass;
