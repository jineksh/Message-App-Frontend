import {addChannelToWorkspace} from '@/apis/workspace/index';

import { useMutation } from "@tanstack/react-query";


const useAddChannel = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: addChannelMutation,
  } = useMutation({
    mutationFn:addChannelToWorkspace, // Function to call the API for creating workspace

    onSuccess: (data) => {
      console.log("channel added successfully:", data);
    },

    onError: (error) => {
      console.error("Error in add channel workspace:", error);
    },
  });

  return { isPending, isSuccess, isError, addChannelMutation };
}

export default useAddChannel;