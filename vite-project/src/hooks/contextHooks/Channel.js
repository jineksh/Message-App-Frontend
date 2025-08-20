import { useContext } from "react";
import CreateChannelModalContext from "@/context/CreateChannelModal";


export const useCreateChannelModal = () => {
    return useContext(CreateChannelModalContext);
}

