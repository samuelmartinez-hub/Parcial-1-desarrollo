/**
 * main.js · Lógica de la página.
 * Escucha los eventos personalizados que emite <tarjeta-producto>
 * (agregar-pedido y ver-ficha) y maneja el filtro de categorías,
 * el pedido y la ficha técnica.
 */

const formatoPesosPedido = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// Pedido en memoria: sku -> { titulo, precio, cantidad }
const pedido = new Map();

const dlgFicha = $('#dlg-ficha');
const aviso = $('#aviso');
let temporizadorAviso = null;
let productoEnFicha = null;

/* ---------- Filtro de categorías ---------- */

$$('#filtros .filtro').forEach((boton) => {
  boton.addEventListener('click', () => {
    const categoria = boton.dataset.categoria;

    $$('#filtros .filtro').forEach((b) => {
      b.classList.toggle('filtro--activo', b === boton);
      b.setAttribute('aria-selected', b === boton ? 'true' : 'false');
    });

    let visibles = 0;
    $$('#rejilla tarjeta-producto').forEach((tarjeta) => {
      const coincide = categoria === 'Todos' || tarjeta.getAttribute('categoria') === categoria;
      tarjeta.hidden = !coincide;
      if (coincide) visibles += 1;
    });

    $('#contador-piezas').textContent = `${visibles} ${visibles === 1 ? 'pieza' : 'piezas'} disponibles`;
  });
});

/* ---------- Pedido ---------- */

function agregarAlPedido({ sku, titulo, precio }) {
  const item = pedido.get(sku);
  if (item) {
    item.cantidad += 1;
  } else {
    pedido.set(sku, { titulo, precio, cantidad: 1 });
  }
  actualizarPedido();
  mostrarAviso(`${titulo} se añadió al pedido`);
}

function cambiarCantidad(sku, delta) {
  const item = pedido.get(sku);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) pedido.delete(sku);
  actualizarPedido();
}

function actualizarPedido() {
  const lista = $('#pedido-lista');
  lista.replaceChildren();

  let unidades = 0;
  let total = 0;

  for (const [sku, item] of pedido) {
    unidades += item.cantidad;
    total += item.precio * item.cantidad;

    const li = document.createElement('li');
    li.className = 'pedido__item';

    const info = document.createElement('div');
    const nombre = document.createElement('p');
    nombre.className = 'pedido__nombre';
    nombre.textContent = item.titulo;
    const unitario = document.createElement('p');
    unitario.className = 'pedido__unitario';
    unitario.textContent = `${formatoPesosPedido.format(item.precio)} c/u`;
    info.append(nombre, unitario);

    const cantidad = document.createElement('div');
    cantidad.className = 'cantidad';
    const menos = document.createElement('button');
    menos.type = 'button';
    menos.textContent = '−';
    menos.setAttribute('aria-label', `Quitar una unidad de ${item.titulo}`);
    menos.addEventListener('click', () => cambiarCantidad(sku, -1));
    const num = document.createElement('span');
    num.textContent = item.cantidad;
    const mas = document.createElement('button');
    mas.type = 'button';
    mas.textContent = '+';
    mas.setAttribute('aria-label', `Añadir una unidad de ${item.titulo}`);
    mas.addEventListener('click', () => cambiarCantidad(sku, 1));
    cantidad.append(menos, num, mas);

    const importe = document.createElement('p');
    importe.className = 'pedido__importe';
    importe.textContent = formatoPesosPedido.format(item.precio * item.cantidad);

    li.append(info, cantidad, importe);
    lista.append(li);
  }

  $('#contador').textContent = unidades;
  $('#pedido-vacio').hidden = unidades > 0;
  $('#pedido-resumen').hidden = unidades === 0;
  $('#pedido-total').textContent = formatoPesosPedido.format(total);
}

/* ---------- Aviso ---------- */

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.add('aviso--visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('aviso--visible'), 2200);
}

/* ---------- Eventos del componente ---------- */

document.addEventListener('agregar-pedido', (e) => agregarAlPedido(e.detail));

document.addEventListener('ver-ficha', (e) => {
  const { sku, titulo, descripcion, imagen, categoria, precio } = e.detail;
  productoEnFicha = { sku, titulo, precio };

  $('#ficha-imagen').src = imagen;
  $('#ficha-imagen').alt = titulo;
  $('#ficha-categoria').textContent = categoria;
  $('#ficha-titulo').textContent = titulo;
  $('#ficha-descripcion').textContent = descripcion;
  $('#ficha-precio').textContent = formatoPesosPedido.format(precio);
  dlgFicha.showModal();
});

/* ---------- Controles de la interfaz ---------- */

$('#btn-pedido').addEventListener('click', () => {
  $('#pedido').scrollIntoView({ behavior: 'smooth' });
});

$('#btn-vaciar').addEventListener('click', () => {
  pedido.clear();
  actualizarPedido();
});

$('#ficha-agregar').addEventListener('click', () => {
  if (productoEnFicha) agregarAlPedido(productoEnFicha);
  dlgFicha.close();
});

dlgFicha.querySelector('[data-cerrar]').addEventListener('click', () => dlgFicha.close());
dlgFicha.addEventListener('click', (e) => {
  if (e.target === dlgFicha) dlgFicha.close();
});

actualizarPedido();
