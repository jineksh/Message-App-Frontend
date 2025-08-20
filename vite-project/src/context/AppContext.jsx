
import CombineContext from "@/utils/CombineContext";

import  { AuthContextProvider }from "@/context/AuthContext.jsx";
import { CreateWorkSpaceContextProvider } from "./CreateWorkSpaceModar";
import { WorkspacePreferenceContextProvider } from "./WorkspacePreferenceModal";
import { CreateChannelContextProvider } from "./CreateChannelModal.jsx";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkSpaceContextProvider,
  WorkspacePreferenceContextProvider,
  CreateChannelContextProvider
);