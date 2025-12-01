import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

export default function EditarAnuncio(){
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
            {numeroEtapa < 7 && (<button onClick={() => {navigate(`/usuario/${id}/anuncios/editarAnuncio/${idAnuncio}/etapa${etapaSucessor}`)}}>continuar</button>)}
            {numeroEtapa > 1 && (<button onClick={() => {navigate(`/usuario/${id}/anuncios/editarAnuncio/${idAnuncio}/etapa${etapaAnterior}`)}}>voltar</button>)}
            <section>
                <div>
                    <h4><span>1</span> Preencha os dados do veículo</h4>
                    <h4><span>2</span> Salve as alterações no veículo</h4>
                </div>
                <div>
                    <Outlet />
                </div>
            </section>
            
        </>
    )
}