function FiltroCategorias({ categorias, activa, onCambiar }) {
  return (
    <div className="filtros" role="tablist" aria-label="Filtrar por categoría">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          role="tab"
          aria-selected={activa === categoria}
          className={`filtro ${activa === categoria ? 'filtro--activo' : ''}`}
          onClick={() => onCambiar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategorias;
