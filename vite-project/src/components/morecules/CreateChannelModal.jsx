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

const CreateChannelModal = () => {
  const { isCreateChannelModalOpen, setIsCreateChannelModalOpen } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!channelName.trim()) return;
    // 👇 yaha aap backend API call ya context dispatch kar sakte ho
    console.log("New Channel:", { channelName, description });

    // Reset fields & close modal
    setChannelName("");
    setDescription("");
    setIsCreateChannelModalOpen(false);
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
          <Button onClick={handleCreate} disabled={!channelName.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
