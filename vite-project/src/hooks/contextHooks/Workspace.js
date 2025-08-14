import { useContext } from "react";
import CreateWorkSpaceContext from "@/context/CreateWorkSpaceModar";


export const useCreateWorkspaceModal = () => {
    return useContext(CreateWorkSpaceContext);
}

