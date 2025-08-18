import React from 'react'
import WorkspaceSideBar from '@/components/organisams/workspace/WorkspaceSideBar';
import Workspaceoptions from '@/components/organisams/workspace/Workspaceoptions';
import WorkspacePanel from '@/components/organisams/workspace/WorkspacePanel';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
const Layout = ({ children }) => {
  return (
    <div className='h-full'>
      <Workspaceoptions />
      <div className='flex h-[calc(100vh-40px)]'>
        <WorkspaceSideBar />
        <ResizablePanelGroup direction="horizontal" autoSaveId={'WorkSpaceId'}>
          <ResizablePanel
            className="bg-[#5E2C5F]"
            defaultSize={20}
            minSize={20}
            maxSize={50}
          >
           <WorkspacePanel />
          </ResizablePanel>

          <ResizableHandle withHandle={true}></ResizableHandle>

          < ResizablePanel minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>
  )
}

export default Layout
