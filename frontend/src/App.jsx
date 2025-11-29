import React from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import RootLayout from './components/website/RootLayout.jsx';
import Home from './features/home/Home.jsx';
import Shop from './features/shop/Shop.jsx';
import FurnitureDetail from './features/shop/FurnitureDetail.jsx';
import Account from './features/account/Account.jsx';
import Checkout from './features/checkout/Checkout.jsx';
import CartPage from './features/cart/CartPage.jsx';
import ContactPage from './features/contact/ContactPage.jsx';
import Blog from './features/blog/Blog.jsx';
import AuthRedirect from './components/website/AuthRedirect.jsx';
import ProtectedRoute from './components/website/ProtectedRoute.jsx';
import AdminRoute from './components/website/AdminRoute.jsx';
import AdminDashboard from './features/admin/AdminDashboard.jsx';
import AdminLayout from './features/admin/AdminLayout.jsx';
import AddItems from './features/admin/AddItems.jsx';
import UpdateItems from './features/admin/UpdateItems.jsx';
import OrderUi from './features/admin/OrderUi.jsx';
import Search from './features/search/Search.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'furniture/:id', element: <FurnitureDetail /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'blog', element: <Blog /> },
        { path: 'search', element: <Search /> },


        // Prevent login page after logging in
        {
          element: <AuthRedirect />,
          children: [
            { path: 'account', element: <Account /> }
          ]
        },


        // Protected user-only routes
        {
          element: <ProtectedRoute />,
          children: [
            { path: 'checkout', element: <Checkout /> },
            { path: 'cart', element: <CartPage /> },
          ]
        },

      ]

    },

    // Admin routes (separate layout)
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "addItems", element: <AddItems /> },
            { path: "update-items/:id", element: <UpdateItems /> },
            { path: "orders", element: <OrderUi /> },
          ]
        }
      ]
    }


  ]);
  return <RouterProvider router={router} />
}
