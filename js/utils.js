const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function formatearPrecio(valor) {
  return formatoPesos.format(valor);
}

// Resuelve la ruta de una imagen de assets/img (funciona en desarrollo y en build).
export function rutaImagen(nombre) {
  return new URL(`../assets/img/${nombre}.svg`, import.meta.url).href;
}
