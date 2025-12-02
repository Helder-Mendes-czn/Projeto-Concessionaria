import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

export default function EditarAnuncio() {
    const { id, idAnuncio } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname.split("/").pop();

    const numeroEtapa = path.startsWith("etapa")
        ? Number(path.replace("etapa", ""))
        : 1;

    const etapaSucessor = numeroEtapa + 1;
    const etapaAnterior = numeroEtapa - 1;

    return (
        <>
            <h2>Editar Anúncio</h2>
            <div className="cadastroMoto-botoes">
                {numeroEtapa > 1 && (<button className="botaoEtapa" onClick={() => { navigate(`/usuario/${id}/anuncios/editarAnuncio/${idAnuncio}/etapa${etapaAnterior}`) }}>voltar</button>)}
                {numeroEtapa < 7 && (<button className="botaoEtapa" onClick={() => { navigate(`/usuario/${id}/anuncios/editarAnuncio/${idAnuncio}/etapa${etapaSucessor}`) }}>continuar</button>)}
            </div>

            <section>
                <div className="cadastroMoto-steps">
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Destaque seu anúncio</h4>
                </div>
                <div className="cadastroMoto-container">
                    <Outlet />
                </div>
            </section>

        </>
    )
}