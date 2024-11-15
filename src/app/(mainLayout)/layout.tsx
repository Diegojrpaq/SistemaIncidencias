
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
      <h1>Sidebar Main</h1>
      <h1>Navabar Main</h1>
      {children}
      </>
  );
}
