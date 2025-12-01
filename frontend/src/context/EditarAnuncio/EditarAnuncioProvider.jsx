import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditarAnuncioContext from "./EditarAnuncioContext";

export default function EditarAnuncioProvider({ children, usuario }) {
    const { idAnuncio } = useParams();
    const [anuncio, setAnuncio] = useState([]);
    const [formulario, setFormulario] = useState(() => {
        const dadosSalvos = JSON.parse(localStorage.getItem("editarAnuncio")) || null;
        return {
            idUsuario: usuario.id,
            ...dadosSalvos,
        }
    })

    useEffect(() => {
        localStorage.setItem("editarAnuncio", JSON.stringify(formulario));
    }, [formulario]);

    const pegarDadosAnuncio = async () => {
        try {
            const res = await fetch(`http://localhost:8002/anuncios/buscarPorId/${idAnuncio}`)
            const data = await res.json();
            setAnuncio(data);
        } catch (error) {
            console.error("error: \n\t", error);
        }
    }

    const mapearCampos = (a) => {
        return {
            idMoto: a.id_moto,
            preco: a.preco,
            descricao: a.descricao,
            marca: a.marca,
            modelo: a.modelo,
            ano: a.ano,
            anoModelo: a.ano_modelo,
            anoFabricacao: a.ano_fabricacao,
            estilo: a.estilo,
            cilindrada: a.cilindrada,
            motor: a.motor,
            potencia: a.potencia,
            torque: a.torque,
            taxaCompressao: a.taxa_compressao,
            diametroCurso: a.diametro_curso,
            valvulasPorCilindro: a.valvulas_por_cilindro,
            alimentacao: a.alimentacao,
            comandoCombustivel: a.comando_combustivel,
            ignicao: a.ignicao,
            lubrificacao: a.lubrificacao,
            refrigeracao: a.refrigeracao,
            caixaMarchas: a.caixa_marchas,
            transmissao: a.transmissao,
            embreagem: a.embreagem,
            quadro: a.quadro,
            suspensaoDianteira: a.suspensao_dianteira,
            cursoRodaDianteira: a.curso_roda_dianteira,
            suspensaoTraseira: a.suspensao_traseira,
            cursoRodaTraseira: a.curso_roda_traseira,
            pneuDianteiro: a.pneu_dianteiro,
            pneuTraseiro: a.pneu_traseiro,
            freios: a.freios,
            freiosDianteiros: a.freios_dianteiros,
            freiosTraseiros: a.freios_traseiros,
            pesoTotal: a.peso_total,
            alturaAssento: a.altura_assento,
            alturaTotal: a.altura_total,
            comprimentoTotal: a.comprimento_total,
            larguraTotal: a.largura_total,
            distanciaSolo: a.distancia_solo,
            entreEixos: a.entre_eixos,
            capacidadeCombustivel: a.capacidade_combustivel,
            partida: a.partida,
            quilometragem: a.quilometragem,
            corPrincipal: a.cor_principal,
            corSecundaria: a.cor_secundaria,
            localizacao: a.localizacao,
            imagens: a.imagens || [],
        };
    }

    useEffect(() => {
        pegarDadosAnuncio()
    }, [])

    useEffect(() => {
        if (anuncio) {
            setFormulario(prev => ({ ...prev, ...mapearCampos(anuncio) }));
        } else return
    }, [anuncio]);

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
            idMoto: anuncio.id_moto,
            idUsuario: usuario.id,
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
        <>
            <EditarAnuncioContext.Provider value={{ formulario, controlaEstado, setFormulario, resetarFormulario }}>
                {children}
            </EditarAnuncioContext.Provider>
        </>
    )
};