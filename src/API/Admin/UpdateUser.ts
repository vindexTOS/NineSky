
import { ApiManager } from "../ApiManager";
import Cookies from "universal-cookie";
const cookies = new Cookies();


export const UpdateUserInfo = async (body: any) => {

    const token = cookies.get("token");


    try {
        const res: any = await ApiManager(`admin/update-user/${body.id}`, {
            method: "PUT",
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