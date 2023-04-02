import { createBrowserRouter } from 'react-router-dom'

import Compass from './pages/compassPage/compass'

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
    element: <Compass />,
  },
])

export default router