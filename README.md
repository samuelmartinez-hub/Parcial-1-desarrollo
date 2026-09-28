# Armería Sierra Norte: catálogo con React

Proyecto del **primer parcial** de *Desarrollo de Aplicaciones Web y Sistemas Operativos* (193308), Universidad Francisco de Paula Santander Ocaña.

**Estudiante:** [ESCRIBE AQUÍ TU NOMBRE COMPLETO] (código [ESCRIBE AQUÍ TU CÓDIGO])
**Docente:** José Barbosa

> **Aviso:** es un proyecto académico ficticio. No representa una tienda real ni se realizan ventas. Toda adquisición de armas reales exige documentación y permisos según la normativa colombiana vigente.

## Descripción

Catálogo de una armería deportiva y de colección con diseño oscuro y minimalista. Sirve para demostrar la **componentización** con React y Vite: una tarjeta de producto (`TarjetaProducto`) reutilizable que recibe datos por props y avisa a la página mediante eventos.

## Estructura del proyecto

```
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── css/
│   ├── base.css                 Variables, tipografía y botones
│   ├── layout.css               Encabezado, hero, catálogo, pedido y diálogo
│   └── tarjeta-producto.css     Estilos del componente
├── js/
│   ├── main.jsx                 Punto de entrada
│   ├── App.jsx                  Estado del pedido, filtro y eventos
│   ├── utils.js                 Formato de precio y rutas de imágenes
│   ├── data/
│   │   └── productos.js         Catálogo (6 productos)
│   └── components/
│       ├── TarjetaProducto.jsx  Componente principal del taller
│       ├── Encabezado.jsx
│       ├── FiltroCategorias.jsx
│       ├── PanelPedido.jsx
│       └── FichaTecnica.jsx
└── assets/
    └── img/                     Ilustraciones SVG de los productos
```

## Cómo ejecutarlo

Requiere **Node.js 18 o superior**. En Nobara Linux (basada en Fedora):

```bash
sudo dnf install nodejs npm    # solo si aún no lo tienes
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción: `npm run build`.

## El componente `TarjetaProducto`

### Props

| Prop          | Tipo     | Descripción                                   |
|---------------|----------|-----------------------------------------------|
| `imagen`      | string   | Ruta de la imagen del producto                |
| `titulo`      | string   | Nombre del producto                           |
| `descripcion` | string   | Texto descriptivo corto                       |
| `precio`      | number   | Valor en pesos colombianos (COP)              |
| `categoria`   | string   | Categoría que se muestra sobre el título      |
| `etiqueta`    | string   | (Opcional) insignia sobre la imagen           |

### Eventos (funciones recibidas del padre)

| Prop          | Se dispara cuando...                   |
|---------------|----------------------------------------|
| `onAgregar`   | se pulsa *Añadir al pedido*            |
| `onVerFicha`  | se pulsa *Ficha técnica*               |

### Ejemplo de uso

```jsx
<TarjetaProducto
  imagen={producto.imagen}
  titulo={producto.titulo}
  descripcion={producto.descripcion}
  precio={producto.precio}
  categoria={producto.categoria}
  onAgregar={() => agregar(producto)}
  onVerFicha={() => setFichaAbierta(producto)}
/>
```

## Cumplimiento de los requisitos del taller

- **3 o más props:** recibe 6 (`imagen`, `titulo`, `descripcion`, `precio`, `categoria`, `etiqueta`).
- **1 o más eventos:** 2 (`onAgregar` y `onVerFicha`).
- **Reutilizable:** se renderiza 6 veces desde el arreglo `PRODUCTOS`, con datos distintos.
- **Responsivo:** rejilla de 3, 2 o 1 columnas según el ancho de pantalla.

## Tecnologías

React 18, Vite 5, CSS3 (variables, grid, flexbox) y el elemento nativo `<dialog>`.
# Parcial-1-desarrollo
