import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useWorkspacePreferenceModal } from "@/hooks/contextHooks/WorkspacePreference";
import { TrashIcon, Pencil } from "lucide-react";
import useDeleteWorkspace from "@/hooks/workspace/useDeleteWorkspace";
import useUpdateWorkspace from "@/hooks/workspace/useUpdateWorkspace";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


const WorkspacePreferenceModal = () => {
  const {
    isWorkspacePreferenceModalOpen,
    setIsWorkspacePreferenceModalOpen,
    intialValue,
    workspace,
  } = useWorkspacePreferenceModal();


  const queryClient = useQueryClient();

  const { deleteWorkspaceMutation } = useDeleteWorkspace();
  const { updateWorkspaceMutation } = useUpdateWorkspace();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(intialValue);

  // ✅ Delete logic
  const handleDelete = async () => {
    try {
      await deleteWorkspaceMutation(workspace._id);
      setIsWorkspacePreferenceModalOpen(false);
      // Invalidate the workspaces query to refresh the list
      toast.success("Workspace deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete workspace:", error);
      toast.error("Failed to delete workspace. Please try again.");
    }
  };

  // ✅ Update logic
  const handleUpdate = async () => {
    try {
      await updateWorkspaceMutation(workspace._id, newName);
      setIsEditing(false);
      setNewName(newName);
      queryClient.invalidateQueries({
        queryKey: ["workspace", workspace._id],
      }); // Invalidate the workspaces query to refresh the list
      toast.success("Workspace updated successfully!");
    } catch (error) {
      console.error("Failed to update workspace:", error);
      toast.error("Failed to update workspace. Please try again.");
    }
  };

  return (
    <Dialog
      open={isWorkspacePreferenceModalOpen}
      onOpenChange={setIsWorkspacePreferenceModalOpen}
    >
      <DialogContent aria-describedby={undefined} className="sm:max-w-lg rounded-2xl shadow-xl p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b bg-white">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Workspace Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-y-5 bg-gray-50">
          {/* Workspace Name Section */}
          <div className="px-5 py-4 bg-white rounded-lg border flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">Workspace Name</p>
              {isEditing ? (
                <input
                  className="border rounded px-2 py-1 text-sm"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              ) : (
                <p className="font-medium text-sm">{intialValue}</p>
              )}
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdate}>Save</Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-sm font-bold text-black hover:underline"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
            )}
          </div>

          {/* Danger Zone */}
          <div className="px-5 py-4 bg-white rounded-lg border flex items-center justify-between hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-2">
              <TrashIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">
                Delete Workspace
              </span>
            </div>
            <Button onClick={handleDelete} variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>

        <DialogFooter className="px-6 py-3 border-t bg-white">
          <Button
            variant="outline"
            onClick={() => setIsWorkspacePreferenceModalOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspacePreferenceModal;
