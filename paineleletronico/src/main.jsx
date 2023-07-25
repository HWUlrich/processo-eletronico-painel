import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom'

// Páginas
import Disp1 from './routes/disp1';
import Disp2 from './routes/Disp2';
import Disp3 from './routes/Disp3';
import Disp4 from './routes/Disp4';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: 'Disp1',
        element: <Disp1 />
      },
      {
        path: 'Disp2',
        element: <Disp2 />
      },
      {
        path: 'Disp3',
        element: <Disp3 />

      },
      {
        path: 'Disp4',
        element: <Disp4 />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)