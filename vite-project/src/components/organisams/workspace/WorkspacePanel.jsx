import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGetWorkspaceById from '@/hooks/workspace/useGetWorkspaceById';
import { AlertTriangleIcon } from 'lucide-react';
import WorkspacePanelHeader from '@/components/atoms/workspace/WorkspacePanelHeader';
import { useWorkspacePreferenceModal } from '@/hooks/contextHooks/WorkspacePreference';

const WorkspacePanel = () => {
  const { workspaceid } = useParams();
  const { workspace, isPending } = useGetWorkspaceById(workspaceid);
  const { setworkspace } = useWorkspacePreferenceModal();

  useEffect(() => {
    if (workspace) {
      setworkspace(workspace);
    }
  }, [workspace, setworkspace]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!workspace) {
    return (
      <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
        <AlertTriangleIcon className='size-6 text-red-500' />
        <p className='text-lg'>Workspace not found</p>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col bg-[#5E2C5F]'>
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  )
}

export default WorkspacePanel
