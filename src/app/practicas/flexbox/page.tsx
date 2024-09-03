// pagina flexbox 
import React from 'react'
import styles from '../../../../styles/practicas/flexbox.module.css'

export default function page() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.columna}>
                        <h2>35</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className={styles.columna}>
                        <h2>35</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className={styles.columna}>
                        <h2>35</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className={styles.columna}>
                        <h2>35</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </main>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <p>Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                            Quis, ratione.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
