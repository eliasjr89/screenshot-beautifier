# Análisis de Arquitectura y Configuración: Screenshot Beautifier

## 1. Visión General del Proyecto

**Screenshot Beautifier** es una aplicación web SPA (Single Page Application) diseñada para crear presentaciones estéticas de capturas de pantalla. Permite a los usuarios subir imágenes, ajustar marcos, sombras, fondos, y aplicar transformaciones 3D, para luego exportar el resultado.

### Stack Tecnológico

- **Core**: React 19 (Hooks, Context/Props pattern).
- **Build Tool**: Vite 7 (rápido, configuración mínima).
- **Lenguaje**: TypeScript 5.9 (Tipado estricto).
- **Estilos**: Vanilla CSS con Variables CSS (CSS Custom Properties). No utiliza preprocesadores ni frameworks CSS como Tailwind, lo que demuestra un enfoque ligero y personalizado.
- **Dependencias Clave**:
  - `modern-screenshot`: Para la generación y exportación de las imágenes finales.
  - `sonner`: Para notificaciones tipo "toast".

## 2. Estructura de Directorios

La estructura sigue un patrón estándar de React con Vite, pero bien organizada por responsabilidades:

```
src/
├── components/     # Componentes UI reutilizables y específicos de vistas
├── context/        # (Estructura preparada para Context API, aunque actualmente usa hooks)
├── hooks/          # Hooks personalizados para lógica de negocio (useEditor, useDrag3D)
├── pages/          # (Estructura preparada para rutas, aunque es una SPA de una sola vista)
├── services/       # Lógica externa o utilidades puras (imageExporter)
├── types/          # Definiciones de tipos globales (TS)
├── App.tsx         # Componente raíz y layout principal
├── main.tsx        # Punto de entrada (Bootstrapping)
└── styles.css      # Estilos globales y sistema de diseño
```

## 3. Análisis de Configuración

- **`vite.config.ts`**: Configuración minimalista. Define alias `@` apuntando a `src`, lo que facilita las importaciones limpias. Usa el plugin oficial de React.
- **`tsconfig.json`**: Configuración estricta (`"strict": true`). Target `ES2020`. Configurado para trabajar con módulos `ESNext` y resolución `bundler` (estándar para Vite).
- **`package.json`**: Scripts estándar de Vite (`dev`, `build`, `preview`). Dependencias mínimas, lo que beneficia el rendimiento y el tamaño del bundle.

## 4. Gestión de Estado y Tipado Global

### Tipado (`src/types/global.ts`)

El proyecto utiliza una definición centralizada de tipos para el estado de la aplicación, lo cual es una **buena práctica** para mantener la coherencia.

- **`EditorState`**: Define la fuente de verdad única para la UI (colores, sombras, rotaciones, imagen, texto, etc.).
- **`EditorAction`**: Utiliza un patrón de **Discriminated Union** (similar a Redux) para las acciones (`{ type: "SET_...", payload: ... }`). Esto facilita un manejo de estado predecible y type-safe.
- **Props**: Se definen interfaces claras para los componentes principales (`SidebarProps`, `CanvasAreaProps`), desacoplando la definición de tipos de la implementación del componente.

### Flujo de Datos (Data Flow)

1.  **Estado Central**: El estado reside en el hook `useEditor` (que probablemente usa `useReducer` internamente, a juzgar por las acciones definidas en `types`).
2.  **Prop Drilling Controlado**: El estado y las acciones se pasan desde `App.tsx` hacia `Sidebar` (controles) y `CanvasArea` (visualización).
    - _Observación_: Al ser una aplicación pequeña/mediana, pasar props un par de niveles es aceptable y explícito. Si creciera, se recomendaría mover esto a un `EditorContext`.

## 5. Sistema de Diseño (`styles.css`)

El proyecto implementa su propio sistema de diseño basado en variables CSS (`:root`), definiendo:

- **Paleta de Colores**: Tema oscuro "Deep Space" (`--bg-app`, `--primary`).
- **Espaciado y Radios**: Variables semánticas (`--radius-sm`, `--radius-lg`).
- **Animaciones**: Transiciones globales suaves (`--ease-slow`).

El CSS está estructurado en bloques lógicos: Layout, Sidebar, Inputs personalizados, y Canvas. El uso de gradientes y efectos de "glassmorphism" (`backdrop-filter`) indica un enfoque en una UI moderna y estética ("Rich Aesthetics").

## 6. Conclusión de Arquitectura

La arquitectura es sólida, simple y escalable para el propósito de la herramienta. Destaca por:

- **Simplicidad**: Evita sobre-ingeniería (sin Redux/Zustand innecesarios por ahora).
- **Type-Safety**: Uso extensivo y correcto de TypeScript.
- **Rendimiento**: Dependencias ligeras y CSS nativo.
