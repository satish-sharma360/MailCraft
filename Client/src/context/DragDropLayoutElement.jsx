import { useState } from "react";
import { createContext } from "react";

export const DragDropLayoutElement = createContext()

const DragDropLayoutElementProvider  = ({children}) =>{
    const [dragElement,setdragElement] = useState()

    return (
        <DragDropLayoutElement.Provider value={{dragElement,setdragElement}}>
            {children}
        </DragDropLayoutElement.Provider>
    )
}
export default DragDropLayoutElementProvider