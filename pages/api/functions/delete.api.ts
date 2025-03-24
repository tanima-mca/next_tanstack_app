import { MutationFunction } from "@tanstack/react-query";

import { deleteProps } from "@/typeScript/cms.interface";
import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";


export const deleteProductFn: MutationFunction<deleteProps> = async (
  payload
) => {
  const res = await axiosInstance.post<deleteProps>(endPoints.pages.delete, payload );
  // console.log(res, "loginres")
  return res.data;
};
