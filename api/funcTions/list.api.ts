import { IallListProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export const allBlogsAPICall = async () => {
  const res = await axiosInstance.get<IallListProps>(endPoints.pages.list);
  return res.data;
};
