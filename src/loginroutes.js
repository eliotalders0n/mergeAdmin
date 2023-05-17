import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import NotFound from './pages/Page404';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';

import ResetPasswordForm from './pages/ResetPasswordForm';

 

// ----------------------------------------------------------------------

export default function LoginRoutes() {


  return useRoutes([

      {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [         
          { path: '/', element:<Login /> },  
          { path: '/register', element:<Register /> },  
          { path: '/reset_password', element:<ResetPasswordForm /> },  
          { path: '404', element: <NotFound /> },     
          { path: '*', element: <Navigate to="/" /> } 
           ]
      }
    ]);
 
}

 