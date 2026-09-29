import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANTE para GitHub Pages: "base" debe ser "/<nombre-exacto-del-repositorio>/".
// Ejemplo: si tu repositorio es https://github.com/tu-usuario/armeria-sierra-norte,
// entonces base debe ser '/armeria-sierra-norte/'.
// Si el repositorio se llama "tu-usuario.github.io" (sitio raíz), usa base: '/'.
export default defineConfig({
  plugins: [react()],
  base: '/armeria-sierra-norte/',
});
