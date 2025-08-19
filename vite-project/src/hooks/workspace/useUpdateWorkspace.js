import {updateWorkspace} from '@/apis/workspace/index';

import { useMutation } from "@tanstack/react-query";


const useUpdateWorkspace = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn:updateWorkspace, // Function to call the API for creating workspace

    onSuccess: (data) => {
      console.log("Workspace update successfully:", data);
    },

    onError: (error) => {
      console.error("Error update workspace:", error);
    },
  });

  return { isPending, isSuccess, isError, updateWorkspaceMutation };
}

export default useUpdateWorkspace;