import { createBrowserRouter } from 'react-router-dom'

import Compass from './pages/compassPage/compass'
import App from './App'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/compass",
    element: <Compass />,
  },
])

export default router