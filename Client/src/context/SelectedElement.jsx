import { createContext, useState } from "react";

export const SelectedElement = createContext()

export const SelectedElementProvider = ({children}) =>{
    const [selectedElement , setSelectedElement] = useState()

    return(
        <SelectedElement.Provider value={{selectedElement , setSelectedElement}}>
            {children}
        </SelectedElement.Provider>
    )
}