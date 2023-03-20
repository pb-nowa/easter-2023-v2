import { createBrowserRouter } from 'react-router-dom'

import Compass from './pages/compassPage/compass'
import App from './App'
import DistanceBlue from './pages/distancePage/distanceBlue'

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
    path: "/compass",
    element: <Compass />,
  },
])

export default router