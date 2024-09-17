import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Provider from './context/Provider.jsx';

// Páginas
import Disp1 from './routes/Disp1.jsx'; 
import Disp2 from './routes/Disp2.jsx';
import Disp3 from './routes/Disp3.jsx';
import Disp4 from './routes/disp4.jsx';
import MesaDir from './routes/mesaDir.jsx';


const router = createBrowserRouter([
  {    
    element: <Provider>
               <App />
             </Provider>,
    children: [
      {
        path: '/Disp1',
        element: <Disp1 />
      },
      {
        path: '/Disp2',
        element: <Disp2 />
      },
      {
        path: '/Disp3',
        element: <Disp3 />

      },
      {
        path: '/Disp4',
        element: <Disp4 />        
      },
      {
        path: '/MesaDir',
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