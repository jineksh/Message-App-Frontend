
import CombineContext from "@/utils/CombineContext";

import  { AuthContextProvider }from "@/context/AuthContext.jsx";

export const AppContextProvider = CombineContext(
  AuthContextProvider,
);