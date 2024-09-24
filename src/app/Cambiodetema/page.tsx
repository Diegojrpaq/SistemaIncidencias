// pages/index.tsx
'use client'
import { useState } from 'react';
import '../../../styles/theme.css';
import  styles  from './theme.module.css';

const Home: React.FC = () => {
    const [theme, setTheme] = useState<string>('');

    const toggleTheme = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <div className={` ${theme} ${styles.appContainer}`}>
            <h1>Selector de Temas</h1>
            <button className={styles.myButton} onClick={() => toggleTheme('')}>Tema por Defecto</button>
            <button onClick={() => toggleTheme('dark')}>Tema Oscuro</button>
            <button onClick={() => toggleTheme('neon')}>Tema Neón</button>
            <p>Este es un texto de ejemplo con el tema {theme || 'por defecto'}.</p>
        </div>
    );
};

export default Home;
