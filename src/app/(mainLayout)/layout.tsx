import Sidebar, { SidebarItem } from "@/components/sidebar/Sidebar";
import '../../styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Este layout contendra el contenido 
      creado en especifico para las vistas 
      principales de la aplicacion */}
      {/* <h1>Sidebar Main</h1> */}

      {/* <h1 className="">Navabar Main</h1> */}
      {children}
    </>
  );
}
