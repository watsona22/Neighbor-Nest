import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from '../src/pages/Signup.jsx'
import Login from '../src/pages/Login.jsx'
// import Home from '../src/pages/Home.jsx'
// import ErrorPage from '../src/pages/ErrorPage'
import './index.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <App />
//       }, {
//         path: '/login',
//         element: <Login />
//       }, {
//         path: '/signup',
//         element: <Signup />
//       }
//     ]
//   }
// ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
