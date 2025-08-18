import React from 'react'
import { Button } from '@/components/ui/button'
const SidebarButton = ({Icon,label,isActive}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-0.5 group cursor-pointer'>
        <Button className="bg-transparent hover:bg-accent text-accent size-9 p-2 group-hover:bg-accent/20 ">
            <Icon className="size-5 text-white group-hover:scale-110 transition-all"></Icon>
        </Button>
        <span className='text-white text-[10px] group-hover:text-accent '>
            {label}
        </span>
    </div>
  )
}

export default SidebarButton
