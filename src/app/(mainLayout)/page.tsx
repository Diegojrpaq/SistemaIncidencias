'use client'

import React from 'react'
import Sidebar, {
   SidebarItem 
} from "@/components/sidebar/Sidebar";
import '../../styles/globals.css'
import { 
  LuSettings, 
  LuFileBarChart2, 
  LuLayoutDashboard, 
  LuListTodo 
} from "react-icons/lu";
export default function page() {
  return (
    <>
      <div className='flex h-screen'>
        <Sidebar>
          <SidebarItem icon={<LuLayoutDashboard size={27} />} text={"Dashboard"} alert={undefined} />
          <SidebarItem icon={<LuFileBarChart2 size={27} />} text={"Tablero de Incidencias"} />
          <SidebarItem icon={<LuListTodo size={27} />} text={"Incidencias"} />
          <SidebarItem icon={<LuSettings size={27} />} active text={"Configuraciones"} />
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