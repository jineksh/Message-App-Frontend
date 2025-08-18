import React, { useEffect } from 'react'
import Useravtar from '@/components/atoms/Useravtar'
import useFetchWorkspace from '@/hooks/workspace/useFetchWorkspace'
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { isPending, isSuccess, isError, workspaces } = useFetchWorkspace();
  const navigate = useNavigate();

  // Handle error
  useEffect(() => {
    if (isError) {
      console.error("Error fetching workspaces:", isError);
      toast.error("Failed to load workspaces. Please try again.");
    }
  }, [isError]);

  // Navigate when workspaces are fetched
  useEffect(() => {
    if (isSuccess && workspaces?.length > 0) {
      navigate(`/workspace/${workspaces[0]._id}`);
    }
  }, [isSuccess, workspaces, navigate]);

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
        <div className="text-red-500">Unable to fetch workspaces </div>
      )}

      {/* Workspaces List */}
      {isSuccess && workspaces?.length === 0 && (
        <p>No workspaces found.</p>
      )}
    </div>
  );
};

export default Home;
