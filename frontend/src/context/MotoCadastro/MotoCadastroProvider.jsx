import { useState, useEffect } from "react";
import MotoCadastroContext from "./MotoCadastroContext";

export default function MotoCadastroProvider({ children, usuario }) {
    const [formulario, setFormulario] = useState(() => {
        const dadosSalvos = JSON.parse(localStorage.getItem("cadastroMoto")) || null;
        return {
            idUsuario: usuario.id,
            ...dadosSalvos,
        }
    }
    );

    useEffect(() => {
        localStorage.setItem("cadastroMoto", JSON.stringify(formulario));
    }, [formulario]);

    const controlaEstado = (elemento, novasImagens) => {
        if (novasImagens !== undefined) {
            const imagensAnteriores = formulario[elemento] || [];
            const todasImagens = [...imagensAnteriores, ...novasImagens];
            setFormulario({ ...formulario, [elemento]: todasImagens });
            return;
        }

        const { name, value } = elemento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    const resetarFormulario = () => {
        setFormulario({
            // idUsuario: usuario.id,
            preco: "",
            descricao: "",
            marca: "",
            modelo: "",
            ano: "",
            anoModelo: "",
            anoFabricacao: "",
            estilo: "",
            cilindrada: "",
            motor: "",
            potencia: "",
            torque: "",
            taxaCompressao: "",
            diametroCurso: "",
            valvulasPorCilindro: "",
            alimentacao: "",
            comandoCombustivel: "",
            ignicao: "",
            lubrificacao: "",
            refrigeracao: "",
            caixaMarchas: "",
            transmissao: "",
            embreagem: "",
            quadro: "",
            suspensaoDianteira: "",
            cursoRodaDianteira: "",
            suspensaoTraseira: "",
            cursoRodaTraseira: "",
            pneuDianteiro: "",
            pneuTraseiro: "",
            freios: "",
            freiosDianteiros: "",
            freiosTraseiros: "",
            pesoTotal: "",
            alturaAssento: "",
            alturaTotal: "",
            comprimentoTotal: "",
            larguraTotal: "",
            distanciaSolo: "",
            entreEixos: "",
            capacidadeCombustivel: "",
            partida: "",
            imagens: [],
            quilometragem: "",
            corPrincipal: "",
            corSecundaria: "",
            localizacao: "",
        });
        localStorage.removeItem("cadastroMoto");
    };

    return (
        <MotoCadastroContext.Provider value={{ formulario, controlaEstado, setFormulario, resetarFormulario }}>
            {children}
        </MotoCadastroContext.Provider>
    )
};