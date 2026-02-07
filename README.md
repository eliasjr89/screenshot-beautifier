# Screenshot Beautifier ✨

> **Transforma capturas simples en obras de arte digitales listas para compartir.**
> Una aplicación web moderna, minimalista y de alto rendimiento construida con el último stack de React 19 y TypeScript.

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

[Ver Demo en Vercel](#) <!-- Reemplazar con URL real -->

---

## 🚀 Características Principales

Esta aplicación permite a desarrolladores y creadores de contenido embellecer sus capturas de pantalla con un solo clic, ofreciendo controles granulares sobre:

- **🎨 Personalización Avanzada**: Ajuste de backgrounds (colores sólidos o gradientes), padding, border-radius y sombras realistas.
- **🧊 Transformación 3D & Zoom**: Sistema de rotación 3D fluido e intuitivo (`useDrag3D`) con soporte para Zoom dinámico y control de perspectiva en ejes X/Y.
- **✨ Efectos FX & Texto**: Modos creativos como **Modo Neón**, **Efecto Ruido** y **Reflejo 3D** invertido. Estilos de texto especializados (**Glitch**, **Neón**).
- **🛠️ Filtros Profesionales**: Control bipolar (±100) de Brillo, Contraste y Saturación centrados en 0 para una edición más natural.
- **🚀 Rendimiento Optimizado**:
  - **GPU Acceleration**: Uso de `will-change` y optimizaciones de rendering para rotación suave a 60fps.
  - **Downscaling Inteligente**: Optimización de imágenes en el cliente (max 2048px).
- **♿ Accesibilidad & UI**: Componentes ARIA-compliant, barra lateral responsiva y scrollbar personalizada de alta gama.
- **📸 Exportación HD**: Generación de imágenes PNG de alta calidad.

## 🛠️ Stack Tecnológico

El proyecto ha sido construido siguiendo principios de **Clean Code** y **Modern Web Development**:

- **Core**: [React 19 RC](https://react.dev/) (Hooks, Memoization, Context Free State).
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/) (Strict Mode).
- **Build Tool**: [Vite 6](https://vitejs.dev/) (HMR instantáneo).
- **Styling**: Vanilla CSS con **Variables CSS** (Theming nativo, sin runtime overhead).
- **State Management**: `useReducer` + `Context` (Arquitectura escalable sin librerías externas).

## 📂 Arquitectura y Documentación

Este repositorio incluye una documentación técnica exhaustiva que detalla las decisiones de diseño, auditorías y patrones utilizados. Ideal para entender la profundidad del proyecto:

- [🏗️ Arquitectura del Proyecto](docs/analisis_arquitectura.md)
- [🧩 Análisis de Componentes](docs/analisis_componentes.md)
- [🧠 Lógica y Hooks Personalizados](docs/analisis_logica.md)
- [⚡ Reporte de Rendimiento](docs/analisis_rendimiento.md)
- [♿ Auditoría de Accesibilidad](docs/analisis_accesibilidad.md)
- [✅ Buenas Prácticas y Patrones](docs/analisis_buenas_practicas.md)

## ⚡ Instalación y Uso

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/tu-usuario/screenshot-beautifier.git
    cd screenshot-beautifier
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:

    ```bash
    npm run dev
    ```

4.  **Construir para producción**:
    ```bash
    npm run build
    ```

## 🔍 Detalles de Implementación Destacados

### `useDrag3D` Hook (UX Optimization)

Implementación personalizada para manejar la rotación 3D. A diferencia de soluciones tradicionales, este hook gestiona eventos a nivel global (`window`) una vez iniciado el arrastre, permitiendo una experiencia "infinita" y suave incluso si el cursor sale del área del componente.

### Accesibilidad en Componentes Custom

El componente de selección de modos no es un simple `div`. Ha sido diseñado implementando el patrón **Combobox/Listbox** de ARIA, asegurando que usuarios que dependen del teclado o lectores de pantalla puedan utilizar la aplicación sin barreras.

---

Desarrollado con ❤️ por [Elías JR]
