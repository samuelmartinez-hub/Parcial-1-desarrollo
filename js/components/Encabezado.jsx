function Encabezado({ unidades, onAbrirPedido }) {
  return (
    <header className="encabezado">
      <div className="encabezado__interior">
        <a className="marca" href="#inicio" aria-label="Armería Sierra Norte, inicio">
          <svg width="26" height="26" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
            <circle cx="32" cy="32" r="16" />
            <circle cx="32" cy="32" r="3.5" fill="currentColor" stroke="none" />
            <path d="M32 6v10M32 48v10M6 32h10M48 32h10" />
          </svg>
          <span>Sierra Norte</span>
        </a>

        <nav className="encabezado__enlaces" aria-label="Principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#servicio">Servicio</a>
        </nav>

        <button type="button" className="pedido-boton" onClick={onAbrirPedido} aria-label={`Ver el pedido, ${unidades} productos`}>
          <span>Pedido</span>
          <span className="pedido-boton__contador">{unidades}</span>
        </button>
      </div>
    </header>
  );
}

export default Encabezado;
