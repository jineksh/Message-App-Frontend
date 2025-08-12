import { Routes, Route } from "react-router-dom";
import SignUpContainer from "./components/organisams/SignUpContainer";
import SignInCard from "./components/organisams/signInCard";
import NotFound from "./pages/Notfound/Notfound";
import Auth from "./pages/auth/Auth";
import Home from "./pages/HomePage/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

function App() {
   const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Auth><SignUpContainer></SignUpContainer></Auth>} />
        <Route path = "/auth/signin" element={<Auth><SignInCard></SignInCard></Auth>} />
        <Route path = "*"  element = {<NotFound />}/>
      </Routes>
      <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
