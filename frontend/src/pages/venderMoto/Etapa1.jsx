import { Outlet, useNavigate } from "react-router-dom"

export default function CadastrarMoto(){
    const navigate = useNavigate();
    const numeroEtapa = 0;

    const voltar = () => {
        navigate("/");
    };

    return (
        <>  
            <nav onClick={voltar}>Helder Motos</nav>
            <h1>Aqui você pode publicar seu anuncio</h1>
            <button onClick={() => navigate(`/anuncios/venderMoto/etapa${numeroEtapa +1}`)}>continuar</button>
            <Outlet />
        </>
    )
};