import React, { useState, useEffect } from "react";
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
import  { useCreateWorkspaceModal } from "@/hooks/contextHooks/Workspace";
import useCreateWorkspace from "@/hooks/workspace/useCreateWorkspace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateWorkSpaceModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const { isPending, createWorkspaceMutation } = useCreateWorkspace();
    const { isCreateWorkSpaceModalOpen, setIsCreateWorkSpaceModalOpen } = useCreateWorkspaceModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Workspace name is required");
            return;
        }

        try {
            const workspaceData = { name, description };
            const response = await createWorkspaceMutation(workspaceData);
            if (response) {
                toast.success("Workspace created successfully 🎉");
                setIsCreateWorkSpaceModalOpen(false); // Close modal on success
                console.log("Workspace created:", response.data);
                navigate(`/workspace/${response.data._id}`); // Redirect to the new workspace
                
            }
        } catch (err) {
            console.error("Error creating workspace:", err);
            toast.error("Failed to create workspace. Please try again.");
        }
    };

    // Reset fields when modal closes
    useEffect(() => {
        if (!isCreateWorkSpaceModalOpen) {
            setName("");
            setDescription("");
        }
    }, [isCreateWorkSpaceModalOpen]);

    return (
        <Dialog
            open={isCreateWorkSpaceModalOpen}
            onOpenChange={(open) => setIsCreateWorkSpaceModalOpen(open)}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a new workspace</DialogTitle>
                    <DialogDescription>
                        Organize your projects and team in one place.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                    {/* Name */}
                    <div className="grid gap-2">
                        
                        <Input
                            id="ws-name"
                            placeholder="e.g. Team Alpha"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={60}
                            autoFocus
                        />
                        <span className="text-xs text-muted-foreground">{name.length}/60</span>
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                       
                        <Input
                            id="ws-desc"
                            placeholder="What is this workspace about?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={200}
                        />
                        <span className="text-xs text-muted-foreground">{description.length}/200</span>
                    </div>

                    <DialogFooter className="mt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setIsCreateWorkSpaceModalOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating…" : "Create Workspace"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkSpaceModal;
