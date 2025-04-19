# Pokémon Explorer

<img alt="Pokémon Explorer Logo" src="https://pokeapi.co/static/pokeapi_256.png">

## Descripción del Proyecto

Pokémon Explorer es una aplicación web interactiva que te permite explorar y buscar información sobre diferentes Pokémon. Utilizando la API pública de PokéAPI, la aplicación muestra tarjetas de Pokémon con sus imágenes oficiales, tipos y colores característicos.

## Características Principales

- **Exploración de Pokémon**: Carga automáticamente una colección de 300 Pokémon al iniciar.
- **Búsqueda**: Permite buscar Pokémon por nombre o número.
- **Tarjetas Interactivas**: Diseño visual atractivo con efectos de hover.
- **Colores Dinámicos**: Cada Pokémon muestra un borde superior con el color correspondiente a su especie.
- **Tipos de Pokémon**: Muestra los tipos de cada Pokémon con sus colores correspondientes.
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla.
- **Indicador de Carga**: Muestra un spinner mientras se cargan los datos.
- **Manejo de Errores**: Muestra mensajes claros cuando un Pokémon no es encontrado.

## Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript (ES6+, Async/Await, Fetch API)
- PokéAPI

## Cómo Ejecutar el Proyecto

### Método 1: Usando Live Server en VS Code (Recomendado)

1. Clona este repositorio o descarga los archivos en tu computadora
2. Abre la carpeta del proyecto en Visual Studio Code
3. Asegúrate de tener instalada la extensión Live Server
4. Haz clic en el botón "Go Live" en la esquina inferior derecha de VS Code
5. ¡La aplicación se abrirá automáticamente en tu navegador predeterminado!

### Método 2: Abriendo directamente el archivo HTML

1. Clona este repositorio o descarga los archivos en tu computadora
2. Navega hasta la carpeta del proyecto
3. Haz doble clic en el archivo index.html
4. El proyecto se abrirá en tu navegador predeterminado

## Cómo Usar la Aplicación

### Navegar por la Colección de Pokémon

Al cargar la aplicación, se mostrarán automáticamente tarjetas para los primeros 300 Pokémon. Puedes desplazarte hacia abajo para ver más Pokémon.

### Buscar un Pokémon Específico

1. Ubica la barra de búsqueda en la parte superior de la página
2. Ingresa el nombre (ej. "pikachu") o el número (ej. "25") del Pokémon que deseas encontrar
3. Presiona el botón "Buscar" o la tecla Enter
4. El resultado se mostrará en pantalla

### Interactuar con las Tarjetas

Cuando pases el cursor sobre una tarjeta de Pokémon:

- La tarjeta se elevará ligeramente
- La imagen del Pokémon se ampliará para mostrar más detalles
- Las etiquetas de tipo mostrarán un efecto de elevación

### Ver Detalles del Pokémon

Cada tarjeta muestra:

- La imagen oficial del Pokémon
- El nombre del Pokémon
- Los tipos del Pokémon (con sus colores distintivos)
- Un borde superior con el color característico de la especie del Pokémon

## Estructura del Proyecto

- `index.html` - Estructura HTML principal
- `styles.css` - Estilos y diseño visual
- `app.js` - Lógica de la aplicación y comunicación con la API

## Personalización

Para personalizar los colores y el diseño:

1. Abre el archivo `styles.css`
2. Modifica las variables CSS en el bloque `:root`
3. Ajusta los colores para los diferentes tipos de Pokémon en la sección correspondiente

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, puedes:

1. Hacer un fork del repositorio
2. Crear una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Hacer commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Créditos

- Datos de Pokémon proporcionados por [PokéAPI](https://pokeapi.co/)
- Imágenes oficiales de Pokémon por The Pokémon Company
- Desarrollado como proyecto de práctica de Ingeniería Web

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
