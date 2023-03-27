import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { RED_PAGE } from './distanceRed'
import { BLUE_PAGE } from './distanceBlue'

const useDistanceSocket = (pageName) => {
  // This can also be an async getter function. See notes below on Async Urls.
  const WS_URL = 'ws://127.0.0.1:8000'
  const [redStatus, setRedStatus] = useState('NOT DETECTED')
  const [blueStatus, setBlueStatus] = useState('NOT DETECTED')
  // const WS_URL = 'ws://4.tcp.ngrok.io:11236';

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log('socket opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
    share: true,
    // filter: () => false,
    retryOnError: true,
  });

  useEffect(() => {
    if (pageName && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username: pageName,
        type: 'userevent'
      })
    }
  }, [pageName, sendJsonMessage, readyState]);

  useEffect(() => {
    if (!lastJsonMessage?.data) {
      return
    }

    const userActivity = lastJsonMessage.data.userActivity
    const data = lastJsonMessage.data
    const users = Object.values(lastJsonMessage.data.users) || []

    const isRedActive = users.some(user => user.username === RED_PAGE)
    setRedStatus(isRedActive ? 'DETECTED' : 'NOT DETECTED')
    
    const isBlueActive = users.some(user => user.username === BLUE_PAGE)
    setBlueStatus(isBlueActive ? 'IS TRACKING' : 'NOT DETECTED')
  }, [lastJsonMessage])
 
  return { redStatus, blueStatus }
}

export default useDistanceSocket