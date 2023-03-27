import { createBrowserRouter } from 'react-router-dom'

import Compass from './pages/compassPage/compass'
import App from './App'
import DistanceBlue from './pages/distancePage/distanceBlue'
import DistanceRed from './pages/distancePage/distanceRed'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/distance-blue",
    element: <DistanceBlue />,
  },
  {
    path: "/distance-red",
    element: <DistanceRed />,
  },
  {
    path: "/compass",
    element: <Compass />,
  },
])

export default router