import { Routes, Route } from "react-router-dom";
import SignUpContainer from "./components/organisams/SignUpContainer";
import SignInContainer from "./components/organisams/SignInContainer";
import NotFound from "./pages/Notfound/Notfound";
import Auth from "./pages/auth/Auth";
import Start from "./pages/StartPage/StartPage";
import Home from "./pages/Home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { AppContextProvider } from "./context/AppContext";
import ProtectedRoutes from "./components/morecules/ProtectedRoutes";
import CreateWorkSpaceModal from "@/components/morecules/CreateWorkSpaceModal";
import WorkspaceLayout from "@/pages/Workspace/Layout";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <div className="h-screen w-screen">
      <QueryClientProvider client={queryClient} >
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/auth/signup" element={<Auth><SignUpContainer></SignUpContainer></Auth>} />
            <Route path="/auth/signin" element={<Auth><SignInContainer /></Auth>} />
            <Route path="/Home" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path="/workspace/:workspaceid" element={<ProtectedRoutes><WorkspaceLayout /></ProtectedRoutes>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <CreateWorkSpaceModal />
        </AppContextProvider>
      </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
