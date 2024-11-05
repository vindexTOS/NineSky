import { ApiManager } from "../ApiManager";

import Cookies from "universal-cookie";

const cookies = new Cookies();
export const GetUserInfo = async (id: string) => {
    const token = cookies.get("token");


    try {
        const res: any = await ApiManager(`user/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
              },

        });
        return res
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
    }
}

export const GetAllUsers = async (searchTerm:string, page:number = 1 , limit:number = 10)=>{
    const token = cookies.get("token");
     try { 
         const res:any = await ApiManager(`/admin/get-users?personalNumber=${searchTerm}&page=${page}&limit=${limit}` ,{

            method:"GET",
            headers: {
                Authorization: `Bearer ${token}`,
              },
         })

         return res
     } catch (error) {
        console.log(error)
        const err:any = error 
        throw new Error(err)
     }
}