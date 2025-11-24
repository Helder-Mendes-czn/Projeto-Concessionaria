import { useContext } from "react";
import MotoCadastroContext from "./MotoCadastroContext";

export default function useMotoCadastro(){
    return useContext(MotoCadastroContext);
}