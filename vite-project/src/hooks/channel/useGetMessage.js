import { getMessage } from "@/apis/Channel/index.js";
import { useQuery } from "@tanstack/react-query";
export const useGetMessages = (channelId) => {
    const {
        isPending,
        isSuccess,
        isError,
        data: messages,
    } = useQuery({
        queryKey: ['getMessages',channelId],
        queryFn: () => getMessage({channelId,page : 1,limit : 10}),
        staleTime: 30000, // Function to call the API for fetching workspaces
        onSuccess: (data) => {
            console.log("Fetched message successfully:", data);
            
        },
        onError: (error) => {
            console.error("Error fetching messages:", error);
        },
    });

    return { isPending, isSuccess, isError, messages };
}
