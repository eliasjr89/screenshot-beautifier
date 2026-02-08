# Análisis de Lógica y Servicios: Screenshot Beautifier

## 1. Gestión de Estado: `useEditor`

El hook `useEditor` actúa como el **store** de la aplicación. En lugar de usar Redux o Context (que podría ser excesivo para esta escala), encapsula un `useReducer` con un estado complejo.

### Arquitectura del Estado

El objeto de estado (`state`) es plano y contiene todas las propiedades visuales (colores, sombras, rotaciones) y de contenido (URL imagen, texto).

### Patrón de Acciones

Se utiliza el patrón **Action Creators** memoizados con `useCallback`.

- **Ventaja**: Evita que los componentes hijos (`Sidebar`) se re-rendericen innecesariamente cada vez que el componente padre (`App`) se actualiza, ya que las referencias a las funciones (ej: `setBgColor`) se mantienen estables.
- **Reducer**: El `editorReducer` es una función pura que garantiza transiciones de estado predecibles.

### Integraciones Externas

- **Importación por URL**: Integra la API de `microlink.io` para capturar webs externas. Maneja estados de carga (`isLoading`) y errores con notificaciones (`toast`).

## 2. Interactividad 3D: `useDrag3D`

Este hook abstrae la lógica matemática de convertir un evento de arrastre del mouse (2D) en rotaciones espaciales (3D).

- **Mecánica**:
  1.  Detecta `onMouseDown` y guarda la posición inicial `(x, y)`.
  2.  En `onMouseMove`, calcula el desplazamiento (`delta`) respecto a la última posición.
  3.  Aplica un factor de sensibilidad (`0.5`) para suavizar el movimiento.
  4.  Invoca el callback `onRotate` para actualizar el estado global.
- **Optimización**: Utiliza `useRef` para guardar `lastPosition`. Esto es crucial porque permite leer/escribir la posición del mouse sin provocar re-renderizados en React, lo que haría la animación lenta ("janky").

## 3. Servicios: `imageExporter`

Módulo aislado encargado de generar la imagen final.

- **Librería**: Usa `modern-screenshot` (probablemente un wrapper de `html2canvas` moderno).
- **Flujo**:
  1.  Recibe una referencia al nodo DOM (`ref`).
  2.  Convierte el nodo a canvas -> blob -> dataUrl.
  3.  Crea un enlace temporal `<a>` para forzar la descarga en el navegador.
- **UX**: Proporciona feedback inmediato con `toast.loading`, `toast.success` o `toast.error`, lo cual es vital para operaciones que pueden tardar unos segundos.

## 4. Conclusión de Lógica

La separación de la lógica (hooks) de la vista (componentes) es **ejemplar**.

- Los componentes UI son "tontos" (solo reciben datos y emiten eventos).
- Los hooks son "listos" (tienen la lógica de negocio y estado).
- Esto facilita enormemente las pruebas unitarias (se puede testear `useEditor` sin renderizar la UI) y la mantenibilidad.
