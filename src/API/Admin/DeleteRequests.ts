import { ApiManager } from "../ApiManager";
import Cookies from "universal-cookie";
const cookies = new Cookies();

 export const DeleteParcel = async (id:string)=>{

    try {
        const token = cookies.get("token");
        const res: any = await ApiManager(`admin/delete-parcel/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
      
        });
        return res;
      } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
      }

}


export const DeleteUser = async (id:string)=>{
    try {
        const token = cookies.get("token");
        const res: any = await ApiManager(`admin/delete-user/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
      
        });
        return res;
      } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
      }
}