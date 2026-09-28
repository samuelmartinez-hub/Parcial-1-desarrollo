import { useEffect, useRef } from 'react';
import { formatearPrecio } from '../utils.js';

function FichaTecnica({ producto, onCerrar, onAgregar }) {
  const dialogo = useRef(null);

  // Abre o cierra el <dialog> nativo según haya un producto seleccionado.
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (producto && !el.open) el.showModal();
    if (!producto && el.open) el.close();
  }, [producto]);

  return (
    <dialog
      ref={dialogo}
      className="ficha"
      onClose={onCerrar}
      onClick={(e) => { if (e.target === dialogo.current) onCerrar(); }}
      aria-labelledby="ficha-titulo"
    >
      {producto && (
        <>
          <button type="button" className="ficha__cerrar" onClick={onCerrar} aria-label="Cerrar la ficha">✕</button>
          <img className="ficha__imagen" src={producto.imagen} alt={producto.titulo} />
          <div className="ficha__contenido">
            <p className="tarjeta__categoria">{producto.categoria}</p>
            <h2 id="ficha-titulo">{producto.titulo}</h2>
            <p className="ficha__texto">{producto.descripcion}</p>
            <dl className="ficha__datos">
              {Object.entries(producto.ficha).map(([clave, valor]) => (
                <div key={clave}>
                  <dt>{clave}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
            <p className="ficha__precio">{formatearPrecio(producto.precio)}</p>
            <button type="button" className="boton boton--primario" onClick={() => { onAgregar(producto); onCerrar(); }}>
              Añadir al pedido
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

export default FichaTecnica;
