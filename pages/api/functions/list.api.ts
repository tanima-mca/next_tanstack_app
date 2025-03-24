import axiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endPoints/endPoints";
import { detailsProps, listProps } from "@/typeScript/cms.interface";


export const allProductsAPICall = async (page: number, perPage: number) => {
  const res = await axiosInstance.post<listProps>(endPoints.pages.list, {
    page,
    perPage,
  });

  return res;
};

export const allProductDetails = async (id: string): Promise<detailsProps | null> => {
  const res = await axiosInstance.get<{ data: detailsProps }>(endPoints.pages.details + id);
  return res.data.data;
};
