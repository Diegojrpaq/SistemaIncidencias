"use client";

import React, {useState} from 'react';
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';
import styles from '../styles/componentsStyles/sidebar.module.css';
//import logoSidebar from '../public/assets/LOGO.png'



export default function SideBar2() {

interface UserData {
    nombre: string;
    puesto: string;
  }

  const logoUrl= process.env.NEXT_PUBLIC_LOGO;

        const [toggleSidebar, setTogglesidebar] = useState<Boolean>(true);
        const [userData, setUserData] = useState<UserData>({
            'nombre':'diego',
            'puesto':'Programador'
        });


    return (
        <>
            {/* <div className={toggleSidebar ? "sidebar-hidden" : "sidebar d-none d-md-block"}> */}
            <div className={styles.sidebar}>
                {/*  <!-- Contenido del sidebar --> */}
                <div className={styles.sidebarHeader}>
                    <img src={logoUrl} alt="" className='img-fluid' />
                </div>
                <div className={styles.sidebarContainerItems}>
                    <h2>Dashboard</h2>
                </div>
              {/*   <SHeaderList title="Incidencias" icon='bi bi-clipboard2-data' idcollapse='1'>


                    <SListItem icon='bi bi-bar-chart me-4' >DashBoard</SListItem>
                    <SListItem icon='bi bi-columns-gap me-4' >Tablero de Incidencias</SListItem>
                    <SListItem icon='bi bi-graph-up-arrow me-4' >Incidencias</SListItem>
                    <SListItem icon='bi bi-gear-wide-connected me-4' >Configuracion</SListItem>



                </SHeaderList>
            </div> */}
            </div>
        </>
    );
};