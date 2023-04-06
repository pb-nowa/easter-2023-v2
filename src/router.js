import { createBrowserRouter } from 'react-router-dom'

import Compass from './pages/compassPage/compass'
import Clue from './pages/Clue'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Compass />,
  },
  {
    path: "/compass",
    element: <Compass />,
  },
  {
    path: "/clue",
    element: <Clue />,
  },
])

export default router