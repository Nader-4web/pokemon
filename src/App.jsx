import Home from './pages/Home'
import Favoris from './pages/Favoris'
import './style/App.css'
import './style/range.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/favoris',
      element: <Favoris />,
    },
  
  ]);

  return <RouterProvider router={router} />;
  

}

export default App
