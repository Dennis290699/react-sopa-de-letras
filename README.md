# 🎮 Sopa de Letras (Word Search Game)

Una versión moderna y minimalista del clásico juego de Sopa de Letras, construida con **React**, **TypeScript** y **Tailwind CSS**.

## ✨ Características

-   **Generación Dinámica**: Las palabras se obtienen aleatoriamente de una API externa en cada partida.
-   **Tablero Interactivo**: Selección de palabras mediante arrastre (drag-and-drop), compatible con mouse y pantallas táctiles.
-   **Diseño Minimalista**: Interfaz limpia con tema oscuro por defecto ("Dark Mode") para reducir la fatiga visual.
-   **Responsivo**: Se adapta perfectamente a dispositivos móviles, tablets y escritorio.
-   **Sistema de Victoria**: Modal de felicitaciones al encontrar todas las palabras.
-   **Mecánicas de Juego**:
    -   Soporte para selección horizontal, vertical y diagonal.
    -   Validación automática de palabras.
    -   Contador de progreso.

## 🛠️ Tecnologías Utilizadas

-   **Frontend**: [React 19](https://react.dev/)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Iconos**: [Lucide React](https://lucide.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Animaciones**: CSS Transitions nativas.

## 📂 Estructura del Proyecto

El proyecto ha sido modularizado para mejorar la escalabilidad y mantenibilidad:

```
src/
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx    # Cuadrícula interactiva
│   │   ├── GameHeader.tsx   # Cabecera con contador y controles
│   │   ├── WordList.tsx     # Lista de palabras a encontrar
│   │   ├── VictoryModal.tsx # Modal de victoria
│   │   ├── LoadingState.tsx # Estado de carga
│   │   └── ErrorState.tsx   # Manejo de errores
│   └── WordSearchGame.tsx   # Contenedor principal y lógica del juego
├── lib/
│   ├── utils.ts             # Utilidades generales (cn)
│   └── wordSearch.ts        # Lógica de generación de la cuadrícula
└── App.tsx                  # Punto de entrada de la aplicación
```

## 🚀 Instalación y Uso

1.  **Clonar el repositorio** (o descargar los archivos).
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
4.  Abrir el navegador en el puerto indicado (usualmente `http://localhost:3000`).

## 🧩 Cómo Jugar

1.  Observa la lista de palabras en la parte superior.
2.  Busca las palabras en la cuadrícula de letras.
3.  Haz clic (o toca) y arrastra sobre las letras para seleccionar una palabra.
4.  Si la palabra es correcta, se marcará en verde y se tachará de la lista.
5.  ¡Encuentra todas las palabras para ganar!

---

Desarrollado con ❤️ usando React y Tailwind CSS.
