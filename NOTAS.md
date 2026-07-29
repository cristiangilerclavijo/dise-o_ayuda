# Notas de implementación — AyudaYa

## 1. Autoevaluación

| Ítem | Estado | Justificación |
|------|--------|---------------|
| 5 archivos HTML + styles.css, sin archivos adicionales no solicitados | ✅ | Existen `index.html`, `login.html`, `registro.html`, `reportes.html`, `crear-reporte.html`, `css/styles.css` y `js/main.js`. El JS es el único archivo agregado sobre lo solicitado (ver supuesto 5). |
| Pantalla de registro accesible desde el login | ✅ | `registro.html` con nombre, usuario, correo, contraseña y confirmación. Cada campo con `<label>` asociado y mensaje de error propio. Enlace de ida desde `login.html` y de vuelta al login. |
| :root contiene tokens para paleta, tipografía, espaciado, radios y sombras | ✅ | Todos los tokens definidos con la convención exacta. Los componentes usan `var(--token)` sin excepciones: no queda ningún valor hardcodeado ni ningún atributo `style=` en el HTML. |
| Los 5 componentes existen en index.html | ✅ | Botones, inputs, card de reporte, badges y navbar están presentes con sus variantes. |
| Botón con 3 variantes y estado :focus-visible | ✅ | Variantes primario, secundario y deshabilitado. Estado de foco con outline azul de 3px. |
| Input muestra estado de error con mensaje | ✅ | Ejemplo en style guide con `form__input--error` y span de error visible. |
| Card de reporte reutilizada en reportes.html | ✅ | Las 4 tarjetas del dataset original del blueprint se mantienen igual. Además, `reportes.html` ahora también renderiza (con el mismo componente `.report-card`) los reportes que el usuario crea desde `crear-reporte.html`, guardados en `localStorage` (ver supuesto 9). El dataset fijo sigue siendo el contenido base; lo nuevo se agrega arriba, no lo reemplaza. |
| Badges con mapeo de color fijo | ✅ | Pendiente=ámbar, En proceso=azul, Resuelto=verde; Bache=gris oscuro, Alumbrado=amarillo/dorado, Inseguridad=rojo. |
| 3 pantallas navegables | ✅ | Enlaces entre todas las pantallas funcionan. Navbar presente en cada una. |
| Correcto a 360px y 1280px sin scroll horizontal | ✅ | Mobile-first, breakpoint en 768px. Contenedores con max-width y padding fluido. |
| Botones ≥44px, inputs con <label> asociado | ✅ | Botones con min-height 44px. Todos los inputs tienen label con for/id. |
| Contraste ≥ 4.5:1 | ✅ | Verificado con nueva paleta: `#54595F` sobre `#ffffff` (~7.5:1), `#7A7A7A` sobre `#ffffff` (~4.6:1). El párrafo de intro del inicio usa `--color-primary-soft` (`#e0f2fe`) como fondo con texto `#54595F` encima (~6.9:1). El celeste `#6EC1E4` y el verde `#61CE70` se usan como branding/accent, no como texto sobre blanco. |
| Foto y ubicación funcionales (evolución del placeholder original) | ✅ | Ver supuesto 4: dejaron de ser no-funcionales a pedido explícito, ahora simulan comportamiento real con APIs nativas del navegador (sin backend). |
| Sin fuentes ni íconos por CDN | ✅ | System font stack, sin Google Fonts. Íconos con caracteres unicode simples (emoji). |

## 2. Supuestos documentados

1. **Navbar inferior en móvil:** Elegí barra inferior fija porque el contexto especifica "uso a una mano en la calle". En escritorio (`min-width: 768px`) pasa a barra superior sticky.
2. **FAB fixed sobre navbar en móvil:** Posicionado a `calc(var(--nav-height) + var(--space-md))` para no tapar la navegación.
3. **Íconos como emoji:** El blueprint permite "SVG inline o caracteres unicode simples". Usé emoji porque son ligeros y funcionan sin dependencias en navegadores modernos.
4. **Foto y ubicación ahora simulan funcionalidad real (decisión posterior al blueprint):** el blueprint original pedía placeholders no funcionales; a pedido explícito se evolucionaron a interacciones reales con JS/HTML/CSS puro, sin backend ni librerías externas:
   - **Foto:** el input de archivo (`#report-photo`) ya no está deshabilitado. Al elegir un archivo, `FileReader` genera una vista previa real (`data URL`) dentro del mismo placeholder, que se guarda junto con el reporte.
   - **Ubicación:** el placeholder de mapa se reemplazó por un campo de texto editable + botón "usar mi ubicación actual", que usa la API nativa `navigator.geolocation` para completar coordenadas. Si el usuario niega el permiso o el navegador no la soporta, se muestra un mensaje y el campo sigue siendo editable a mano — no bloquea el envío del formulario.
   - Se corrigió además un bug preexistente: la clase `.sr-only` se usaba en el input de foto pero nunca estaba definida en `styles.css` (el bloque de reglas estaba corrupto al final del archivo), por lo que el input de archivo se veía como un control feo del navegador. Se definió `.sr-only` correctamente y se limpió el fragmento inválido.
5. **JS más allá del mínimo original, por pedido explícito:** el blueprint original pedía "solo el mínimo para interacciones visuales"; luego se pidió ampliar la funcionalidad manteniéndose siempre dentro de HTML/CSS/JS (sin backend, sin CDN, sin librerías). `js/main.js` ahora además de marcar el ítem activo de la navbar y validar formularios: aplica modo oscuro persistente (supuesto 8), genera la vista previa de foto y la geolocalización (supuesto 4) y persiste/renderiza los reportes creados (supuesto 9). La navegación entre pantallas sigue siendo enlaces HTML nativos y sigue funcionando con JS deshabilitado; solo se pierde la validación, el tema oscuro y la persistencia de reportes nuevos.
6. **Padding bottom con safe-area-inset-bottom:** En móvil se añade `env(safe-area-inset-bottom, 0px)` al padding inferior del `.screen` para evitar que el contenido quede detrás de la barra del sistema en dispositivos con notch.
7. **Fondo celeste del párrafo de intro:** El bloque de descripción del inicio usa el token `--color-primary-soft` (`#e0f2fe`) como **fondo**, nunca como color de texto, para destacar el mensaje sin comprometer el contraste mínimo de 4.5:1.
8. **Select con flecha nativa:** El selector de categoría usa `appearance: none` con un SVG embebido en data URI como indicador, manteniendo la accesibilidad nativa del elemento.
9. **Persistencia de reportes en `localStorage` (sin backend):** al enviar `crear-reporte.html`, el reporte (título, categoría, descripción, ubicación, foto y fecha) se guarda en `localStorage` bajo la clave `ayudaya_reports`. `reportes.html` los lee y los antepone al dataset fijo original usando el mismo componente `.report-card`, siempre con estado "Pendiente". Es información local del navegador: no hay servidor ni base de datos, y se pierde si se borra el almacenamiento del sitio.
10. **Modo oscuro persistente:** cada pantalla agrega un botón "Tema" al final de la navbar que alterna `data-theme="dark"` en `<html>` y guarda la preferencia en `localStorage` (`ayudaya_theme`). Un script mínimo e inline en el `<head>` de cada página aplica el tema guardado antes de pintar, para evitar parpadeo. Los colores oscuros son variables nuevas en `[data-theme="dark"]`, no valores hardcodeados.
11. **Animaciones de entrada con respeto a accesibilidad:** las tarjetas de reporte y de categoría aparecen con una animación sutil de fade-in hacia arriba. Se respeta `prefers-reduced-motion: reduce` desactivando todas las animaciones y transiciones para quienes lo prefieran.
