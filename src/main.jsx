import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Viewstory from './Viewstory.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/stories/:id', // ✅ route must match your URL pattern
    element: <Viewstory />
  },{
    path: '/profile',
    element:<Profile/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
