import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGetWorkspaceById from '@/hooks/workspace/useGetWorkspaceById';
import { AlertTriangleIcon, HashIcon, MessageSquareText, PlusIcon } from 'lucide-react';
import WorkspacePanelHeader from '@/components/atoms/workspace/WorkspacePanelHeader';
import { useWorkspacePreferenceModal } from '@/hooks/contextHooks/WorkspacePreference';
import SideBarItem from '@/components/atoms/SideBarItem';
import WorkspacePanelSection from '@/components/organisams/workspace/WorkspacePanelSection';
import { useCreateChannelModal } from '@/hooks/contextHooks/Channel';

const WorkspacePanel = () => {
  const { workspaceid } = useParams();
  const { workspace, isPending } = useGetWorkspaceById(workspaceid);
  const { setworkspace } = useWorkspacePreferenceModal();
  const { setIsCreateChannelModalOpen } = useCreateChannelModal();

  console.log('WorkspacePanel-workspace id', workspaceid)

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

      {/* Default Sidebar Items */}
      <div className='flex flex-col px-2 mt-3'>
        <SideBarItem label="Threads" icon={MessageSquareText} channelid="threads" variant='defulat' />
        <SideBarItem label="Mentions & reactions" icon={AlertTriangleIcon} channelid="mentions" variant='default' />
      </div>

      {/* Channels Section */}
      <div className='flex flex-col gap-y-2 mt-3'>
        <WorkspacePanelSection
          label={
            <div className="flex items-center justify-between w-full pr-1">
              <span>Channels</span>
              <button
                onClick={() => setIsCreateChannelModalOpen(true)}
                className="hover:bg-white/10 p-1 rounded-full ml-2"
              >
                <PlusIcon className="w-4 h-4 text-white" />
              </button>
            </div>
          }
        >
          {workspace.channels.map((channel) => (
            <SideBarItem
              key={channel._id}
              label={channel.name}
              icon={HashIcon}
              channelid={channel._id}
              variant='default'
            />
          ))}
        </WorkspacePanelSection>
      </div>
    </div>
  )
}

export default WorkspacePanel
