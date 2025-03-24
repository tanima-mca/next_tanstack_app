// import { MutationFunction } from "@tanstack/react-query"
// import axiosInstance from "../axios/axios"

// import { endPoints } from "../endPoints/endPoints"
// import { loginProps, registerProps } from "@/typeScript/auth.interface"


// export const loginFn: MutationFunction<loginProps> = async (payload) => {
//     const res = await axiosInstance.post<loginProps>(endPoints.auth.login, payload)
//     console.log(res, "loginres")
//     return res.data;
// }

// export const registerFn: MutationFunction<registerProps> = async (payload) => {
//     const res = await axiosInstance.post<registerProps>(endPoints.auth.register, payload)
//     console.log(res, "registerres")
//     return res.data
// }