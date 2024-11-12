export interface LoginType   {
     password:string 
     email:string 
}


export interface RegisterType extends LoginType {

    
    first_name:string 
    last_name:string 
    phone_number:string 
    personal_number:string 
 }