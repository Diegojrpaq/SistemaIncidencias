'use client'

import React, { useContext, createContext, useState } from "react"
import Image from "next/image";
import logo from '../../../public/assets/LOGO.png';

interface SidebarProps {
  children: React.ReactNode
}

interface InterfaceSidebarContext {
  expanded: boolean;
}

const SidebarContext = createContext<InterfaceSidebarContext | undefined>(undefined)

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className={`
        h-full flex flex-col bg-white border-r shadow-sm 
        ${expanded ? 'w-64' : 'w-16'} 
        transition-width duration-300`}
      >
        <div className="p-4 pb-2 flex justify-center items-center">
          <Image
            src={logo}
            className={`
              overflow-hidden transition-all 
              ${expanded ? "w-full" : "w-0"
              }`}
              alt="logo_Nextpack"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? "<" : ">"}
            {/* {expanded ? <ChevronFirst /> : <ChevronLast />} */}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className={`
            flex flex-col h-full w-full justify-around px-3 
            ${expanded ? 'overflow-y-auto scrollbar-none' : 'overflow-y-hidden'} 
            overflow-x-hidden`}
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
      <Image
        width={20}
        height={0}
        alt="Icon"
        src={icon}
      />
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