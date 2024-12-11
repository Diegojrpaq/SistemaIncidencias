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
/*Importaciones de funcione dependencias */
/*----------------------------------------------------------------------------*/


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){
  const [sessionData, setSessionData] = useState<dataResponse | null>(null);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const responseData = await fetchGet(`${urlServer}/Incidencias/getSession/1591`);
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
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} link={"/"}/>
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} link={"/"}/>
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} link={"/about"}/>
            <SidebarItem icon={<LuSettings size={27} />} active text={"Configuraciones"} link={"/"}/>
          </Sidebar>

          <div className="flex-1 flex flex-col z-10">
            {/* Navbar */}
            <Navbar />
            <IncidenciaProvider userData={sessionData?.User}>
              {children}
            </IncidenciaProvider>

            {/* Main content */}
            {/* <main className=''>
              Main
            </main> */}
           
          </div>
        </div>
      </>
    )
  }
}
