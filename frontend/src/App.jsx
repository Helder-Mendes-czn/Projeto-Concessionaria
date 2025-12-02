import '../styles/App.css';
import '../styles/Perfil.css';
import '../styles/CardAnuncio.css';
import '../styles/AnuncioMoto.css';
import '../styles/CadastrarMoto.css';
import '../styles/CadastrarUsuario.css';
import '../styles/LoginUsuario.css';
import '../styles/ContainerAnuncios.css';
import '../styles/UsuarioLayout.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { pegarUsuarioLogado } from "./helper/auth.js";

function App() {
  const usuario = pegarUsuarioLogado();
  const navigate = useNavigate();
  return (
    <>
      <nav className='navApp'>
        <div className='divNavApp divLogoApp' onClick={() => { navigate('/home') }}>
          CZN Motors
        </div>

        <div className='divNavApp'>
          <Link to={"/anuncios"}>Anúncios Motos</Link>
          <Link to={"/login"}>Login</Link>
          {usuario?.tipo === "Usuário Vendedor" && (<Link to={"/anuncios/venderMoto"}>Cadastrar Moto</Link>)}
        </div>

        <div className='divNavApp'>
          <Link className='linkNavUser' to={`/usuario/${usuario.id}`}><i className="fa-solid fa-circle-user"></i><h4>{usuario.usuario}</h4></Link>
        </div>
      </nav>

      <main className='containerMainApp'>
        <Outlet />
      </main>

      <footer>
        <div className='divFooterApp'>
          <div>
            <div className='divNavApp divLogoApp' onClick={() => { navigate('/home') }}>
              CZN Motors
            </div>
            <div className='divFooterContatosApp'>
              <h3>Me contate através das <span>redes sociais</span>!</h3>
              <div className='divNavAppLinks'>
                <a href="https://www.instagram.com/helder.czn/" target='_target'><i className="fa-brands fa-square-instagram"></i></a>
                <a href="https://github.com/Helder-Mendes-czn" target='_target'><i className="fa-brands fa-square-github"></i></a>
                <a href="https://www.linkedin.com/in/helder-nelson-carvalho-mendes-671192306/" target='_target'><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://x.com/Nihil48632125" target='_target'><i className="fa-brands fa-square-x-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className='divFooterLinks'>
            <h3>Links utéis</h3>
            <div>
              <div>
                <Link to={"/anuncios"}>Anúncios Motos</Link>
                <Link to={"/login"}>Login</Link>
              </div>
              <div>
                {usuario?.tipo === "Usuário Vendedor" && (<Link to={"/anuncios/venderMoto"}>Cadastrar Moto</Link>)}
                <Link to={`/usuario/${usuario.id}`} className='linkPerfil'><i className="fa-solid fa-circle-user"></i><h4>{usuario.usuario}</h4></Link>
              </div>
            </div>
          </div>
        </div>
        <div className='divFooterApp'>
          <h4>© 2025 Helder Mendes | Todos os direitos reservados</h4>
        </div>
      </footer>
    </>
  )
}

export default App
