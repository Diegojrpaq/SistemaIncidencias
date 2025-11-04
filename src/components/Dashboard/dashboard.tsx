"use client";

import { Construction } from "lucide-react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function EnConstruccion() {
    return (
        <main className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-xl shadow-md p-10 max-w-md text-center animate-fadeIn">

                {/* Icono */}
                <div className="flex justify-center mb-6">
                    <Construction size={64} className="text-gray-500" />
                </div>

                {/* Título */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    Página en desarrollo
                </h1>

                {/* Subtítulo */}
                <p className="text-gray-600 mt-4">
                    Esta sección aún no está lista, estamos trabajando en ella.
                </p>

                {/* Botón regresar */}
                <div className="mt-8">
                    <Link href="/home">
                        <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg">
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
