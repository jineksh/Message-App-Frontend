import {createWorkspace} from '@/apis/workspace/index';

import { useMutation } from "@tanstack/react-query";


const useCreateWorkspace = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: createWorkspace, // Function to call the API for creating workspace

    onSuccess: (data) => {
      console.log("Workspace created successfully:", data);
    },

    onError: (error) => {
      console.error("Error creating workspace:", error);
    },
  });

  return { isPending, isSuccess, isError, createWorkspaceMutation };
}

export default useCreateWorkspace;