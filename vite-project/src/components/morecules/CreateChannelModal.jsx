import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/contextHooks/Channel";
import useAddChannel from "@/hooks/workspace/useAddChannel";
import { useWorkspacePreferenceModal } from "@/hooks/contextHooks/WorkspacePreference";
import { toast } from "sonner"; // 👈 added

const CreateChannelModal = () => {
    const { isCreateChannelModalOpen, setIsCreateChannelModalOpen } =
        useCreateChannelModal();

    const { workspace } = useWorkspacePreferenceModal();

    const { isError, isPending, isSuccess, addChannelMutation } = useAddChannel();

    const [channelName, setChannelName] = useState("");
    

    const handleCreate = async () => {
        if (!channelName.trim()) return;

        // Call API with useAddChannel hook
        await addChannelMutation(
            {
                name: channelName,
                workspaceid : workspace._id,
                
            },
            {
                onSuccess: () => {
                    toast.success("Channel created successfully 🎉"); // 👈 toast
                    // Reset fields & close modal
                    setChannelName("");
                    setIsCreateChannelModalOpen(false);
                },
                onError: (error) => {
                    console.error("Failed to create channel:", error);
                    toast.error("Failed to create channel ❌"); // 👈 toast
                },
            }
        );
    };

    return (
        <Dialog open={isCreateChannelModalOpen} onOpenChange={setIsCreateChannelModalOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create a new Channel</DialogTitle>
                    <DialogDescription>
                        Enter a channel name to create a new channel.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Channel Name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateChannelModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={!channelName.trim() || isPending}>
                        {isPending ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>

                {/* Error Handling */}
                {isError && (
                    <p className="text-red-500 text-sm mt-2">Failed to create channel. Try again.</p>
                )}
                {isSuccess && (
                    <p className="text-green-500 text-sm mt-2">Channel created successfully!</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;
