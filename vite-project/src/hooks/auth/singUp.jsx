import { singUp } from "@/apis/auth/index.jsx";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"
export const useSignUp = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: signUpMutation,
  } = useMutation({
    mutationFn: singUp,
    onSuccess: (data) => {
      console.log(data);
      toast('Welcome to the community! Lets get you started.')
    },
    onError: (error) => {
      console.error(error);
      toast(error.message);
    },
  });

  return { isPending, isSuccess, isError, signUpMutation };
};
