import { Incidencia } from "@/lib/interfaces";
import { urlServer } from "@/lib/url";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IncidenciaContextType {
    incidencias: Incidencia[];
    //loading: boolean;
}

export const IncidenciasContext = createContext<Incidencia[] | undefined>(undefined);

//props para provider
interface IncidenciaProviderProps {
    children: ReactNode;
}

//Crear provider
export const IncidenciaProvider: React.FC<IncidenciaProviderProps> = ({ children }) => {
    const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Llama a la API para obtener los datos del usuario
        const fetchUser = async () => {
          try {
            const response = await fetch(`${urlServer}/Incidencias/getListIncidencias/1`); // Cambia la URL según tu configuración
            const data = await response.json();
            console.log("Incidencias: ",data.catalogoIncidencias)
            setIncidencias(data.catalogoIncidencias);
          } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, []);

      return (
        <IncidenciasContext.Provider value={incidencias}>
            {children}
        </IncidenciasContext.Provider>
      )
}