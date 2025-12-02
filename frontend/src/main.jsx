import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Cadastro from './components/Cadastro.jsx';
import Login from './components/Login.jsx';
import VenderMotoRoutes from './routes/VenderMotoRoutes.jsx';
import { pegarUsuarioLogado } from './helper/auth.js';
import Garagem from './pages/usuario/Garagem.jsx';
import AnunciosPessoais from './pages/usuario/AnunciosPessoais.jsx';
import Perfil from './pages/usuario/Perfil.jsx'
import UsuarioLayout from './pages/usuario/UsuarioLayout.jsx';
import EditarAnuncioRoutes from './routes/EditarAnuncioRoutes.jsx';
import Etapa1 from './pages/editarAnuncio/Etapa1.jsx';
import Etapa2 from './pages/editarAnuncio/Etapa2.jsx';
import Etapa3 from './pages/editarAnuncio/Etapa3.jsx';
import Etapa4 from './pages/editarAnuncio/Etapa4.jsx';
import Etapa5 from './pages/editarAnuncio/Etapa5.jsx';
import Etapa6 from './pages/editarAnuncio/Etapa6.jsx';
import Etapa7 from './pages/editarAnuncio/Etapa7.jsx';
import ContainerAnuncios from './pages/anunciosMoto/ContainerAnuncios.jsx';
import AnuncioMoto from './pages/anunciosMoto/AnuncioMoto.jsx';
import Home from './pages/Home.jsx';

const usuario = pegarUsuarioLogado();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        index: true,
        element: <Home />
      },
      {
        path: "/cadastro",
        element: <Cadastro />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/anuncios",
        element: <ContainerAnuncios />
      },
      {
        path: "/anuncios/moto/:id",
        element: <AnuncioMoto />
      },
      {
        path: "/anuncios/venderMoto/*",
        element: <VenderMotoRoutes usuario={usuario} />,
      },
      {
        path: "/usuario/:id",
        element: <UsuarioLayout usuario={usuario} />,
        children: [
          {
            path: "garagem",
            element: <Garagem usuario={usuario} />,
          },
          {
            path: "anuncios",
            element: <AnunciosPessoais usuario={usuario} />,
          },
          {
            path: "perfil",
            element: <Perfil usuario={usuario} />,
          },
          {
            path: "anuncios/editarAnuncio/:idAnuncio",
            element: <EditarAnuncioRoutes usuario={usuario} />,
            children: [
              { path: "etapa1", element: <Etapa1 /> },
              { path: "etapa2", element: <Etapa2 /> },
              { path: "etapa3", element: <Etapa3 /> },
              { path: "etapa4", element: <Etapa4 /> },
              { path: "etapa5", element: <Etapa5 /> },
              { path: "etapa6", element: <Etapa6 /> },
              { path: "etapa7", element: <Etapa7 usuario={usuario} /> },
            ]
          }
        ]
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)