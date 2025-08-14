import React, { useEffect } from 'react'
import Useravtar from '@/components/atoms/Useravtar'
import useFetchWorkspace from '@/hooks/workspace/useFetchWorkspace'
import { toast } from "sonner"

const Workspace = () => {
  const { isPending, isSuccess, isError, workspaces } = useFetchWorkspace();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching workspaces:", isError);
      toast.error("Failed to load workspaces. Please try again."); // 🔹 Error toast
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      console.log("Fetched workspaces successfully:", workspaces);
    }
  }, [isSuccess, workspaces]);

  return (
    <div className="p-4">
      {/* Top Bar with Avatar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Workspaces</h1>
        <Useravtar />
      </div>

      {/* Loader */}
      {isPending && (
        <div className="text-gray-500">Loading workspaces...</div>
      )}

      {/* Error Fallback */}
      {isError && !isPending && (
        <div className="text-red-500">Unable to fetch workspaces 😢</div>
      )}

      {/* Workspaces List */}
      {isSuccess && workspaces?.length > 0 ? (
        <ul className="space-y-2">
          {workspaces.map((ws) => (
            <li
              key={ws._id}
              className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
            >
              <h2 className="font-semibold">{ws.name}</h2>
              <p className="text-sm text-gray-600">{ws.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        isSuccess && <p>No workspaces found.</p>
      )}
    </div>
  );
};

export default Workspace;
