import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
const sideBarItemVariants = cva(
    'flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481350] bg-white/90 hover:bg-white/80'
            }
        },
        defaultVariants: 'default'
    }
);
const SideBarItem = ({
    label,
    icon: Icon,
    variant,
    channelid,
}) => {

    const { workspaceid } = useParams();
    return (
        <Button
            variant='transparent'
            size='sm'
            className={cn(sideBarItemVariants({variant}))}
        >
            <Link className='flex items-center gap-1.5' to={`/workspace/${workspaceid}/channels/${channelid}`}>
                <Icon className='size-3.5 mr-1' />
                <span className='text-sm'>{label}</span>
            </Link>
        </Button>
    )
}

export default SideBarItem
