import { rutaImagen } from '../utils.js';

// Catálogo ficticio. Los precios están en pesos colombianos (COP).
// Proyecto académico: no representa productos ni ventas reales.

export const CATEGORIAS = ['Todos', 'Pistolas', 'Rifles', 'Accesorios'];

export const PRODUCTOS = [
  {
    id: 'ASN-001',
    categoria: 'Pistolas',
    titulo: 'Halcón 9',
    descripcion: 'Pistola semiautomática compacta de uso deportivo, con empuñadura texturizada y acabado pavonado mate.',
    precio: 4850000,
    imagen: rutaImagen('halcon9'),
    etiqueta: 'Nuevo',
    ficha: { Tipo: 'Semiautomática', Calibre: '9 mm', Acabado: 'Pavón mate', Uso: 'Tiro deportivo' },
  },
  {
    id: 'ASN-002',
    categoria: 'Pistolas',
    titulo: 'Mesa 38',
    descripcion: 'Revólver de acero de línea clásica con cachas de nogal. Pieza pensada para coleccionistas.',
    precio: 3900000,
    imagen: rutaImagen('mesa38'),
    etiqueta: 'Colección',
    ficha: { Tipo: 'Revólver', Calibre: '.38 Especial', Acabado: 'Acero pulido', Uso: 'Colección' },
  },
  {
    id: 'ASN-003',
    categoria: 'Rifles',
    titulo: 'Sierra',
    descripcion: 'Rifle de cerrojo con culata de nogal y mira telescópica incluida. Balance estable para precisión a distancia.',
    precio: 7200000,
    imagen: rutaImagen('sierra'),
    etiqueta: '',
    ficha: { Tipo: 'Cerrojo', Calibre: '.308', Acabado: 'Nogal y pavón', Uso: 'Caza deportiva' },
  },
  {
    id: 'ASN-004',
    categoria: 'Rifles',
    titulo: 'Ribera',
    descripcion: 'Escopeta de corredera de uso versátil, con guardamano acanalado y cañón de acero endurecido.',
    precio: 5400000,
    imagen: rutaImagen('ribera'),
    etiqueta: '',
    ficha: { Tipo: 'Corredera', Calibre: 'Calibre 12', Acabado: 'Nogal y pavón', Uso: 'Tiro al plato' },
  },
  {
    id: 'ASN-005',
    categoria: 'Accesorios',
    titulo: 'Bruma',
    descripcion: 'Cuchillo de campo de hoja fija, con mango de nogal y remaches de latón. Ideal para acampar y senderismo.',
    precio: 380000,
    imagen: rutaImagen('bruma'),
    etiqueta: 'Más vendido',
    ficha: { Tipo: 'Hoja fija', Hoja: 'Acero al carbono', Mango: 'Nogal', Uso: 'Campo' },
  },
  {
    id: 'ASN-006',
    categoria: 'Accesorios',
    titulo: 'Estuche rígido',
    descripcion: 'Estuche de transporte con cierres de latón y interior acolchado, para guardar y trasladar el equipo con seguridad.',
    precio: 520000,
    imagen: rutaImagen('estuche'),
    etiqueta: '',
    ficha: { Tipo: 'Estuche rígido', Material: 'Polímero reforzado', Cierres: 'Latón', Uso: 'Transporte' },
  },
];
