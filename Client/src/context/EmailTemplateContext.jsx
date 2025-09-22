import { useState } from "react";
import { createContext } from "react";

export const EmailTemplateContext = createContext()

const EmailTemplateContextProvider = ({children}) =>{
    const [emailTemplate , setEmailTemplate] = useState([])

    return(
        <EmailTemplateContext.Provider value={{emailTemplate ,setEmailTemplate}}>
            {children}
        </EmailTemplateContext.Provider>
    )

}
export default EmailTemplateContextProvider