import React from 'react'
import WorkspaceSideBar from '@/components/organisams/workspace/WorkspaceSideBar';
const Layout = ({children}) => {
  return (
    <div className='h-full'>

        <div className='flex h-full'>
            <WorkspaceSideBar />
            {children}
        </div>
      
    </div>
  )
}

export default Layout
