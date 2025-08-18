import React from 'react'
import { Button } from '@/components/ui/button';
import useGetWorkspaceById from '@/hooks/workspace/useGetWorkspaceById';
import { useParams } from 'react-router-dom';
import { Info, InfoIcon, SearchIcon } from 'lucide-react';
const Workspaceoptions = () => {
    const { workspaceid } = useParams()
    const { workspace } = useGetWorkspaceById(workspaceid);

    console.log("Workspace options for:", workspace);


    return (
        <nav className='flex items-center justify-center h-10 p-1.5 bg-[#481349]'>

            <div className='flex-1 flex items-center justify-start'></div>

            <div>
                <Button size="sm" className='text-white text-xs flex bg-accent/15 hover:bg-accent/15 w-full justify-start h-7 px-2'>
                    <SearchIcon className='size-4 mr-1' />
                    <span className="text-white">
                        Search {workspace?.name || 'Workspace'}
                    </span>
                </Button>
            </div>

            <div className='flex-1 flex items-center justify-end ml-auto'>

                <Button className="bg-transparent hover:bg-accent/25 text-accent">
                    <InfoIcon className='size-4 mr-1' />
                </Button>

            </div>

        </nav>
    )
}

export default Workspaceoptions
