import {deleteWorkspace} from '@/apis/workspace/index';

import { useMutation } from "@tanstack/react-query";


const useDeleteWorkspace = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn:deleteWorkspace, // Function to call the API for creating workspace

    onSuccess: (data) => {
      console.log("Workspace deleted successfully:", data);
    },

    onError: (error) => {
      console.error("Error deleted workspace:", error);
    },
  });

  return { isPending, isSuccess, isError, deleteWorkspaceMutation };
}

export default useDeleteWorkspace;