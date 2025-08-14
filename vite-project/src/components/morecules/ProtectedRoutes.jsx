import React from 'react'
import { useAuth } from '@/hooks/contextHooks/Auth'
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({children}) => {

    const { Auth } = useAuth();

    // Check if the user is authenticated

    console.log('ProtectedRoutes Auth:', Auth);
    
    if(Auth.isLoading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    if(!Auth.user || !Auth.token) {
        return <Navigate to="/auth/signin" replace={true} />; // Redirect to login page if
    }

  return (
    <div className='w-full h-full'>
        {children} {/* Render the protected component if authenticated */}
    </div>
  )
}

export default ProtectedRoutes

