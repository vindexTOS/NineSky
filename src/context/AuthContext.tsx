import { createContext,ReactNode,useContext } from "react";
 type Cell = {
     
 }

const Context = createContext<null | Cell>(null)


export  const ContextProvider = ({children}:{children:ReactNode})=>{
     
     return <Context.Provider value={{}} >{children}</Context.Provider>
     
}

export const UseAuthContext = ()=>{
     

      const context = useContext(Context);

      if(!context){
        throw new Error("User Auth Context Not Wrapped ")
      }
      return context 
}