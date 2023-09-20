import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Páginas
import Disp1 from './routes/disp1.jsx';
import Disp2 from './routes/disp2.jsx';
import Disp3 from './routes/disp3.jsx';
import Disp4 from './routes/disp4.jsx';
import MesaDir from './routes/mesaDir.jsx';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/disp1',
        element: <Disp1 />
      },
      {
        path: '/disp2',
        element: <Disp2 />
      },
      {
        path: '/disp3',
        element: <Disp3 />

      },
      {
        path: '/disp4',
        element: <Disp4 />        
      },
      {
        path: '/mesaDir',
        element: <MesaDir />        
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);