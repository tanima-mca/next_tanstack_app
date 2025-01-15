import { Cookies } from "react-cookie";
import { createProps, deleteProps } from "@/typeScript/cms.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/gloBalHooks";
import { createProductFn } from "@/api/funcTions/create.api";
import { deleteProductFn } from "@/api/funcTions/delete.api";


import { allProductsAPICall } from "@/api/funcTions/list.api";
import {  listProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const allProductsQuery = (): UseQueryResult<listProps, unknown> => {
    return useQuery({
      queryKey: ["LISTPRODUCTS"],
      queryFn: allProductsAPICall,
    });
  };
  



 
export const createMutation = (): UseMutationResult<createProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<createProps, void, unknown, FormData>({
    mutationFn: createProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      }
      queryClient.invalidateQueries({ queryKey: ["CREATE"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};

export const deleteMutation = (): UseMutationResult<
  deleteProps,
  unknown,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<deleteProps, unknown, unknown>({
    mutationFn: deleteProductFn,
    onSuccess: (res) => {
      const { status, user, token } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
        localStorage.setItem("user", JSON.stringify(user));
      }
      queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
