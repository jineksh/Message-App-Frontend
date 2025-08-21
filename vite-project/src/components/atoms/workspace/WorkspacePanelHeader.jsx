import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, ListFilter, SquarePen } from 'lucide-react'   // ✅ Icons import
import { useAuth } from '@/hooks/contextHooks/Auth'
import { useWorkspacePreferenceModal } from '@/hooks/contextHooks/WorkspacePreference'
import { useCreateChannelModal } from '@/hooks/contextHooks/Channel'
import InvitePeopleModal from '@/components/morecules/InvitePeopleModal'
const WorkspacePanelHeader = ({ workspace }) => {
  const { Auth } = useAuth();
  const { setIsCreateChannelModalOpen } = useCreateChannelModal();

  // 🔹 Safe check for owner from `workspace.owner`
  const isOwner =
    workspace?.owner === Auth?.user?._id ||
    workspace?.owner?._id === Auth?.user?._id;

  console.log("Is Owner? ", isOwner);

  const [open, setopen] = React.useState(false);

  const { intialValue, isWorkspacePreferenceModalOpen,
    setIsWorkspacePreferenceModalOpen, setIntialValue } = useWorkspacePreferenceModal();

  return (
    <>
    <InvitePeopleModal open={open} setopen={setopen} workspacename={workspace.name} joincode={workspace.joincode}/>
    <div className="flex items-center justify-between px-4 h-[50px] gap-2">
      {/* Workspace Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-white font-semibold text-base flex items-center gap-1 bg-accent/10 hover:bg-accent/20 rounded-md px-3"
          >
            <span className="truncate max-w-[180px]">
              {workspace?.name || 'Workspace'}
            </span>
            <ChevronDownIcon className="w-4 h-4 opacity-80" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="start" className="w-56">
          {/* Active Workspace Info */}
          <DropdownMenuItem className="cursor-default focus:bg-transparent">
            <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold rounded-md mr-2 flex items-center justify-center">
              {workspace?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col items-start">
              <p className="font-bold text-xs">{workspace?.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                Active Workspace
              </p>
            </div>
          </DropdownMenuItem>

          {/* 🔹 Extra options only for owner */}
          {isOwner && (
            <>
              <DropdownMenuItem onClick={() => {
                setIsWorkspacePreferenceModalOpen(true);
                setIntialValue(workspace.name);
              }} className="text-sm cursor-pointer">
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>setopen(true)} className="text-sm cursor-pointer">
                Invite Members to {workspace?.name}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>setIsCreateChannelModalOpen(true)}  className="text-sm cursor-pointer">
                Create Channel
              </DropdownMenuItem>

            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🔹 Extra Action Icons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-accent/20">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-accent/20">
          <SquarePen className="h-4 w-4" />
        </Button>
      </div>
    </div>
    </>
  )
}

export default WorkspacePanelHeader
