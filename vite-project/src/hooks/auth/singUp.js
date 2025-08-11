import { signUp } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutate: signUpMutation,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { isPending, isSuccess, isError, signUpMutation };
};
