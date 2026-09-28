import { formatearPrecio } from '../utils.js';

/**
 * TarjetaProducto: componente reutilizable del catálogo.
 *
 * Props
 *  - imagen       {string}   Ruta de la imagen del producto.
 *  - titulo       {string}   Nombre del producto.
 *  - descripcion  {string}   Texto descriptivo corto.
 *  - precio       {number}   Valor en pesos colombianos (COP).
 *  - categoria    {string}   Categoría, se muestra sobre el título.
 *  - etiqueta     {string}   (opcional) Insignia sobre la imagen, ej. "Nuevo".
 *
 * Eventos (funciones que recibe del componente padre)
 *  - onAgregar()   Se dispara al pulsar "Añadir al pedido".
 *  - onVerFicha()  Se dispara al pulsar "Ficha técnica".
 */
function TarjetaProducto({
  imagen,
  titulo,
  descripcion,
  precio,
  categoria,
  etiqueta,
  onAgregar,
  onVerFicha,
}) {
  return (
    <article className="tarjeta">
      <div className="tarjeta__imagen">
        <img src={imagen} alt={titulo} loading="lazy" />
        {etiqueta && <span className="tarjeta__etiqueta">{etiqueta}</span>}
      </div>

      <div className="tarjeta__cuerpo">
        <p className="tarjeta__categoria">{categoria}</p>
        <h3 className="tarjeta__titulo">{titulo}</h3>
        <p className="tarjeta__descripcion">{descripcion}</p>

        <div className="tarjeta__pie">
          <span className="tarjeta__precio">{formatearPrecio(precio)}</span>
          <div className="tarjeta__acciones">
            <button type="button" className="boton boton--primario" onClick={onAgregar}>
              Añadir al pedido
            </button>
            <button type="button" className="boton boton--texto" onClick={onVerFicha}>
              Ficha técnica
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;
