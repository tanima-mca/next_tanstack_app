import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import { createProps} from "@/typeScript/cms.interface";

import { MutationFunction } from "@tanstack/react-query";

// export const createProductsAPICall = async () => {
//   const res = await axiosInstance.post<createProps>(endPoints.pages.create);
//   return res.data;
// };

export const createProductFn: MutationFunction<createProps> = async (payload) => {
    const res = await axiosInstance.post<createProps>(endPoints.pages.create,payload);
    // console.log(res, "loginres")
    return res.data
}