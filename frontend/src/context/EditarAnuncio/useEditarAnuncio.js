import { useContext } from "react";
import EditarAnuncioContext from "./EditarAnuncioContext";

export default function useEditarAnuncio(){
    return useContext(EditarAnuncioContext);
}