import { useContext } from "react";

import WorkspacePreferenceContext from "@/context/WorkspacePreferenceModal";

export const useWorkspacePreferenceModal = () => {
    return useContext(WorkspacePreferenceContext);
}

