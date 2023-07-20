import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom'

// Páginas
import disp1 from './routes/disp1.jsx'
import disp2 from './routes/disp2.jsx'
import disp3 from './routes/disp3.jsx'
import disp4 from './routes/disp4.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/disp1',
        element: <disp1 />
      },
      {
        path: '/disp2',
        element: <disp2 />
      },
      {
        path: '/disp3',
        element: <disp3 />

      },
      {
        path: '/disp4',
        element: <disp4 />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)