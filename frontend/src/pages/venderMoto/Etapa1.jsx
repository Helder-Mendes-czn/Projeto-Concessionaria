import { Outlet, useNavigate } from "react-router-dom"

export default function CadastrarMoto() {
    const navigate = useNavigate();
    const numeroEtapa = 0;

    return (
        <>
            <h1>Aqui você pode publicar seu anuncio</h1>
            <div className="cadastroMoto-botoes">
                <button className="continuar"
                    onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa + 1}`)}>
                    Continuar
                </button>
            </div>
            <Outlet />
        </>
    )
};