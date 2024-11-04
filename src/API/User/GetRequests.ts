import { ApiManager } from "../ApiManager";


export const GetUserInfo = async (id: string) => {


    try {
        const res: any = await ApiManager(`user/profile/${id}`, {
            method: "GET",


        });
        return res
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
    }
}

export const GetAllUsers = async (searchTerm:string, page:number = 1 , limit:number = 10)=>{

     try { 
         const res:any = await ApiManager(`/admin/get-users?personalNumber=${searchTerm}&page=${page}&limit=${limit}` ,{

            method:"GET"
         })

         return res
     } catch (error) {
        console.log(error)
        const err:any = error 
        throw new Error(err)
     }
}