import { Routes, Route } from "react-router-dom";
import MotoCadastroProvider from "../context/MotoCadastro/MotoCadastroProvider";
import Etapa1 from "../pages/venderMoto/Etapa1";
import Etapa2 from "../pages/venderMoto/Etapa2";
import Etapa3 from "../pages/venderMoto/Etapa3";
import Etapa4 from "../pages/venderMoto/Etapa4";
import Etapa5 from "../pages/venderMoto/Etapa5";
import Etapa6 from "../pages/venderMoto/Etapa6";
import Etapa7 from "../pages/venderMoto/Etapa7";
import Etapa8 from "../pages/venderMoto/Etapa8";

export default function VenderMotoRoutes({ usuario }) {
  return (
    <MotoCadastroProvider usuario={usuario}>
      <Routes>
        <Route index element={<Etapa1 />} />  
        <Route path="etapa1" element={<Etapa2 />} />
        <Route path="etapa2" element={<Etapa3 />} />
        <Route path="etapa3" element={<Etapa4 />} />
        <Route path="etapa4" element={<Etapa5 />} />
        <Route path="etapa5" element={<Etapa6 />} />
        <Route path="etapa6" element={<Etapa7 />} />
        <Route path="etapa7" element={<Etapa8 />} />
      </Routes>
    </MotoCadastroProvider>
  );
}
