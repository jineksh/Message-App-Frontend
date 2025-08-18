import React from 'react'
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useNavigate } from 'react-router-dom';
import useGetWorkspaceById from '@/hooks/workspace/useGetWorkspaceById';
import useFetchWorkspace from '@/hooks/workspace/useFetchWorkspace';

const WorkspaceSwitcher = () => {
    const navigate = useNavigate();
    const { workspaceid } = useParams();
    const { isPending, workspace } = useGetWorkspaceById(workspaceid);

    const { workspaces } = useFetchWorkspace();

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="size-9 relative overflow-hidden bg-[#ABABAD] text-slate-800 font-semibold rounded hover:bg-[#9A9A9C] transition-colors flex items-center justify-center"
                        onClick={() => navigate(`/workspace/${workspaceid}`)}
                    >
                        {isPending ? (
                            // 🔹 Spinner Loader
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            workspace
                                ? workspace.name.charAt(0).toUpperCase()
                                : "?"
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {/* Active Workspace */}
                    <DropdownMenuItem>
                        {workspace ? workspace.name : "Loading..."}
                        <span className='ml-2 text-xs text-muted-foreground'>
                            (Active Workspace)
                        </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* All Workspaces */}
                    {workspaces?.map((ws) => (
                        <DropdownMenuItem
                            key={ws._id}
                            className="cursor-default focus:bg-transparent hover:bg-transparent"
                        >
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm truncate max-w-[150px]">{ws.name}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 text-xs"
                                    onClick={() => navigate(`/workspace/${ws._id}`)}
                                >
                                    Switch
                                </Button>
                            </div>
                        </DropdownMenuItem>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default WorkspaceSwitcher;
