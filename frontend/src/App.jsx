import './App.css'
import { Link } from 'react-router-dom'
import { pegarUsuarioLogado } from "./helper/auth.js";

const usuario = pegarUsuarioLogado();

function App() {
  return (
    <>
      <p className="read-the-docs">
        <Link to={"/cadastro"}>Ir cadastrar usuario</Link><br />
        <Link to={"/login"}>Login</Link><br />
        <Link to={"/anuncios"}>anuncios motos</Link><br />
        {usuario?.tipo === "Usuário Vendedor" && (<Link to={"/anuncios/venderMoto"}>Cadastrar moto</Link>)}
        {usuario?.tipo === "Usuário Vendedor" && (<Link to={"/anuncios/venderMoto/especificacoes"}>especificacoes moto</Link>)}
      </p>
    </>
  )
}

export default App
