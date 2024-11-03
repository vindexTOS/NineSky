import Cookies from "universal-cookie";
import { LoginType, RegisterType } from "../../types/authTypes";
import { ApiManager } from "../ApiManager";
import jwt_decode from "jwt-decode";
const cookies = new Cookies();


export const LoginPostRequest = async (body: LoginType): Promise<string> => {
    try {
        const res: any = await ApiManager("auth/login", {
            method: "POST",
            data: body,

        });

        let token =  res.data.access_token

   

   
        const decodedToken: any =jwt_decode(token);;
        const expirationTime = decodedToken.exp * 1000;  

       
        const expirationDate = new Date(expirationTime);
        cookies.set('token', token, { path: '/', expires: expirationDate });

        return token;
     
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err.response.data.message);
    }
};

 




export const RegisterPostRequest = async (body: RegisterType): Promise<string> => {
    try {
        const res: any = await ApiManager("auth/register", {
            method: "POST",
            data: body,

        });

     let token =  res.data.access_token

   

   
        const decodedToken: any =jwt_decode(token);;
        const expirationTime = decodedToken.exp * 1000;  

       
        const expirationDate = new Date(expirationTime);
        cookies.set('token', token, { path: '/', expires: expirationDate });

        return token;
    } catch (error) {
         const err: any = error;
        throw new Error(err.response.data.message);
    }
};



export const adminAuth = async (body: LoginType): Promise<string> =>{
    try {
        const res: any = await ApiManager("admin/login-as-admin", {
            method: "POST",
            data: body,

        });

        let token =  res.data.access_token

   

   
        const decodedToken: any =jwt_decode(token);;
        const expirationTime = decodedToken.exp * 1000;  

       
        const expirationDate = new Date(expirationTime);
        cookies.set('admin-token', token, { path: '/', expires: expirationDate });

        return token;
     
    } catch (error) {
        console.log(error);
        const err: any = error;
        throw new Error(err.response.data.message);
    }
}