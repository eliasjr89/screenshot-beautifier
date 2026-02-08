# Análisis de Accesibilidad (a11y): Screenshot Beautifier

## 1. Contraste y Legibilidad

La paleta de colores "Deep Space" es estéticamente agradable, pero presenta desafíos.

- **Fondo/Texto**: El contraste entre el fondo oscuro (`#09090b`) y el texto principal (`#f4f4f5`) es excelente (AAA).
- **Texto Secundario**: El color `#a1a1aa` sobre fondos oscuros puede estar en el límite de legibilidad para usuarios con baja visión. Se recomienda verificar que cumpla ratio 4.5:1.

## 2. Navegación por Teclado

### ⚠️ `CustomSelect.tsx`

Este es el punto más débil en cuanto a accesibilidad.

- **Estado Actual**: Es un `div` con `onClick`. No es focusable vía teclado (`Tab`).
- **Problema**: Un usuario que navegue solo con teclado no podrá cambiar el modo de "Upload" a "Canvas".
- **Solución**:
  1.  Añadir `tabIndex={0}` al trigger.
  2.  Manejar eventos `onKeyDown` (Enter/Space para abrir, Flechas para navegar opciones).
  3.  Usar roles ARIA (`role="listbox"`, `aria-expanded`, etc.).

### Elementos Nativos

- Los `input type="range"` y `input type="color"` son nativos, por lo que son accesibles por defecto (focusables y operables con flechas).
- Los botones (`button`) son accesibles.

## 3. Semántica HTML

- **Estructura**: Se usan etiquetas semánticas apropiadas: `<aside>` para la sidebar, `<main>` para el área de canvas, `<h1>` para títulos.
- **Imágenes**: La imagen subida tiene `alt="Uploaded"`. Sería ideal permitir al usuario describir la imagen para un mejor `alt` text si la herramienta tuviera fines de publicación web, aunque para generar una imagen aplanada es menos crítico.

## 4. Recomendaciones Prioritarias

1.  **Refactorizar `CustomSelect`**: Hacerlo accesible o reemplazarlo por una librería accesible (ej: Radix UI Select) si no se quiere mantener la lógica compleja de a11y.
2.  **Etiquetas en Inputs**: Asegurar que todos los inputs visuales tengan su etiqueta `<label>` asociada programáticamente (`htmlFor` + `id`), lo cual parece cumplirse en la mayoría de los casos en `Sidebar`.
