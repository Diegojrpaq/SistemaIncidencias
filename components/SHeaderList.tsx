"use client";
// Definición de la interfaz para las propiedades del componente
interface SHeaderListProps {
    title: string;
    idcollapse: string;
    icon: string;
    children: React.ReactNode;
}

const SHeaderList: React.FC<SHeaderListProps> = (props) => {
    // Obtener la función setRutaActual desde el contexto

    // Manejo del clic para actualizar la ruta actual en el contexto


    return (
        <>
            <div className='headerlist my-2'>
                <a
                    href={'#' + props.idcollapse}
                    className='btn-collapse d-flex bd-highlight'
                    data-bs-toggle="collapse"
                    role="button"
                    aria-controls={props.idcollapse}
                >
                    <i className={`${props.icon} bd.highlight me-4 h4`}></i>
                    <p className='bd.highlight h3'>{props.title}</p>
                    <i className="bi bi-chevron-right bd.highlight ms-auto"></i>
                </a>
            </div>
            <div className="collapse list" id={props.idcollapse}>
                <ul>
                    {props.children}
                </ul>
            </div>

            {/* Comentado: código alternativo para visualización */}
            {/* <div>
        <a
          href="#collapseExample"
          className='btn-collapse'
          data-bs-toggle="collapse"
          role="button"
          aria-controls="collapseExample">
          <h5><i className={props.icon}></i>{props.title}</h5></a>
      </div>
      <div className="collapse" id="collapseExample">
        <ul>
          {props.children}
        </ul>
      </div> */}
        </>
    );
};

export default SHeaderList;
