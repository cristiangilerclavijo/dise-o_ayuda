# Blueprint — Diseño de Interfaz (v2)
## Design System + Pantallas de AyudaYa (protocolo de comparación entre IAs)

> **Cómo usar este documento:** Este es el *spec* que vas a entregar a tu agente de IA (Kilocode). Pégalo completo como primer mensaje. NO lo resumas ni lo cortes — la comparación entre modelos solo es válida si todos los grupos parten del mismo spec exacto. Cuando termines con la IA-A, repite el proceso con la IA-B usando este mismo documento, partiendo de cero.
>
> **Regla para la IA:** si algo en este documento te parece ambiguo, NO te detengas a preguntar. Documenta tu supuesto como comentario HTML (`<!-- Supuesto: ... -->`) en el archivo correspondiente y continúa. Al final, lista todos tus supuestos en la sección "Notas de implementación" que se pide en el punto 7.

---

## 1. Contexto del problema

AyudaYa es una plataforma para que ciudadanos de sectores urbano-marginales de Guayaquil reporten necesidades comunitarias (baches, alumbrado, inseguridad) y líderes comunitarios las gestionen. El usuario final **no es técnico**: la interfaz tiene que ser obvia, legible y usable bajo condiciones reales (pantallas pequeñas, posible baja alfabetización digital, uso a una mano en la calle).

Tu trabajo en esta materia es el **sistema visual y las pantallas**, no la lógica de negocio. Construyes un prototipo de alta fidelidad *codificado* en HTML y CSS puro.

---

## 2. Stack y restricciones

- **HTML5 + CSS3 puro.** Sin frameworks de CSS (sin Bootstrap, sin Tailwind), sin preprocesadores (sin Sass).
- **JavaScript:** solo el mínimo para interacciones visuales (abrir/cerrar un menú, cambiar de pantalla). No hay datos reales ni backend.
- **Design tokens obligatorios:** todo color, tamaño de fuente, espaciado, radio y sombra se define como **CSS custom properties** en `:root`. Ningún valor "mágico" hardcodeado dentro de los componentes.
- **Convención de nombres de tokens (obligatoria, usar exactamente este patrón):**
  - Color: `--color-primary`, `--color-secondary`, `--color-success`, `--color-error`, `--color-gray-100/300/500/700`, `--color-background`, `--color-surface`
  - Tipografía: `--font-size-title`, `--font-size-subtitle`, `--font-size-body`, `--font-size-caption`
  - Espaciado: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg` (mínimo 4 pasos)
  - Radios: `--radius-sm`, `--radius-md`
  - Sombras: `--shadow-sm`, `--shadow-md`
- **Tipografía sin CDN:** usa una pila de fuentes del sistema (system font stack, ej. `-apple-system, "Segoe UI", Roboto, sans-serif`). No importar Google Fonts ni ninguna fuente externa — mismo criterio que con los íconos: sin dependencias de red.
- **Responsive:** mobile-first. Breakpoint único y explícito: **`min-width: 768px`** pasa a layout de escritorio. Debe verse correcto tanto a **360px** como a **1280px** de ancho, sin scroll horizontal en ningún punto intermedio.
- **Accesibilidad mínima (medible, no solo "legible"):**
  - Contraste de texto: mínimo **4.5:1** (WCAG AA) para texto normal, **3:1** para texto grande (≥24px o ≥19px bold).
  - Tamaño de toque: mínimo **44px** de alto en botones y elementos interactivos.
  - HTML semántico: `<button>`, `<nav>`, `<main>`, `<label>` asociado a su input vía `for`/`id`.
  - **Estado de foco visible** (`:focus-visible`) en todo elemento interactivo — outline o cambio de estilo claramente distinguible, para navegación por teclado.
- **Compatibilidad:** navegadores modernos evergreen (últimas 2 versiones de Chrome, Firefox, Safari, Edge). No se requiere soporte para IE11.
- **Íconos:** SVG inline o caracteres unicode simples, sin librerías externas por CDN. Se necesitan exactamente estos 4: **inicio/home**, **lista de reportes**, **agregar (+)**, **volver/atrás**.

---

## 3. Entregables

Estructura de archivos esperada:

```
ayudaya-design/
├── index.html          (style guide viva — muestra TODO el sistema)
├── login.html
├── reportes.html       (listado de reportes)
├── crear-reporte.html
└── css/
    └── styles.css      (tokens + componentes, un solo archivo)
```

### 3.1 Design tokens (`:root` en styles.css)
- **Paleta:** color primario, secundario, de éxito, de alerta/error, neutrales (al menos 3 grises), fondo, superficie. Debe transmitir confianza institucional + cercanía comunitaria. Todos los pares texto/fondo deben cumplir el contraste mínimo de la sección 2.
- **Tipografía:** system font stack (sección 2) + escala de 4 tamaños (título, subtítulo, cuerpo, caption).
- **Espaciado:** escala de al menos 4 pasos (ej. 4, 8, 16, 24px).
- **Radios y sombras:** al menos 2 radios y 2 niveles de elevación.

### 3.2 Componentes core (5)
Cada uno debe existir, estar estilizado con los tokens, y mostrarse en la style guide:

1. **Botón** — variantes primario, secundario, deshabilitado. Debe incluir estado `:focus-visible` visible.
2. **Input de texto** — con `<label>`, estado normal y estado de error (con mensaje de error visible).
3. **Card de reporte** — muestra: título del reporte, categoría, estado, fecha y una línea de ubicación. Es el componente más importante; se reutiliza en el listado.
4. **Badge** — con **mapeo de color fijo** (no a discreción de la IA):
   - Estado: *Pendiente* = ámbar/amarillo · *En proceso* = azul · *Resuelto* = verde
   - Categoría: *Bache* = gris oscuro · *Alumbrado* = amarillo/dorado · *Inseguridad* = rojo
5. **Navbar / barra de navegación** — apropiada para móvil (barra inferior o superior, elegir una). Debe usar los íconos definidos en la sección 2 (inicio, lista, agregar, volver — los que apliquen según la pantalla).

### 3.3 Pantallas (3)

1. **Login** (`login.html`): texto "AyudaYa" como logo (sin imagen), campos usuario y contraseña (componente input), botón primario "Ingresar", enlace secundario "Crear cuenta". Centrado, limpio.

2. **Listado de reportes** (`reportes.html`): navbar + listado con **exactamente estos 4 reportes de ejemplo** (usar este dataset literal, no inventar otro, para que el contenido sea idéntico entre IA-A e IA-B):

   | Título | Categoría | Estado | Fecha | Ubicación |
   |---|---|---|---|---|
   | Bache grande en la calle 5 | Bache | Pendiente | 12/07/2026 | Sector Bastión Popular, Mz. 4 |
   | Poste sin luz hace 2 semanas | Alumbrado | En proceso | 05/07/2026 | Coop. Nueva Prosperina, calle 3 |
   | Grupo sospechoso en el parque | Inseguridad | Pendiente | 20/07/2026 | Sector Flor de Bastión, block 8 |
   | Hueco reparado por la comuna | Bache | Resuelto | 15/06/2026 | Mapasingue Este, av. principal |

   Más un **botón flotante de acción (FAB)**: circular, fijo en la esquina inferior derecha, con ícono "+", texto accesible "Nuevo reporte" (vía `aria-label`).

3. **Crear reporte** (`crear-reporte.html`): formulario con título, categoría (selector con las 3 categorías del dataset), descripción, placeholder visual para "foto" (recuadro con `<label>` y `aria-label` descriptivo, no funcional) y otro para "ubicación en mapa" (mismo criterio), botón primario "Enviar reporte".

### 3.4 Style guide viva (`index.html`)
Página única que documenta el sistema: paleta con nombres de token, escala tipográfica, espaciados, y **todos los componentes** en sus variantes. Es la "fuente de verdad" del design system. Enlaza a las 3 pantallas.

---

## 4. Criterios de aceptación (checklist verificable)

El prototipo está **completo** solo si:

- [ ] Existen los 5 archivos HTML + el styles.css con la estructura indicada — y **ningún archivo o componente adicional no solicitado**.
- [ ] `:root` contiene tokens para paleta, tipografía, espaciado, radios y sombras, siguiendo la convención de nombres de la sección 2. Ningún color o tamaño hardcodeado en los componentes.
- [ ] Los 5 componentes existen y se ven correctamente en `index.html`.
- [ ] El botón tiene sus 3 variantes visualmente distintas y estado `:focus-visible`.
- [ ] El input muestra estado de error con mensaje.
- [ ] La card de reporte se reutiliza en `reportes.html` con el dataset fijo de la sección 3.3.
- [ ] Los badges usan exactamente el mapeo de color definido en la sección 3.2.
- [ ] Las 3 pantallas existen y son navegables (los enlaces funcionan).
- [ ] Todo se ve correctamente a 360px y a 1280px, sin scroll horizontal ni elementos cortados.
- [ ] Botones con mínimo 44px de alto; inputs con `<label>` asociado.
- [ ] Contraste de texto ≥ 4.5:1 (verificable con herramienta de contraste, no solo a ojo).
- [ ] Placeholders de foto y ubicación tienen `<label>`/`aria-label` descriptivo.
- [ ] No se usó ninguna fuente ni ícono cargado por CDN.

---

## 5. Definition of Done

1. Abres `index.html` en el navegador y ves el sistema completo sin errores de consola.
2. Navegas a las 3 pantallas y de vuelta; todos los enlaces funcionan.
3. Reduces la ventana a 360px: nada se rompe, nada requiere scroll horizontal. La amplías a 1280px: el layout pasa correctamente a escritorio.
4. Navegas toda la interfaz solo con `Tab`: cada elemento interactivo muestra un estado de foco visible.
5. Revisas el CSS: confirmas que los componentes usan `var(--token)` y no valores sueltos, y que los nombres siguen la convención de la sección 2.
6. Un compañero que no construyó esto entiende cada pantalla sin que se la expliques.

---

## 6. Qué NO hacer

- No usar Bootstrap, Tailwind, Material, ni ninguna librería de CSS.
- No conectar a ninguna API ni base de datos.
- No inventar funcionalidad de research de usuarios ni "resultados de tests de usabilidad".
- No hardcodear colores/tamaños dentro de los componentes saltándote los tokens.
- No cargar fuentes ni íconos desde un CDN externo.
- No agregar pantallas, componentes o funcionalidades que no estén pedidos en este documento, aunque parezcan una mejora.
- No detenerte a pedir aclaraciones — resuelve la ambigüedad con un supuesto documentado (ver encabezado del documento) y sigue.

---

## 7. Notas de implementación (entregar junto con el código)

Al terminar, incluye un bloque de texto separado (puede ser un `NOTAS.md` o comentario final) con:

1. **Autoevaluación:** copia el checklist de la sección 4 y marca cada ítem como ✅ cumplido o ❌ no cumplido, con una frase de justificación por ítem.
2. **Supuestos documentados:** lista cualquier decisión que tomaste ante una ambigüedad no cubierta explícitamente por este spec.

