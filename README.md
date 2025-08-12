# 🌌 NASA APOD Explorer

Aplicación web interactiva que muestra la **Astronomy Picture of the Day (APOD)** de la NASA, permitiendo explorar imágenes astronómicas históricas y guardar las favoritas en el navegador.

![NASA APOD Explorer Screenshot](https://apod.nasa.gov/apod/image/2408/NGC7293_Hubble_960.jpg)

---

## 🚀 Funcionalidades

1. **Foto del día**
   - Conexión con la API oficial de la NASA.
   - Muestra título, fecha, imagen y explicación científica.

2. **Selector de fechas**
   - Campo `date` para consultar APODs pasadas.
   - Validación para evitar fechas futuras.

3. **Sistema de favoritos**
   - Botón para añadir la APOD actual a favoritos.
   - Guardado persistente usando `localStorage`.
   - Lista de favoritos clicables para volver a ver cada APOD.

4. **Diseño responsive**
   - Estilo oscuro, colores contrastantes y diseño minimalista.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**: estructura de la aplicación.
- **CSS3**: estilos y diseño responsive.
- **JavaScript ES6**: lógica de interacción y consumo de API.
- **NPM**: manejo de dependencias, se corre con npm run dev
- **Vite**: entorno de desarrollo rápido.
- **LocalStorage**: persistencia de datos en el navegador.
- **NASA APOD API**: fuente de imágenes y videos.

---

## 📦 Instalación y uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/usuario/nasa-apod-explorer.git
   cd nasa-apod-explorer
