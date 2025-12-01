import { Outlet, NavLink } from "react-router-dom";
// import "./usuario.css"; // estilo do layout

export default function UsuarioLayout() {
  return (
    <div className="usuario-container">

      {/* Sidebar */}
      <aside className="usuario-sidebar">
        <h2>Minha Garagem</h2>

        <nav>
          <NavLink to="garagem">Favoritos</NavLink>
          <NavLink to="anuncios">Meus Anúncios</NavLink>
          <NavLink to="perfil">Perfil</NavLink>
        </nav>
      </aside>

      {/* Área que muda conforme a rota */}
      <main className="usuario-conteudo">
        <Outlet />
      </main>

    </div>
  );
}