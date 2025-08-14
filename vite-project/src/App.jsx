import { Routes, Route } from "react-router-dom";
import SignUpContainer from "./components/organisams/SignUpContainer";
import SignInContainer from "./components/organisams/SignInContainer";
import NotFound from "./pages/Notfound/Notfound";
import Auth from "./pages/auth/Auth";
import Home from "./pages/HomePage/HomePage";
import Workspace from "./pages/workspace/Workspace";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { AppContextProvider } from "./context/AppContext";
import ProtectedRoutes from "./components/morecules/ProtectedRoutes";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/auth/signup" element={<Auth><SignUpContainer></SignUpContainer></Auth>} />
            <Route path="/auth/signin" element={<Auth><SignInContainer /></Auth>} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AppContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
