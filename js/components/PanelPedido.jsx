import { formatearPrecio } from '../utils.js';

function PanelPedido({ items, total, onCambiarCantidad, onVaciar }) {
  return (
    <section className="pedido" id="pedido" aria-labelledby="pedido-titulo">
      <div className="pedido__interior">
        <h2 id="pedido-titulo" className="seccion__titulo">Tu pedido</h2>

        {items.length === 0 ? (
          <p className="pedido__vacio">Aún no has añadido productos. Elige alguno del catálogo.</p>
        ) : (
          <>
            <ul className="pedido__lista">
              {items.map((item) => (
                <li key={item.id} className="pedido__item">
                  <div>
                    <p className="pedido__nombre">{item.titulo}</p>
                    <p className="pedido__unitario">{formatearPrecio(item.precio)} c/u</p>
                  </div>
                  <div className="cantidad" aria-label={`Cantidad de ${item.titulo}`}>
                    <button type="button" onClick={() => onCambiarCantidad(item.id, -1)} aria-label="Quitar una unidad">−</button>
                    <span>{item.cantidad}</span>
                    <button type="button" onClick={() => onCambiarCantidad(item.id, 1)} aria-label="Añadir una unidad">+</button>
                  </div>
                  <p className="pedido__importe">{formatearPrecio(item.precio * item.cantidad)}</p>
                </li>
              ))}
            </ul>

            <div className="pedido__resumen">
              <p className="pedido__total"><span>Total</span><strong>{formatearPrecio(total)}</strong></p>
              <button type="button" className="boton boton--texto" onClick={onVaciar}>Vaciar pedido</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default PanelPedido;
