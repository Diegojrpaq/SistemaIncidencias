import { 
  fetchIncidencias, 
  getAllSucursales, 
  getCatalogoMotivosCierre 
} from "@/lib/api";
import {
  dataSelect,
  dataUser,
  Incidencia
} from "@/lib/interfaces";
import { urlServer } from "@/lib/url";
import {
  createContext,
  ReactNode,
  useEffect,
  useState
} from "react";

interface IncidenciaContextType {
  incidencias: Incidencia[];
  userData: dataUser;
  setIncidencias: (incidencias: Incidencia[]) => void;
  catalogoCierreCombo: dataSelect[];
  sucursalesCombo: dataSelect[];
}

export const IncidenciasContext = createContext<IncidenciaContextType | undefined>(undefined);

//props para provider
interface IncidenciaProviderProps {
  children: ReactNode;
  userData: dataUser;
}

//Crear provider
export const IncidenciaProvider: React.FC<IncidenciaProviderProps> = ({ children, userData }) => {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [sucursalesCombo, setSucursalesCombo] = useState<any[]>([]);
  const [catalogoCierreCombo, setCatalogoCierreCombo] = useState<any[]>([]);
  let sucursalesArr: any[];
  let catalogoCierreArr: any[];
  const getCatalgoCierre = async () => {
    const catalogoCierre = await getCatalogoMotivosCierre();
    if (catalogoCierre.status === 200) {
      catalogoCierreArr = catalogoCierre.Catalogo.map((item: any) => ({
        key: item.id,
        label: item.nombre,
      }));

      setCatalogoCierreCombo(catalogoCierreArr)
    }
  }

  const getSucursales = async () => {
    const sucursales = await getAllSucursales();
    if (sucursales.status === 200) {
      sucursalesArr = sucursales.Sucursales.map((suc: any) => ({
        key: suc.id,
        label: suc.nombre,
      }));

      setSucursalesCombo(sucursalesArr)
    }
  }

  useEffect(() => {
    // Llama a la API para obtener los datos del usuario
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${urlServer}/Incidencias/getListIncidencias/${userData.id}`
        );
        const data = await response.json();
        const allCatalogoIncidencias = [
          ...data.catalogoIncidencias,
          ...data.catalogoIncidenciasCerradas
        ];
        const incidenciasConSuEscaneo = await fetchIncidencias(allCatalogoIncidencias);
        setIncidencias(incidenciasConSuEscaneo);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUser();
    getCatalgoCierre();
    getSucursales();
  }, []);

  const dataUserAndIncidencia = {
    incidencias,
    userData,
    setIncidencias,
    catalogoCierreCombo,
    sucursalesCombo,
  }

  return (
    <IncidenciasContext.Provider value={dataUserAndIncidencia}>
      {children}
    </IncidenciasContext.Provider>
  )
}