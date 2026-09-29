# Armería Sierra Norte: catálogo con React

Proyecto del **primer parcial** de *Desarrollo de Aplicaciones Web y Sistemas Operativos* (193308), Universidad Francisco de Paula Santander Ocaña.

**Estudiante:** Samuel Martínez Bayona (código 0192703)
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

## Publicar en GitHub Pages

GitHub Pages solo sirve archivos tal cual están, sin procesarlos. Este proyecto usa JSX,
que el navegador no entiende directamente, así que **nunca se sube el código fuente**:
hay que compilarlo con Vite (`npm run build`) y publicar solo la carpeta `dist/`
que ese comando genera.

1. **Ajusta `vite.config.js`.** El campo `base` debe ser `/nombre-exacto-del-repositorio/`.
   Por ejemplo, si tu repositorio en GitHub es
   `https://github.com/tu-usuario/armeria-sierra-norte`, entonces:

   ```js
   base: '/armeria-sierra-norte/',
   ```

   Si el nombre de tu repositorio es distinto, cambia este valor exactamente por ese nombre
   (con las diagonales al inicio y al final). Si el repositorio se llama
   `tu-usuario.github.io` (un sitio raíz, no de proyecto), usa `base: '/'`.

2. **Sube el proyecto normalmente** con `git add`, `git commit` y `git push` (el código
   fuente sí va al repositorio; solo la carpeta `dist/` no se sube a mano).

3. **Publica con un solo comando:**

   ```bash
   npm run deploy
   ```

   Este comando compila el proyecto (`predeploy`) y sube el contenido de `dist/` a una
   rama llamada `gh-pages` (gracias al paquete `gh-pages`, ya incluido en `package.json`).

4. **Activa Pages en GitHub:** en el repositorio, ve a *Settings → Pages*. En
   *Build and deployment → Source* elige **Deploy from a branch**, y en *Branch*
   selecciona **gh-pages** y la carpeta **/(root)**. Guarda.

5. Espera uno o dos minutos y entra a `https://tu-usuario.github.io/armeria-sierra-norte/`
   (con la diagonal final). Cada vez que cambies el código, vuelve a correr
   `npm run deploy` para actualizar el sitio publicado.

> Si la página carga en blanco y la consola del navegador (F12) muestra errores 404 en
> los archivos `.js` o `.css`, casi siempre es porque `base` en `vite.config.js` no
> coincide con el nombre real del repositorio. Revísalo y vuelve a publicar.

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
