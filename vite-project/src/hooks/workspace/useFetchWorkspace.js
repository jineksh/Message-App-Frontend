import {getWorkspaces} from '@/apis/workspace/index.js';
import { useQuery } from "@tanstack/react-query";
const useFetchWorkspace = () => {
  const {
    isPending,
    isSuccess,
    isError,
    data: workspaces,
  } = useQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspaces,
    staleTime : 30000, // Function to call the API for fetching workspaces
    onSuccess: (data) => {
      console.log("Fetched workspaces successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching workspaces:", error);
    },
  });

  return { isPending, isSuccess, isError, workspaces };
}

export default useFetchWorkspace;