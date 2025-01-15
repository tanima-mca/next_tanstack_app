
import { listProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const allProductsAPICall = async () => {
    const res = await axiosInstance.post<listProps>(endPoints.pages.list);
      return res.data.data; 
}



