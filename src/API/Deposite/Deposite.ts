import { ApiManager } from "../ApiManager";

import Cookies from "universal-cookie";

const cookies = new Cookies();
export const DepositeMoney = async (body:any ) => {
    const token = cookies.get("token");


    try {
        const res: any = await ApiManager(`user/deposite`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
              },
              data:body

        });
        return res
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
    }
}

export const PayForParcel = async (body:any) => {
    const token = cookies.get("token");

    try {
        const res: any = await ApiManager(`user/pay-parcels`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
              },
              data:body

        });
        return res
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
    }
}