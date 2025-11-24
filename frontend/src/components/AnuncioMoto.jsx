import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnuncioMoto() {
    const [dadosAnuncio, setDadosAnuncio] = useState([]);
    const { id } = useParams();
    const [formularioMensagem, setFormularioMensagem] = useState({ idAnuncio: id, textoMensagem: "Olá, tenho interesse no veículo. Por favor entre em contato." })

    const buscarAnuncio = async () => {
        try {
            const res = await fetch(`http://localhost:8002/anuncios/buscarPorId/${id}`);
            const data = await res.json();
            setDadosAnuncio(data[0]);
        } catch (error) {
            console.error("erro: \n", error);
        }
    }
    useEffect(() => {
        buscarAnuncio()
    }, []);

    if (!dadosAnuncio) {
        return <h2>Carregando a página...</h2>;
    }

    const controlaEstado = (elemento) => {
        const { name, value } = elemento.target;
        setFormularioMensagem({ ...formularioMensagem, [name]: value });
    }

    const submeterMensagem = (evento) => {
        evento.preventDefault();
        enviarMensagem();
    }

    const enviarMensagem = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:8003/mensagens/enviar", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify(formularioMensagem),
            });
            const resultado = await res.json();
            console.log(resultado);
            alert(resultado.mensagem);
        } catch (error) {
            console.error("erro: ", error)
        }
    }

    const favoritar = async () => {
        try {
            const token = localStorage.getItem("token"); 

            const res = await fetch("http://localhost:8004/garagem/favoritar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ idAnuncio: id }),
            });

            const resultado = await res.json();
            alert(resultado.mensagem);
        } catch (error) {
            console.error("erro: ", error);
        }
    };

    return (
        <>
            <nav>
                <div>
                    Motos Helder
                </div>
                <div>
                    <input type="text" placeholder="busque por marca ou modelo" />
                </div>
                <div>
                    <div>
                        <i className="fa-solid fa-circle-user"></i>
                        <h6>Helder Mendes</h6>
                    </div>
                    ❤️
                </div>
            </nav>
            <div>
                <div className="imagensMoto">
                    <img src={dadosAnuncio.imagem_principal} alt="" />
                </div>
                <div>
                    <div className="cardDetalhesMoto">
                        <div>
                            <h2>{dadosAnuncio.marca} <span>{dadosAnuncio.modeo}</span> <i onClick={() => { favoritar() }} className="fa-regular fa-heart"></i></h2>
                        </div>
                        <div>
                            <div>
                                <h6>Localização</h6>
                                <h5>{dadosAnuncio.localizacao}</h5>
                            </div>
                            <div>
                                <div>
                                    <h6>Ano</h6>
                                    <h5>{dadosAnuncio.ano}</h5>
                                </div>
                                <div>
                                    <h6>Tipo de motor</h6>
                                    <h5>{dadosAnuncio.motor}</h5>
                                </div>
                                <div>
                                    <h6>Estilo</h6>
                                    <h5>{dadosAnuncio.estilo}</h5>
                                </div>
                                <div>
                                    <h6>Marchas</h6>
                                    <h5>{dadosAnuncio.caixa_marchas}</h5>
                                </div>
                                <div>
                                    <h6>Embreagem</h6>
                                    <h5>{dadosAnuncio.embreagem}</h5>
                                </div>
                                <div>
                                    <h6>Cilindradas</h6>
                                    <h5>{dadosAnuncio.cilindrada}</h5>
                                </div>
                                <div>
                                    <h6>Quilometragem</h6>
                                    <h5>{dadosAnuncio.quilometragem}</h5>
                                </div>
                                <div>
                                    <h6>Refrigeração</h6>
                                    <h5>{dadosAnuncio.refrigeracao}</h5>
                                </div>
                                <div>
                                    <h6>Partida</h6>
                                    <h5>{dadosAnuncio.partida}</h5>
                                </div>
                                <div>
                                    <h6>Freio dianteiro</h6>
                                    <h5>{dadosAnuncio.freios_dianteiros}</h5>
                                </div>
                                <div>
                                    <h6>Freio traseiro</h6>
                                    <h5>{dadosAnuncio.freios_traseiros}</h5>
                                </div>
                                <div>
                                    <h6>Alimentação</h6>
                                    <h5>{dadosAnuncio.alimentacao}</h5>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h6>Sobre esta moto</h6>
                        <h5>{dadosAnuncio.descricao}</h5>
                    </div>
                    <div className="cardDetalhesVendedor">
                        <div>
                            <h6>Sobre o vendedor</h6>
                        </div>
                        <div>
                            <h4>{dadosAnuncio.nome_usuario}</h4>
                            <h5>{dadosAnuncio.localizacao}</h5>
                        </div>
                        <div>
                            <h4>{dadosAnuncio.telefone_usuario}</h4>
                            <h5>{dadosAnuncio.tipo_usuario}</h5>
                        </div>
                    </div>
                    <div className="cardMensagemParaOVendedor">
                        <form onSubmit={submeterMensagem}>
                            <input type="text" name="textoMensagem" value={formularioMensagem.textoMensagem} placeholder="Escrava sua mensagem aqui." onChange={controlaEstado} required />
                            <button type="submit">Enviar mensagem</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnuncioMoto;