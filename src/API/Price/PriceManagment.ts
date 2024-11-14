import Cookies from "universal-cookie";
 import { ApiManager } from "../ApiManager";
 
const cookies = new Cookies();




export const GetPrice = async () => {

    try {
        const res: any = await ApiManager("app/get-prices", {
            method: "GET",

        });

        return res
    } catch (error) {
        const err: any = error
        throw new Error(err)
    }
}

export const UpdatePrice = async (body: any) => {
    console.log(body);
    try {
      const token = cookies.get("token");
      
      // Construct query string
      const queryString = `?china=${body.china}&turkey=${body.turkey}`;
      
      const res: any = await ApiManager(`admin/update-price${queryString}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return res;
    } catch (error) {
      const err: any = error;
      throw new Error(err);
    }
  };