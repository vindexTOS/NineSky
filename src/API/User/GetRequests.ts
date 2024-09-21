import { ApiManager } from "../ApiManager";


export const GetUserInfo = async (id: string) => {


    try {
        const res: any = await ApiManager(`user/profile/?id=${id}`, {
            method: "GET",


        });
        return res
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err);
    }
}