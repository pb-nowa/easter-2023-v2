import { useEffect, useState } from 'react'
import './App.css';

import Compass from './pages/compassPage/compass'

function App() {
  const [position, setPosition] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setPosition("Geolocation is not supported by this browser.")
    }
  }, [])
 
  function showPosition(position) {
    setPosition("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Compass />
        {/* <strong >{position}</strong> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
