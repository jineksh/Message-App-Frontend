import {getWorkspaceById} from '@/apis/workspace/index.js';
import { useQuery } from "@tanstack/react-query";
const useGetWorkspaceById = (id) => {
  const {
    isPending,
    isSuccess,
    isError,
    data: workspace,
  } = useQuery({
    queryKey: [`workspace-${id}`],
    queryFn: getWorkspaceById,
    staleTime : 30000, // Function to call the API for fetching workspaces
    onSuccess: (data) => {
      console.log("Fetched workspaces successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching workspaces:", error);
    },
  });

  return { isPending, isSuccess, isError, workspace };
}

export default useGetWorkspaceById;