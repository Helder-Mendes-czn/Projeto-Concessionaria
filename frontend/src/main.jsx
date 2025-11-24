import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Cadastro from './components/Cadastro.jsx';
import Login from './components/Login.jsx';
import ContainerMotos from './components/ContainerMotos.jsx';
import AnuncioMoto from './components/AnuncioMoto.jsx';
import VenderMotoRoutes from './routes/VenderMotoRoutes.jsx';
import { pegarUsuarioLogado } from './helper/auth.js';

const usuario = pegarUsuarioLogado();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <ContainerMotos />
  },
  {
    path: "/moto/:id",
    element: <AnuncioMoto />
  },
  {
    path: "/anuncios/venderMoto/*",
    element: <VenderMotoRoutes usuario={usuario} />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)