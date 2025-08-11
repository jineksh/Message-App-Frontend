import { Routes, Route } from "react-router-dom";
import SingUpCard from "./components/organisams/singUpcard";
import SignInCard from "./components/organisams/signInCard";
import NotFound from "./pages/Notfound/Notfound";
import Auth from "./pages/auth/Auth";
import Home from "@/pages/HomePage/HomePage"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Auth><SingUpCard></SingUpCard></Auth>} />
        <Route path = "/auth/signin" element={<Auth><SignInCard></SignInCard></Auth>} />
        <Route path = "*"  element = {<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
