'use client'

import { useState, useEffect } from 'react'
import Sidebar, {
  SidebarItem
} from "@/components/sidebar/Sidebar";
import { Spinner } from "@nextui-org/spinner";
import '@/styles/globals.css'
import {
  LuSettings,
  LuFileBarChart2,
  LuLayoutDashboard,
  LuListTodo
} from "react-icons/lu";
import { fetchGet } from "@/lib/api";
import { dataResponse } from '@/lib/interfaces';

export default function page() {
  const [data, setData] = useState<dataResponse | null>(null);

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const res = await fetchGet(`http://192.168.10.137/Incidencias/getSession/1701`);
        if (res.status !== 200) {
          throw new Error('Error al obtener los datos');
        }
        setData(res);
      } catch (error) {
        console.log('Error GetDataUser')
      }
    }
    getDataUser();
  }, []);

  if (data === null) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Spinner size='lg' label='Cargando...' />
      </div>
    )
  } else {
    return (
      <>
        <div className='flex h-screen'>
          <Sidebar dataUser={data?.User}>
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
            <SidebarItem icon={<LuSettings size={27} />} active text={"Configuraciones"} />

            {/* <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
  
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
  
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
  
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
  
            <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
            <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
            <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} /> */}
          </Sidebar>

          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <nav className='bg-blue-600 text-white p-4'>
              Navbar
            </nav>

            {/* Main content */}
            <main className='flex-1 p-4 bg-gray-300'>
              Main
            </main>
          </div>
        </div>
      </>
    )
  }
}