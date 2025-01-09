import React from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";

export const sucursales = [
    { key: 1, label: "Gonzales Gallo" },
    { key: 2, label: "Vallejo" },
    { key: 3, label: "Pablo Valdez" },
    { key: 4, label: "Zapopan" },
    { key: 5, label: "Perisur" },
];

export default function SelectSucursalAsociada() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [idSucursal, setIdSucursal] = React.useState(-1);
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdSucursal(Number(e.target.value));
    };

    const addSucursal = (idSucursal: number) => {
        if(idSucursal === -1) {
            console.log("No se ha seleccionado ninguna sucursal");
            return;
        }

        // Enviar el Id de la sucursal al back-end para agregarlo
        console.log("Send Id: ", idSucursal);
    }
    return (
        <div className="flex w-full max-w-xs items-center gap-2">
            <Select
                value={idSucursal}
                size="sm"
                className="max-w-xs"
                //defaultSelectedKeys={["cat"]}
                label="Agregar sucursal"
                placeholder="Agrega una sucursal"
                onChange={handleSelectionChange}
            >
                {sucursales.map((sucursal) => (
                    <SelectItem key={sucursal.key}>{sucursal.label}</SelectItem>
                ))}
            </Select>
            <Button
                onPress={() => addSucursal(idSucursal)}
            >
                Agregar
            </Button>
        </div>
    );
}