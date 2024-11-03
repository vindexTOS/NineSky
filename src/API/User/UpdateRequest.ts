import { RegisterType } from "../../types/authTypes";
import { ApiManager } from "../ApiManager";


export const UpdateUserInfo = async (id: string, token: string, body: RegisterType) => {

 

    try {
        const res: any = await ApiManager(`user/update/${id}`, {
            method: "POST",
            data: body,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return res

    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err.response.data.message);
    }

}