import { Outlet, NavLink } from "react-router-dom";

export default function UsuarioLayout({ usuario }) {
  return (
    <div className="usuario-container">
      <aside className="usuario-sidebar">
        <h2>Minha Garagem</h2>

        <nav>
          <NavLink to="garagem">Favoritos</NavLink>
          {usuario?.tipo === "Usuário Vendedor" && (<NavLink to={"/anuncios"}>Cadastrar Moto</NavLink>)}
          <NavLink to="perfil">Perfil</NavLink>
        </nav>
      </aside>

      <main className="usuario-conteudo">
        <Outlet />
      </main>

    </div>
  );
}