import EditarAnuncioProvider from "../context/EditarAnuncio/EditarAnuncioProvider";
import EditarAnuncio from "../pages/editarAnuncio/EditarAnuncio";

export default function EditarAnuncioRoutes({usuario}) {
    return (
        <EditarAnuncioProvider usuario={usuario}>
            <EditarAnuncio />
        </EditarAnuncioProvider>
    );
}
