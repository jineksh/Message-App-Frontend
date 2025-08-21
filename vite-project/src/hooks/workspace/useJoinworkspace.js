import {joinWorkspace} from '@/apis/workspace/index';

import { useMutation } from "@tanstack/react-query";


const usejoinWorkspace = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: joinWorkspaceMutation,
  } = useMutation({
    mutationFn:joinWorkspace, // Function to call the API for creating workspace

    onSuccess: (data) => {
      console.log("joined Workspace successfully:", data);
    },

    onError: (error) => {
      console.error("Error  workspace:", error);
    }
  });

  return { isPending, isSuccess, isError,joinWorkspaceMutation };
}

export default usejoinWorkspace;