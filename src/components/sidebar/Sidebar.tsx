'use client'

import React, { useContext, createContext, useState, useEffect } from "react"
import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import logo from '../../../public/assets/LOGO.png';
import styles from './sidebar.module.css'

interface SidebarProps {
  children: React.ReactNode
}

interface InterfaceSidebarContext {
  expanded: boolean;
}

const SidebarContext = createContext<InterfaceSidebarContext | undefined>(undefined)

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true)
  const [active, setActive] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar tamaño de pantalla
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsMobile(true);
        setExpanded(false);
      } else {
        setIsMobile(false);
      }
    };

    // Establecer el estado al cargar el componente
    handleResize();

    // Agregar event listener para cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener al desmontar el componente expanded ? 'translate-x-72 transition-transform' : '-translate-x-4 transition-transform'
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSidebar = () => {
    setActive(!active);
    setExpanded((curr) => !curr)
  }
  return (
    <aside className="h-screen static">

      <button
        className={
          `fixed top-1/2  sm:hidden bg-gray-50 hover:bg-gray-100
           p-3 rounded-full z-50 transform -translate-y-1/2
          ${isMobile ?
            expanded ? 'translate-x-[92vw] transition-transform bg-gray-200' : 
            '-translate-x-4 transition-transform'
            : ''
          }
           `
        }
        onClick={activeSidebar}
      >
        {expanded ? <LuChevronLeft size={24} /> : <LuChevronRight size={24} />}
      </button>

      <div className={`${isMobile ? 'h-full' : 
        'h-full md:flex flex-col bg-white border-r shadow-sm'}`}
      >
        <nav className={`
        h-full md:flex flex-col bg-white border-r shadow-sm 
        ${isMobile ?
            expanded ? 'w-screen fixed flex flex-col h-full text-xl' : 'w-16 h-max -ml-20'
            : expanded ? 'w-64' : 'w-16'}
            transition-width duration-300`
        }
        >
          <div className="p-4 pb-2 flex justify-center items-center">
            <div className="w-full">
              <Image
                src={logo}
                className={`
              overflow-hidden transition-all 
             `}
                alt="logo_Nextpack"
                width={isMobile ? 160 : 300}
              />
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hidden md:block"
            >
              {expanded ? <LuChevronLeft size={24} /> : <LuChevronRight size={24} />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className={`
            flex flex-col h-full w-full 
            ${isMobile ? 
              'items-start justify-start gap-2' : 
              'justify-around'} px-3 
              overflow-y-auto overflow-x-hidden ${styles.scrollContainer}
            `}
            >
              {children}
            </ul>
          </SidebarContext.Provider>

          <div className="border-t flex justify-center p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "hidden w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Moises Velez Avila</h4>
                <span className="text-xs text-gray-600">Desarollo1@nextpack.mx</span>
              </div>
              {/*             <MoreVertical size={20} />
 */}          </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}


interface propsSidebarItems {
  icon?: any;
  text?: string;
  active?: boolean;
  alert?: any;
}

const useSidebar = (): InterfaceSidebarContext => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export function SidebarItem({ icon, text, active, alert }: propsSidebarItems) {
  const { expanded } = useSidebar();

  return (
    <li
      className={`
        relative flex justify-center items-center p-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`
          overflow-hidden transition-all 
          ${expanded ? "w-52 ml-3" : "hidden w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`
            absolute right-2 w-2 h-2 rounded bg-indigo-400 
            ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

export default Sidebar;