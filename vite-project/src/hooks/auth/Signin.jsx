import { singIn } from "@/apis/auth/index.jsx"; 
// 🔹 Backend se sign-in API call karne ke liye function import kar rahe ho

import { useMutation } from "@tanstack/react-query"; 
// 🔹 React Query ka useMutation hook import kiya jo API call ka state manage karega

import { toast } from "sonner" 
// 🔹 Toast notification dikhane ke liye (success/error messages)

export const useSignIn = () => {
  const {
    isPending, // 🔹 Jab tak API call chal rahi hai, true hoga (loading state)
    isSuccess, // 🔹 API call success hone par true hoga
    isError,   // 🔹 API call fail hone par true hoga
    mutateAsync: signInMutation, // 🔹 Ye function call karne par API request fire hoti hai
  } = useMutation({
    mutationFn: singIn, // 🔹 Ye wo API function hai jo sign-in request bhejta hai

    onSuccess: (data) => {
      console.log(data); // 🔹 API se aaya pura response print karna

      // 🔹 Agar API se data aaya hai to token ko localStorage me save karna
      if (data?.data) { 
        localStorage.setItem("authToken", data.data); 
        // 🔹 "authToken" key me token store ho jayega, taaki future API calls me use ho sake
      }

      console.log(data.data); // 🔹 Sirf token ya data print karna
      toast("You're signed in! Let's get to work.") 
      // 🔹 Success message dikhana
    },

    onError: (error) => {
      console.error(error); // 🔹 Error details print karna
      toast(error.message); // 🔹 User ko error ka message dikhana
    },
  });

  // 🔹 Ye return me states aur API call trigger function (signInMutation) de raha hai
  return { isPending, isSuccess, isError, signInMutation };
};
