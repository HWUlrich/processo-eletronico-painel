import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Páginas
import Disp1 from './routes/Disp1.jsx';
import Disp2 from './routes/Disp2.jsx';
import Disp3 from './routes/Disp3.jsx';
import Disp4 from './routes/Disp4.jsx';


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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);