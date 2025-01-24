import { fetchIncidencias } from "@/lib/api";
import { dataUser, Incidencia } from "@/lib/interfaces";
import { urlServer } from "@/lib/url";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IncidenciaContextType {
    incidencias: Incidencia[];
    userData: dataUser;
    //loading: boolean;
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
    useEffect(() => {
        // Llama a la API para obtener los datos del usuario
        const fetchUser = async () => {
          try {
            const response = await fetch(`${urlServer}/Incidencias/getListIncidencias/${userData.id}`);
            const data = await response.json();
            const newIncidencias = await fetchIncidencias(data.catalogoIncidencias);
            setIncidencias(newIncidencias);
          } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
          } 
        };
    
        fetchUser();
      }, []);

      const dataUserAndIncidencia = {
        incidencias,
        userData
      }

      return (
        <IncidenciasContext.Provider value={dataUserAndIncidencia}>
            {children}
        </IncidenciasContext.Provider>
      )
}