import React from 'react'
import Useravtar from '@/components/atoms/Useravtar'
import SidebarButton from '@/components/morecules/sidebar/SidebarButton'
import { BellIcon, HomeIcon, MessagesSquareIcon, MoreHorizontalIcon } from 'lucide-react'
const WorkspaceSideBar = () => {
    return (
        <aside className='w-[70px] h-full bg-[#481349] flex flex-col items-center gap-y-4 pt-[10px] pb-[5px]'>
            <SidebarButton Icon={HomeIcon} label="Home" />

            <SidebarButton Icon={MessagesSquareIcon} label="DMs" />

            <SidebarButton Icon={BellIcon} label="Notifications" />

            <SidebarButton Icon={MoreHorizontalIcon} label="More" />
            
            <div className=' flex  flex-col mt-auto gap-y-1 justify-center items-center'>
                <Useravtar />
            </div>

            
        </aside>

     

    )
}

export default WorkspaceSideBar
