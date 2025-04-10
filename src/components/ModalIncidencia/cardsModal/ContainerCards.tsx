import {
    chatData,
    IncidenciaDataModal,
    scanDto,
} from "@/lib/interfaces";
import InformacionDeGuia from "./InformacionDeGuia";
import InformacionDeIncidencia from "./InformacionDeIncidencia";
import InformacionSucursales from "./InformacionSucursales";
import DetalleEscaneo from "./DetalleEscaneo";

interface ContainerCardsProps {
    incidencia: IncidenciaDataModal;
    chatData: chatData | undefined;
    detalleEscaneo: scanDto | undefined;
}

const ContainerCards = ({
    incidencia,
    chatData,
    detalleEscaneo
}: ContainerCardsProps) => {
    return (
        <div className="flex flex-col gap-3 p-4">
            <InformacionDeGuia
                incidencia={incidencia}
            />

            <InformacionDeIncidencia
                incidencia={incidencia}
            />

            <InformacionSucursales
                chatData={chatData}
                incidencia={incidencia}
            />

            <DetalleEscaneo
                detalleEscaneo={detalleEscaneo}
            />
        </div>
    )
}

export default ContainerCards
