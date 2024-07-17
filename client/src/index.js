import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import Login from './views/Login/Login'
import Signup from './views/Signup/Signup';
import Home from './views/Home/Home';
import AddTranscation from './views/AddTranscation/AddTranscation';
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '*',
        element: <h1>404</h1>,
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/signup',
        element: <Signup/>,
    },
    {
        path: '/add',
        element: <AddTranscation/>,
    }
]);
root.render(<RouterProvider router={router} />);
