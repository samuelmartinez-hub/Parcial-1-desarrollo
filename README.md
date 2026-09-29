# Armería Sierra Norte: catálogo con Web Component nativo

Proyecto del **primer parcial** de *Desarrollo de Aplicaciones Web y Sistemas Operativos* (193308), Universidad Francisco de Paula Santander Ocaña.

**Estudiante:** Samuel Martínez Bayona (código 0192703)
**Docente:** José Barbosa

> **Aviso:** es un proyecto académico ficticio. No representa una tienda real ni se realizan ventas. Toda adquisición de armas reales exige documentación y permisos según la normativa colombiana vigente.

## Descripción

Catálogo de una armería deportiva y de colección, con diseño oscuro y minimalista. Sirve para demostrar la **componentización**: una tarjeta de producto (`<tarjeta-producto>`) construida como **Web Component nativo** (HTML + CSS + JavaScript, sin frameworks ni pasos de compilación) y reutilizada seis veces con datos distintos.

## Estructura del proyecto

```
.
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── tarjeta-producto.js   Web Component
│   └── main.js               Filtro, pedido y ficha técnica
└── assets/
    └── img/                  Ilustraciones SVG de los productos
```

## Cómo ejecutarlo en tu equipo

No requiere instalar Node, npm ni ninguna dependencia.

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Con la extensión **Live Server**, haz clic derecho sobre `index.html` y elige
   *Open with Live Server*.

Eso es todo: el navegador carga la página directamente.

## Cómo publicarlo en GitHub Pages

Como es HTML, CSS y JavaScript sin ningún paso de compilación, publicarlo es
igual de simple:

1. Sube el proyecto a un repositorio de GitHub (`git add`, `git commit`, `git push`).
2. En el repositorio, ve a **Settings → Pages**.
3. En *Build and deployment → Source* elige **Deploy from a branch**.
4. En *Branch* selecciona **main** (o la rama donde subiste el código) y la
   carpeta **/(root)**. Guarda.
5. Espera uno o dos minutos y entra a `https://tu-usuario.github.io/nombre-del-repositorio/`.

No hay que tocar ningún archivo de configuración ni ejecutar ningún comando de
compilación: lo que subes es exactamente lo que se publica.

## El componente `<tarjeta-producto>`

### Props (atributos)

| Atributo      | Descripción                                    | Ejemplo                    |
|---------------|-------------------------------------------------|-----------------------------|
| `sku`         | Identificador del producto                      | `ASN-001`                   |
| `imagen`      | Ruta de la imagen                                | `assets/img/halcon9.svg`    |
| `titulo`      | Nombre del producto                              | `Halcón 9`                  |
| `descripcion` | Texto descriptivo corto                          | `Pistola semiautomática...` |
| `categoria`   | Categoría, se muestra sobre el título            | `Pistolas`                  |
| `precio`      | Valor en pesos colombianos, sin puntos           | `4850000`                   |
| `etiqueta`    | (Opcional) insignia sobre la imagen              | `Nuevo`                     |

### Eventos

| Evento            | Se emite cuando...             | `detail`                                                      |
|-------------------|---------------------------------|-----------------------------------------------------------------|
| `agregar-pedido`  | se pulsa *Añadir al pedido*     | `{ sku, titulo, precio }`                                        |
| `ver-ficha`       | se pulsa *Ficha técnica*        | `{ sku, titulo, descripcion, imagen, categoria, precio }`        |

### Uso

```html
<script src="js/tarjeta-producto.js" defer></script>

<tarjeta-producto
  sku="ASN-001"
  categoria="Pistolas"
  imagen="assets/img/halcon9.svg"
  titulo="Halcón 9"
  etiqueta="Nuevo"
  descripcion="Pistola semiautomática compacta de uso deportivo."
  precio="4850000">
</tarjeta-producto>

<script>
  document.addEventListener('agregar-pedido', (e) => console.log(e.detail));
</script>
```

## Cumplimiento de los requisitos del taller

- **3 o más props:** recibe 7 atributos (`sku`, `imagen`, `titulo`, `descripcion`, `categoria`, `precio`, `etiqueta`).
- **1 o más eventos:** emite 2 eventos personalizados (`agregar-pedido` y `ver-ficha`).
- **Reutilizable:** se usa 6 veces en `index.html` con datos diferentes.
- **Responsivo:** rejilla de 3, 2 o 1 columnas según el ancho, y diálogos adaptados a móvil.

## Tecnologías

HTML5, CSS3 (variables, grid, `backdrop-filter`), JavaScript ES6+ (Custom Elements, Shadow DOM, `<dialog>`). Sin frameworks ni herramientas de compilación.
