import React from 'react'
import WorkspaceSideBar from '@/components/organisams/workspace/WorkspaceSideBar';
import Workspaceoptions from '@/components/organisams/workspace/Workspaceoptions';
const Layout = ({children}) => {
  return (
    <div className='h-full'>
      <Workspaceoptions />
        <div className='flex h-[calc(100vh-40px)]'>
            <WorkspaceSideBar />
            {children}
        </div>
      
    </div>
  )
}

export default Layout
