import React from 'react'
import styles from '../../../styles/componentsStyles/exampleCardFlex.module.css'
import { Button } from 'primereact/button';

// Declarar la interfaz para el objeto
interface Contenido {
  tittle: string;
  contenidoString: string;
}


export default function page() {

  const contenido:Contenido={
    'tittle':'Orders',
    'contenidoString':'Nuevo contenido corregido y trabajado en Object'
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p>implementacion de prime react</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-3">
            <div className={styles.boxColorPrimary}>
              <h5>{contenido.tittle}</h5>
              <p>{contenido.contenidoString}</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.boxColorSecondary}>
              <h5>{contenido.tittle}</h5>
              <p>{contenido.contenidoString}</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.boxColorTertiary}>
              <h5>{contenido.tittle}</h5>
              <p>{contenido.contenidoString}</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className={styles.boxColorTertiaryOptional}>
              <h5>{contenido.tittle}</h5>
              <p>{contenido.contenidoString}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={styles.boxColorPrimaryContrast}>
              <h5>{contenido.tittle}</h5>
              <p>{contenido.contenidoString}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="h3">Aqui vamos a poner componentes para calar el tema de PrimeReact</p>
            <Button 
             label='Submit' 
               /*  className={`btn-primary btn ${styles.myButton}`} */
                className='myButtonSecondary' 
             >
             </Button>
          </div>
        </div>
      </div>


    </>
  )
}


/* import Image from "next/image";
import styles from "../../styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
 */