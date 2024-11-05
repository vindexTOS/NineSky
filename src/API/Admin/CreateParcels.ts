import { ApiManager } from "../ApiManager";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const CreateParcles = async (body: any) => {
  try {
    const token = cookies.get("token");
    const res: any = await ApiManager(`admin/create-parcels`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const UpdateParcels = async ( body:any)=>{
    console.log(body)
 
    try {
        const token = cookies.get("token");
        const res: any = await ApiManager(`admin/${body.tracking_id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: body,
        });
        return res;
      } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
      }

}
 
export const GetParcels  = async (searchTerm: string, page: number, limit: number) => {
    try {
      const token = cookies.get("token");
      const res: any = await ApiManager(`admin/get-parcels?tracking_id=${searchTerm}&page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return res.data;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  };