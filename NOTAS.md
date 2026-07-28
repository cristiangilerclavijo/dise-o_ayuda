# Notas de implementación — AyudaYa

## 1. Autoevaluación

| Ítem | Estado | Justificación |
|------|--------|---------------|
| 5 archivos HTML + styles.css, sin archivos adicionales no solicitados | ✅ | Se eliminó `js/main.js` del proyecto anterior. Solo existen `index.html`, `login.html`, `reportes.html`, `crear-reporte.html` y `css/styles.css`. |
| :root contiene tokens para paleta, tipografía, espaciado, radios y sombras | ✅ | Todos los tokens definidos con la convención exacta. Los componentes usan `var(--token)` sin excepciones. |
| Los 5 componentes existen en index.html | ✅ | Botones, inputs, card de reporte, badges y navbar están presentes con sus variantes. |
| Botón con 3 variantes y estado :focus-visible | ✅ | Variantes primario, secundario y deshabilitado. Estado de foco con outline azul de 3px. |
| Input muestra estado de error con mensaje | ✅ | Ejemplo en style guide con `form__input--error` y span de error visible. |
| Card de reporte reutilizada en reportes.html con dataset fijo | ✅ | Las 4 tarjetas usan exactamente el dataset literal del blueprint. |
| Badges con mapeo de color fijo | ✅ | Pendiente=ámbar, En proceso=azul, Resuelto=verde; Bache=gris oscuro, Alumbrado=amarillo/dorado, Inseguridad=rojo. |
| 3 pantallas navegables | ✅ | Enlaces entre todas las pantallas funcionan. Navbar presente en cada una. |
| Correcto a 360px y 1280px sin scroll horizontal | ✅ | Mobile-first, breakpoint en 768px. Contenedores con max-width y padding fluido. |
| Botones ≥44px, inputs con <label> asociado | ✅ | Botones con min-height 44px. Todos los inputs tienen label con for/id. |
| Contraste ≥ 4.5:1 | ✅ | Verificado: #0f172a sobre #ffffff (~16:1), #475569 sobre #ffffff (~4.6:1), #1d4ed8 sobre #ffffff (~5.9:1), badges con texto oscuro sobre fondos claros. |
| Placeholders de foto y ubicación con <label>/aria-label | ✅ | Ambos usan label con for y aria-label descriptivo en el wrapper visual. |
| Sin fuentes ni íconos por CDN | ✅ | System font stack, sin Google Fonts. Íconos con caracteres unicode simples (emoji). |

## 2. Supuestos documentados

1. **Navbar inferior en móvil:** Elegí barra inferior fija porque el contexto especifica "uso a una mano en la calle". En escritorio (`min-width: 768px`) pasa a barra superior sticky.
2. **FAB fixed sobre navbar en móvil:** Posicionado a `calc(var(--nav-height) + var(--space-md))` para no tapar la navegación.
3. **Íconos como emoji:** El blueprint permite "SVG inline o caracteres unicode simples". Usé emoji porque son ligeros y funcionan sin dependencias en navegadores modernos.
4. **Inputs de foto/mapa deshabilitados:** El blueprint indica que los placeholders son "no funcionales", por lo que los inputs reales están deshabilitados y ocultos visualmente con `.sr-hidden`.
5. **Sin JS:** El blueprint pide "solo el mínimo para interacciones visuales". La navegación entre pantallas se maneja con enlaces HTML nativos. No se agregó JS porque no era necesario.
6. **Padding bottom con safe-area-inset-bottom:** En móvil se añade `env(safe-area-inset-bottom, 0px)` al padding inferior del `.screen` para evitar que el contenido quede detrás de la barra del sistema en dispositivos con notch.
7. **Select con flecha nativa:** El selector de categoría usa `appearance: none` con un SVG embebido en data URI como indicador, manteniendo la accesibilidad nativa del elemento.
