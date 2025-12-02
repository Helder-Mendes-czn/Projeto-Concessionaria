import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnuncioMoto() {
    const [dadosAnuncio, setDadosAnuncio] = useState(null);
    const { id } = useParams();
    const [imagemAtual, setImagemAtual] = useState(0);
    const [formularioMensagem, setFormularioMensagem] = useState({ idAnuncio: id, textoMensagem: "Olá, tenho interesse no veículo. Por favor entre em contato." })


    const buscarAnuncio = async () => {
        try {
            const res = await fetch(`http://localhost:1334/anuncios/buscarPorId/${id}`);
            const data = await res.json();
            setDadosAnuncio(data);
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

            const res = await fetch("http://localhost:1332/mensagens/enviar", {
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

            const res = await fetch("http://localhost:1333/garagem/favoritar", {
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

    const avancarImagem = () => {
        setImagemAtual((prev) =>
            prev === dadosAnuncio[0].imagens.length - 1 ? 0 : prev + 1
        );
    };

    const voltarImagem = () => {
        setImagemAtual((prev) =>
            prev === 0 ? dadosAnuncio[0].imagens.length - 1 : prev - 1
        );
    };

    return (
        <>
            <div>
                <div className="imagensMoto">

                    {dadosAnuncio[0].imagens && (
                        <img
                            className="prev-img"
                            src={`http://localhost:1333/uploads/${dadosAnuncio[0].imagens[
                                (imagemAtual - 1 + dadosAnuncio[0].imagens.length) %
                                dadosAnuncio[0].imagens.length
                            ]
                                }`}
                            alt="anterior"
                        />
                    )}

                    {dadosAnuncio[0].imagens && (
                        <img
                            className="center-img"
                            src={`http://localhost:1333/uploads/${dadosAnuncio[0].imagens[imagemAtual]}`}
                            alt={dadosAnuncio[0].anuncio.modelo}
                        />
                    )}

                    {dadosAnuncio[0].imagens && (
                        <img
                            className="next-img"
                            src={`http://localhost:1333/uploads/${dadosAnuncio[0].imagens[
                                (imagemAtual + 1) % dadosAnuncio[0].imagens.length
                            ]
                                }`}
                            alt="proxima"
                        />
                    )}

                    <button className="carrosselBtn esquerda" onClick={voltarImagem}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <button className="carrosselBtn direita" onClick={avancarImagem}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    <div className="miniaturas">
                        {dadosAnuncio[0].imagens?.map((img, index) => (
                            <img
                                key={index}
                                src={`http://localhost:1333/uploads/${img}`}
                                alt="mini"
                                className={imagemAtual === index ? "ativa" : ""}
                                onClick={() => setImagemAtual(index)}
                            />
                        ))}
                    </div>
                </div>


                <div className="anuncioContainer">
                    <div className="cardDetalhesMoto">
                        <div className="cardDetalhesMotoTitulo">
                            <h2>{dadosAnuncio[0].anuncio.marca} <span>{dadosAnuncio[0].anuncio.modelo}</span> </h2>
                            <i onClick={() => { favoritar() }} className="fa-regular fa-heart"></i>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h6>Preço</h6>
                                    <h5>R${dadosAnuncio[0].anuncio.preco}</h5>
                                </div>
                                <div>
                                    <h6>Localização</h6>
                                    <h5>{dadosAnuncio[0].anuncio.localizacao}</h5>
                                </div>
                                <div>
                                    <h6>Ano</h6>
                                    <h5>{dadosAnuncio[0].anuncio.ano_modelo}/{dadosAnuncio[0].anuncio.ano_fabricacao}</h5>
                                </div>
                                <div>
                                    <h6>Tipo de motor</h6>
                                    <h5>{dadosAnuncio[0].anuncio.motor}</h5>
                                </div>
                                <div>
                                    <h6>Estilo</h6>
                                    <h5>{dadosAnuncio[0].anuncio.estilo}</h5>
                                </div>
                                <div>
                                    <h6>Marchas</h6>
                                    <h5>{dadosAnuncio[0].anuncio.caixa_marchas}</h5>
                                </div>
                                <div>
                                    <h6>Embreagem</h6>
                                    <h5>{dadosAnuncio[0].anuncio.embreagem}</h5>
                                </div>
                                <div>
                                    <h6>Cilindradas</h6>
                                    <h5>{dadosAnuncio[0].anuncio.cilindrada}</h5>
                                </div>
                                <div>
                                    <h6>Quilometragem</h6>
                                    <h5>{dadosAnuncio[0].anuncio.quilometragem} Km</h5>
                                </div>
                                <div>
                                    <h6>Refrigeração</h6>
                                    <h5>{dadosAnuncio[0].anuncio.refrigeracao}</h5>
                                </div>
                                <div>
                                    <h6>Partida</h6>
                                    <h5>{dadosAnuncio[0].anuncio.partida}</h5>
                                </div>
                                <div>
                                    <h6>Freio dianteiro</h6>
                                    <h5>{dadosAnuncio[0].anuncio.freios_dianteiros}</h5>
                                </div>
                                <div>
                                    <h6>Freio traseiro</h6>
                                    <h5>{dadosAnuncio[0].anuncio.freios_traseiros}</h5>
                                </div>
                                <div>
                                    <h6>Alimentação</h6>
                                    <h5>{dadosAnuncio[0].anuncio.alimentacao}</h5>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h6>Sobre esta moto</h6>
                        <h5>{dadosAnuncio[0].anuncio.descricao}</h5>
                    </div>
                    <div className="cardDetalhesVendedor">
                        <h6>Sobre o vendedor</h6>
                        <div className="cardDetalhesVendedorSegundo">
                            <h4><i className="fa-solid fa-circle-user"></i> {dadosAnuncio[0].anuncio.nome_usuario}</h4>
                            <h4><i className="fa-solid fa-map-location-dot"></i> {dadosAnuncio[0].anuncio.localizacao}</h4>
                            <h4><i className="fa-solid fa-phone"></i> {dadosAnuncio[0].anuncio.telefone_usuario}</h4>
                            <h4><i className="fa-solid fa-envelope"></i> {dadosAnuncio[0].anuncio.email_usuario}</h4>
                        </div>
                        <h4><span>{dadosAnuncio[0].anuncio.tipo_usuario}</span></h4>
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