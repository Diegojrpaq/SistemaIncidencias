'use client'


/*Importaciones de estilo inicio  */
import '../../styles/globals.css'
/*Importaciones de estilo fin  */
/*----------------------------------------------------------------------------*/
/*Importaciones de funcione react  */
import { useState, useEffect } from 'react'
/*Importaciones de funcione react  */
/*----------------------------------------------------------------------------*/
/*Importaciones de funcione dependencias */
import Sidebar, {
  SidebarItem
} from "@/components/sidebar/Sidebar";
import { Spinner } from "@nextui-org/spinner";
import {
  LuSettings,
  LuFileBarChart2,
  LuLayoutDashboard,
  LuListTodo
} from "react-icons/lu";
import { fetchGet } from "@/lib/api";
import { dataResponse } from '@/lib/interfaces';
import Navbar from '@/components/navbar/Navbar';
import { IncidenciaProvider } from '@/context/IncidenciasContext';
import { urlServer } from '@/lib/url';
import { useSearchParams } from 'next/navigation';
import { SearchProvider } from '@/context/SearchContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/*Importaciones de funcione dependencias */
/*----------------------------------------------------------------------------*/


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [sessionData, setSessionData] = useState<dataResponse | null>(null);
  const searchParams = useSearchParams();
  const idUser = searchParams.get('id');

  useEffect(() => {
    const getDataUser = async () => {
      try {
        if (idUser !== null) {
          localStorage.setItem("idUser", idUser);
        }
        let id;
        if (idUser !== null) {
          id = idUser;
        } else {
          id = localStorage.getItem("idUser");
        }
        const responseData = await fetchGet(`${urlServer}/Incidencias/getSession/${id}`);
        if (responseData.status !== 200) {
          throw new Error('Error al obtener los datos');
        }
        setSessionData(responseData);
      } catch (error) {
        console.log('Error GetDataUser')
      }
    }
    getDataUser();
  }, []);


  if (sessionData === null) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Spinner size='lg' label='Cargando...' />
      </div>
    )
  } else {
    return (
      <>
        <div className='flex h-screen'>
          <Sidebar dataUser={sessionData?.User}>
            <SidebarItem
              icon={<LuListTodo size={27} />}
              text={"Incidencias"}
              link={"/"}
            />
            <SidebarItem
              icon={<LuFileBarChart2 size={27} />}
              text={"Tablero de Incidencias"}
              link={"/table"}
            />
            <SidebarItem
              icon={<LuLayoutDashboard size={27} />}
              text={"Dashboard"}
              alert={undefined}
              link={"/"}
            />
            <SidebarItem
              icon={<LuSettings size={27} />}
              active text={"Configuraciones"}
              link={"/about"}
            />
          </Sidebar>

          <div className="flex-1 flex flex-col z-10">
            <SearchProvider>
              {/* Navbar */}
              <Navbar
                user={sessionData?.User}
                catalogoSucursales={sessionData?.User?.catalogoSucursales}
              />
              <ToastContainer
                position='top-center'
                autoClose={3000}
              />
              <IncidenciaProvider userData={sessionData?.User}>
                {children}
              </IncidenciaProvider>
            </SearchProvider>
          </div>
        </div>
      </>
    )
  }
}
