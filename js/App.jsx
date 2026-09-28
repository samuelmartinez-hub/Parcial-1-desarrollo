import { useMemo, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import FiltroCategorias from './components/FiltroCategorias.jsx';
import TarjetaProducto from './components/TarjetaProducto.jsx';
import PanelPedido from './components/PanelPedido.jsx';
import FichaTecnica from './components/FichaTecnica.jsx';
import { CATEGORIAS, PRODUCTOS } from './data/productos.js';
import { rutaImagen } from './utils.js';

function App() {
  const [categoria, setCategoria] = useState('Todos');
  const [pedido, setPedido] = useState([]);       // [{ id, titulo, precio, cantidad }]
  const [fichaAbierta, setFichaAbierta] = useState(null);
  const [aviso, setAviso] = useState('');

  const visibles = useMemo(
    () => (categoria === 'Todos' ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === categoria)),
    [categoria]
  );

  const unidades = pedido.reduce((suma, item) => suma + item.cantidad, 0);
  const total = pedido.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  // Evento que reciben las tarjetas: añade el producto al pedido.
  function agregar(producto) {
    setPedido((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
      }
      return [...actual, { id: producto.id, titulo: producto.titulo, precio: producto.precio, cantidad: 1 }];
    });
    setAviso(`${producto.titulo} se añadió al pedido`);
    window.clearTimeout(agregar.temporizador);
    agregar.temporizador = window.setTimeout(() => setAviso(''), 2200);
  }

  function cambiarCantidad(id, delta) {
    setPedido((actual) =>
      actual
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    );
  }

  function irAlPedido() {
    document.getElementById('pedido')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Encabezado unidades={unidades} onAbrirPedido={irAlPedido} />

      <main id="inicio">
        <section className="hero">
          <div className="hero__texto">
            <h1>Precisión con carácter.</h1>
            <p>
              Armería deportiva y de colección. Piezas de acero y nogal, elegidas una por una
              para quienes valoran el oficio bien hecho.
            </p>
            <a className="boton boton--primario boton--grande" href="#catalogo">Ver el catálogo</a>
          </div>
          <img className="hero__imagen" src={rutaImagen('hero')} alt="Rifle de cerrojo con mira telescópica" width="900" height="900" />
        </section>

        <section className="catalogo" id="catalogo" aria-labelledby="catalogo-titulo">
          <div className="catalogo__interior">
            <div className="catalogo__cabecera">
              <div>
                <h2 id="catalogo-titulo" className="seccion__titulo">Catálogo</h2>
                <p className="seccion__texto">{visibles.length} {visibles.length === 1 ? 'pieza' : 'piezas'} disponibles</p>
              </div>
              <FiltroCategorias categorias={CATEGORIAS} activa={categoria} onCambiar={setCategoria} />
            </div>

            {/* El mismo componente, reutilizado con datos distintos */}
            <div className="rejilla">
              {visibles.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  imagen={producto.imagen}
                  titulo={producto.titulo}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  categoria={producto.categoria}
                  etiqueta={producto.etiqueta}
                  onAgregar={() => agregar(producto)}
                  onVerFicha={() => setFichaAbierta(producto)}
                />
              ))}
            </div>
          </div>
        </section>

        <PanelPedido items={pedido} total={total} onCambiarCantidad={cambiarCantidad} onVaciar={() => setPedido([])} />

        <section className="servicio" id="servicio">
          <h2 className="seccion__titulo">Compra responsable</h2>
          <p className="seccion__texto">
            Toda adquisición exige documentación y permisos vigentes según la normativa colombiana. Este
            sitio es un proyecto académico ficticio: no se realizan ventas reales.
          </p>
        </section>
      </main>

      <footer className="pie">
        <p>Proyecto académico del primer parcial de Desarrollo de Aplicaciones Web y Sistemas Operativos, Universidad Francisco de Paula Santander Ocaña.</p>
      </footer>

      <FichaTecnica producto={fichaAbierta} onCerrar={() => setFichaAbierta(null)} onAgregar={agregar} />
      <div className={`aviso ${aviso ? 'aviso--visible' : ''}`} role="status" aria-live="polite">{aviso}</div>
    </>
  );
}

export default App;
