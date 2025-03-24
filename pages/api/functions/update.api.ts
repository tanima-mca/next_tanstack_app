import axiosInstance from '@/api/axios/axios';
import { endPoints } from '@/api/endPoints/endPoints';
import { updateProps } from '@/typeScript/cms.interface';
import { MutationFunction } from '@tanstack/react-query';




export const updateProductFn: MutationFunction<updateProps> = async (payload) => {
    const res = await axiosInstance.post<updateProps>(endPoints.pages.update,payload);
    // console.log(res, "loginres")
    return res.data
}
