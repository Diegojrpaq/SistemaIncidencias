'use client'
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
        <h1>Sidebar para login </h1>
        <h1>Navabar para login</h1>
        {children}
        </>
    );
  }