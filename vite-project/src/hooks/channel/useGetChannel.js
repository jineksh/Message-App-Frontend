import { getChannelById } from "@/apis/Channel/index.js";
import { useQuery } from "@tanstack/react-query";
const useGetChannelById = (id) => {
    const {
        isPending,
        isSuccess,
        isError,
        data: channel,
    } = useQuery({
        queryKey: [`channel-${id}`],
        queryFn: () => getChannelById(id),
        staleTime: 30000, // Function to call the API for fetching workspaces
        onSuccess: (data) => {
            console.log("Fetched workspace successfully:", data);
            console.log("Fetched workspaces successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching workspaces:", error);
        },
    });

    return { isPending, isSuccess, isError, channel };
}

export default useGetChannelById;