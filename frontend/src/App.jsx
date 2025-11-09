import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import RootLayout from './components/website/RootLayout.jsx';
import Home from './features/home/Home.jsx';
import Shop from './features/shop/Shop.jsx';
import FurnitureDetail from './features/shop/FurnitureDetail.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element: <RootLayout/>,
      children: [
        {
          index : true,
          element : <Home/>
        },

        {
          path:'shop',
          element: <Shop/>
        },

        {
          path:'furniture',
          element: <FurnitureDetail/>
        },
      ]

    }
  ]);
  return <RouterProvider router={router}/>
}
