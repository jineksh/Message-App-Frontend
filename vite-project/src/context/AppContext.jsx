
import CombineContext from "@/utils/CombineContext";

import  { AuthContextProvider }from "@/context/AuthContext.jsx";
import { CreateWorkSpaceContextProvider } from "./CreateWorkSpaceModar";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkSpaceContextProvider
);