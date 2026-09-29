/**
 * <tarjeta-producto>  ·  Web Component nativo (Custom Element + Shadow DOM)
 *
 * Props (atributos HTML):
 *   sku          Identificador del producto.
 *   imagen       Ruta de la imagen del producto.
 *   titulo       Nombre del producto.
 *   descripcion  Texto corto descriptivo.
 *   categoria    Categoría (se muestra sobre el título).
 *   precio       Valor numérico en pesos colombianos (COP), sin puntos.
 *   etiqueta     (opcional) Insignia sobre la imagen, ej. "Nuevo".
 *
 * Eventos personalizados (burbujean y cruzan el Shadow DOM):
 *   agregar-pedido   detail: { sku, titulo, precio }
 *   ver-ficha        detail: { sku, titulo, descripcion, imagen, precio, categoria }
 */

const formatoPesos = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const plantilla = document.createElement('template');
plantilla.innerHTML = `
  <style>
    :host {
      display: flex;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }

    .tarjeta {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: #0f1012;
      border: 1px solid #2a2e33;
      border-radius: 16px;
      transition: border-color 0.25s ease;
    }
    .tarjeta:hover { border-color: rgba(184, 150, 90, 0.55); }

    .imagen { position: relative; aspect-ratio: 1 / 1; background: #1d2024; }
    .imagen img { display: block; width: 100%; height: 100%; object-fit: cover; }

    .etiqueta {
      position: absolute;
      top: 14px;
      left: 14px;
      padding: 4px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #cfae72;
      background: rgba(15, 16, 18, 0.78);
      border: 1px solid rgba(184, 150, 90, 0.5);
      border-radius: 999px;
    }
    .etiqueta[hidden] { display: none; }

    .cuerpo { flex: 1; display: flex; flex-direction: column; gap: 6px; padding: 22px 22px 24px; }

    .categoria {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #b8965a;
    }

    .titulo {
      margin: 0;
      font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
      font-size: 1.625rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.15;
      color: #ececea;
    }

    .descripcion { margin: 0; font-size: 0.9375rem; line-height: 1.47; color: #9299a0; }

    .pie { margin-top: auto; padding-top: 18px; display: flex; flex-direction: column; gap: 12px; }
    .precio {
      margin: 0;
      font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
      font-size: 1.375rem;
      color: #ececea;
    }

    .acciones { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; }

    button { font: inherit; cursor: pointer; border: 0; }

    .agregar {
      padding: 10px 20px;
      border-radius: 999px;
      background: #b8965a;
      color: #14110b;
      font-size: 0.9375rem;
      font-weight: 600;
      transition: background-color 0.2s ease, transform 0.15s ease;
    }
    .agregar:hover { background: #cfae72; }
    .agregar:active { transform: scale(0.97); }
    .agregar.ok { background: #ececea; }

    .ficha {
      padding: 6px 4px;
      background: none;
      color: #cfae72;
      font-size: 0.9375rem;
    }
    .ficha:hover { text-decoration: underline; }

    button:focus-visible { outline: 2px solid #b8965a; outline-offset: 3px; }

    @media (max-width: 480px) {
      .cuerpo { padding: 18px 18px 20px; }
      .titulo { font-size: 1.4375rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .agregar, .tarjeta { transition: none; }
    }
  </style>

  <article class="tarjeta">
    <div class="imagen">
      <img alt="" loading="lazy" />
      <span class="etiqueta" hidden></span>
    </div>
    <div class="cuerpo">
      <p class="categoria"></p>
      <h3 class="titulo"></h3>
      <p class="descripcion"></p>
      <div class="pie">
        <p class="precio"></p>
        <div class="acciones">
          <button type="button" class="agregar">Añadir al pedido</button>
          <button type="button" class="ficha">Ficha técnica</button>
        </div>
      </div>
    </div>
  </article>
`;

class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ['imagen', 'titulo', 'descripcion', 'categoria', 'precio', 'etiqueta'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(plantilla.content.cloneNode(true));

    this._img = this.shadowRoot.querySelector('img');
    this._etiqueta = this.shadowRoot.querySelector('.etiqueta');
    this._categoria = this.shadowRoot.querySelector('.categoria');
    this._titulo = this.shadowRoot.querySelector('.titulo');
    this._descripcion = this.shadowRoot.querySelector('.descripcion');
    this._precio = this.shadowRoot.querySelector('.precio');
    this._btnAgregar = this.shadowRoot.querySelector('.agregar');
    this._btnFicha = this.shadowRoot.querySelector('.ficha');
    this._temporizador = null;

    this._btnAgregar.addEventListener('click', () => this._agregar());
    this._btnFicha.addEventListener('click', () => this._verFicha());
  }

  connectedCallback() {
    this._pintar();
  }

  attributeChangedCallback() {
    this._pintar();
  }

  // Lee los atributos y actualiza la vista. textContent evita inyectar HTML por error.
  _pintar() {
    const titulo = this.getAttribute('titulo') || 'Producto';
    this._img.src = this.getAttribute('imagen') || '';
    this._img.alt = titulo;
    this._categoria.textContent = this.getAttribute('categoria') || '';
    this._titulo.textContent = titulo;
    this._descripcion.textContent = this.getAttribute('descripcion') || '';
    this._precio.textContent = formatoPesos.format(this._valorPrecio());

    const etiqueta = this.getAttribute('etiqueta');
    this._etiqueta.textContent = etiqueta || '';
    this._etiqueta.hidden = !etiqueta;
  }

  _valorPrecio() {
    const n = Number(this.getAttribute('precio'));
    return Number.isFinite(n) ? n : 0;
  }

  _agregar() {
    this.dispatchEvent(new CustomEvent('agregar-pedido', {
      bubbles: true,
      composed: true,
      detail: {
        sku: this.getAttribute('sku'),
        titulo: this.getAttribute('titulo'),
        precio: this._valorPrecio(),
      },
    }));

    this._btnAgregar.textContent = 'Añadido';
    this._btnAgregar.classList.add('ok');
    clearTimeout(this._temporizador);
    this._temporizador = setTimeout(() => {
      this._btnAgregar.textContent = 'Añadir al pedido';
      this._btnAgregar.classList.remove('ok');
    }, 1400);
  }

  _verFicha() {
    this.dispatchEvent(new CustomEvent('ver-ficha', {
      bubbles: true,
      composed: true,
      detail: {
        sku: this.getAttribute('sku'),
        titulo: this.getAttribute('titulo'),
        descripcion: this.getAttribute('descripcion'),
        imagen: this.getAttribute('imagen'),
        categoria: this.getAttribute('categoria'),
        precio: this._valorPrecio(),
      },
    }));
  }
}

customElements.define('tarjeta-producto', TarjetaProducto);
