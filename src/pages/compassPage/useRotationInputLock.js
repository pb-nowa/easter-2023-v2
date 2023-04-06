import { useEffect, useState, useCallback, useRef } from 'react'
import { TICK } from './compass'
import { useNavigate } from 'react-router-dom'

const LOCK_SOLVE_STATE = [5, 2, 0]
const LOCK_CLEAR_STATE = [null, null, null]

export const useRotationInputLock = (orientation) => {
  const navigate = useNavigate()
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
    setLockInput(combination)

    if (JSON.stringify(combination) === JSON.stringify(LOCK_SOLVE_STATE)) {
      setResponse('Correct Combination!')


      setTimeout(() => {
        navigate('/clue')
      }, 2000)
      return
    }

    setResponse('Incorrect Combination! Try again.')

    setTimeout(() => {
      setResponse('')
      clearLock()
    }, 2000)
  }, [clearLock, navigate])

  useEffect(() => {
    // Don't do weird stuff if lock is already solved
    if (response === 'Correct Combination!') {
      return
    }
  
    // Wait for orientation to init before tracking
    if (orientation === undefined) {
      return
    }

    const prevOrientation = stackRef.current[stackRef.current.length - 1]

    if (index === 0) {
      // Check if switch from Clockwise to Counterclockwise
      if ((orientation < prevOrientation && !(orientation === 0 && prevOrientation === TICK - 1)) || (orientation === TICK - 1 && prevOrientation === 0)) {
        setLockInput([prevOrientation, null, null])
        setIndex(1)

        stackRef.current = []

        return
      }

      stackRef.current = [...stackRef.current, orientation]
    }

    if (index === 1) {
      if (lockInput[0] === null) {
        clearLock()
      }

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
        
        stackRef.current =[orientation]
        return
      }

      stackRef.current = [...stackRef.current, orientation]
    }

    if (index === 2) {
      // Reset lock if somehow skipped first input...
      if (lockInput[0] === null || lockInput[1] === null) {
        clearLock()
      }

      const timeout = setTimeout(() => {
        setLockInput(prevLockInput => {
          // avoid inputing a solution if hasn't moved from initial value
          if (orientation === prevLockInput[1]) {
            return [prevLockInput[0], prevLockInput[1], null]
          }

          const lockInput = [prevLockInput[0], prevLockInput[1], orientation]
          handleSubmit(lockInput)
          return lockInput
        })
      }, 1500)
      
      stackRef.current = [...stackRef.current, orientation]

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [orientation, index, firstInput, handleSubmit, clearLock, lockInput, response])

  return { lockInput, clearLock, response }
}