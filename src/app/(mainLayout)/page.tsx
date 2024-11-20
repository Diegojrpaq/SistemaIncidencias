'use client'

import React from 'react'
import Sidebar, { SidebarItem } from "@/components/sidebar/Sidebar";
import '../../styles/globals.css'
import icon from '../../../public/assets/informe.png';
import reporte from '../../../public/assets/reporte.png';
import incidencias from '../../../public/assets/incidencias.png';
import config from '../../../public/assets/config.png';
export default function page() {
  return (
    <>
      <div className='flex h-screen'>
        <Sidebar>
          <SidebarItem icon={icon} text={"Dashboard"} active alert={undefined} />
          <SidebarItem icon={reporte} text={"Tablero de Incidencias"} />
          <SidebarItem icon={incidencias} text={"Incidencias"} />
          <SidebarItem icon={config} text={"Configuraciones"} />
          {/* <SidebarItem icon={icon} text={"Dashboard"} alert={undefined} />
          <SidebarItem icon={reporte} text={"Tablero de Incidencias"} />
          <SidebarItem icon={incidencias} text={"Incidencias"} />
          <SidebarItem icon={config} text={"Configuraciones"} />
          <SidebarItem icon={icon} text={"Dashboard"} alert={undefined} />
          <SidebarItem icon={reporte} text={"Tablero de Incidencias"} />
          <SidebarItem icon={incidencias} text={"Incidencias"} />
          <SidebarItem icon={config} text={"Configuraciones"} />
          <SidebarItem icon={reporte} text={"Tablero de Incidencias"} />
          <SidebarItem icon={incidencias} text={"Incidencias"} />
          <SidebarItem icon={config} text={"Configuraciones"} />
          <SidebarItem icon={reporte} text={"Tablero de Incidencias"} />
          <SidebarItem icon={incidencias} text={"Incidencias"} />
          <SidebarItem icon={config} text={"Configuraciones"} /> */}
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