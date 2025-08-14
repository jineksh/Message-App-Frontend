import { singIn } from "@/apis/auth/index.jsx"; 
// 🔹 Backend se sign-in API call karne ke liye function import

import { useMutation } from "@tanstack/react-query"; 
// 🔹 React Query ka useMutation hook jo API call ka state manage karega

import { toast } from "sonner"; 
// 🔹 Toast notification dikhane ke liye (success/error messages)

import { useAuth } from "../contextHooks/Auth"; 
// 🔹 Auth context hook import jo user/token state manage karega

export const useSignIn = () => {
  const { setAuth } = useAuth(); // 🔹 Context se setAuth function liya

  const {
    isPending, // 🔹 Jab tak API call chal rahi hai, true hoga (loading state)
    isSuccess, // 🔹 API call success hone par true hoga
    isError,   // 🔹 API call fail hone par true hoga
    mutateAsync: signInMutation, // 🔹 Ye function call karne par API request fire hoti hai
  } = useMutation({
    mutationFn: singIn, // 🔹 Ye wo API function hai jo sign-in request bhejta hai

    //  API call success hone par
    onSuccess: (data) => {
      console.log("API Response:", data); // 🔹 Backend se aaya full response print

      //  Safe destructuring of backend response
      const user = data?.data?.user || null;
      const token = data?.data?.token || null;

      //  Agar user aur token dono present hai tabhi store karo
      if (user && token) {
        // LocalStorage me safe tarike se save karo
        localStorage.setItem("user", JSON.stringify(user)); // User object ko string me convert
        localStorage.setItem("token", token); // Token ko direct string me store

        //  Auth context update karo
        setAuth({
          user,
          token,
          isLoading: false,
        });

        toast("You're signed in! Let's get to work."); // 🔹 Success toast message
      } else {
        toast("Invalid response from server"); // 🔹 Agar data incomplete hua to error toast
      }
    },

    //  Agar API call fail hui to
    onError: (error) => {
      console.error("Login Error:", error); // 🔹 Error details print
      toast(error.message || "Login failed!"); // 🔹 User ko error ka message dikhana
    },
  });

  // 🔹 Return me mutation function & states bhej rahe hai
  return { isPending, isSuccess, isError, signInMutation };
};
