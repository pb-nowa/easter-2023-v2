import { useEffect, useState, useRef, useCallback } from 'react'
import { TICK } from './compass'

const LOCK_SOLVE_STATE = [3, 6, 2]
const LOCK_CLEAR_STATE = [null, null, null]

export const useRotationInputLock = (orientation) => {
  const [lockInput, setLockInput] = useState(LOCK_CLEAR_STATE)
  const firstInput = lockInput[0]

  const [index, setIndex] = useState(0)
  const stackRef = useRef([])

  const [response, setResponse] = useState('')

  const clearLock = useCallback(() => {
    setIndex(0)
    setLockInput(LOCK_CLEAR_STATE)
    stackRef.current = []
  }, [])

  const handleSubmit = useCallback((combination) => {
    if (JSON.stringify(combination) === JSON.stringify(LOCK_SOLVE_STATE)) {
      setResponse('Correct Combination!')

      return
    }

    setResponse('Incorrect Combination! Try again.')

    setTimeout(() => {
      clearLock()
    }, 1000)

    setTimeout(() => {
      setResponse('')
    }, 3000)
  }, [clearLock])

  useEffect(() => {
    // Wait for orientation to init before tracking
    if (orientation === undefined) {
      return
    }

    const prevOrientation = stackRef.current[stackRef.current.length - 1]

    if (index === 0) {
      // Engage lock stack only after passing 0
      if (!stackRef.current.length && orientation !== 0) {
        return
      }

      // Check if switch from Clockwise to Counterclockwise
      if ((orientation && orientation < prevOrientation) || (orientation === TICK - 1 && prevOrientation === 0)) {
        setLockInput([prevOrientation, null, null])
        setIndex(1)

        stackRef.current = []

        return
      }

      stackRef.current.push(orientation)
    }

    if (index === 1) {
      // Engage lock stack only after passing first digit
      if (!stackRef.current.length && orientation !== firstInput) {
        return
      }


      // Check if switch from Counterclockwise to Clockwise
      if ((prevOrientation && orientation > prevOrientation) || (orientation === 0 && prevOrientation === TICK - 1)) {
        setLockInput(lockInput => {
          return [lockInput[0], prevOrientation, null]
        })
        setIndex(2)
        
        stackRef.current = [orientation]
        return
      }

      stackRef.current.push(orientation)
    }

    if (index === 2) {
      // Reset lock if somehow skipped first input...
      if (lockInput[0] === undefined || lockInput[0] === null) {
        clearLock()
      }

      const timeout = setTimeout(() => {
        setLockInput(prevLockInput => {
          const lockInput = [prevLockInput[0], prevLockInput[1], orientation]
          handleSubmit(lockInput)
          return lockInput
        })
        
      }, 1500)
      
      stackRef.current.push(orientation)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [orientation, index, firstInput, handleSubmit])

  return { lockInput, clearLock, response }
}