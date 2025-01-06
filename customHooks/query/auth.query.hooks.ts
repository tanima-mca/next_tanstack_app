import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/gloBalHooks";
import { loginProps, registerProps } from "@/typeScript/auth.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginFn, registerFn } from "@/api/funcTions/auth.api";

export const loginMutation = (): UseMutationResult<loginProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();
  return useMutation<loginProps, void, unknown>({
    mutationFn: loginFn,
    onSuccess: (res) => {
      const { token, status, message, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError: (error: any) => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
};

export const registerMutation = (): UseMutationResult<registerProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();
  return useMutation<registerProps, void, unknown>({
    mutationFn: registerFn,
    onSuccess: (res) => {
      const { token, status, message, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      }

      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
    onError: (error: any, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["REGISTER"] });
    },
  });
};
