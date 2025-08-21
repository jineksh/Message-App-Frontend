import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { toast } from "sonner"; 
import { useParams } from 'react-router-dom';
const InvitePeopleModal = ({ open,setopen,workspacename, joincode }) => {

    async function handleclick() {
        const inviteLink = `${joincode}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.success("Invite link copied to clipboard!");
    }
    const {workspaceid} = useParams();

    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite People to {workspacename}</DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center gap-y-4 py-10'>
                    <p className='font-bold text-4xl Uppercase'>{joincode}</p>
                </div>
                <Button size='sm' variant='ghost' onClick={handleclick}>
                    Copy Link 
                    <CopyIcon className='ml-2 h-4 w-4' />
                </Button>
                <a href={`/workspace/join/${workspaceid}`} className='text-blue-500 hover:underline mt-4'>
                    Redirect to Join Page
                </a>
            </DialogContent>
        </Dialog>
    )
}

export default InvitePeopleModal


