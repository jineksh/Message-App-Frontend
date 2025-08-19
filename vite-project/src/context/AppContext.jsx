
import CombineContext from "@/utils/CombineContext";

import  { AuthContextProvider }from "@/context/AuthContext.jsx";
import { CreateWorkSpaceContextProvider } from "./CreateWorkSpaceModar";
import { WorkspacePreferenceContextProvider } from "./WorkspacePreferenceModal";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkSpaceContextProvider,
  WorkspacePreferenceContextProvider
);