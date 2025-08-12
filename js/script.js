// --- CONSTANTES Y CONFIGURACIÓN INICIAL ---

// Clave de la API de la NASA, obtenida de variables de entorno (método seguro).
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
// URL base de la API "Astronomy Picture of the Day" (APOD).
const API_URL = "https://api.nasa.gov/planetary/apod";

// --- SELECCIÓN DE ELEMENTOS DEL DOM ---
// Se obtienen referencias a los elementos HTML con los que se va a interactuar.
const datePicker = document.getElementById("datePicker");
const searchBtn = document.getElementById("searchBtn");
const titleEl = document.getElementById("title");
const dateEl = document.getElementById("date");
const mediaContainer = document.getElementById("mediaContainer");
const explanationEl = document.getElementById("explanation");
const favBtn = document.getElementById("favBtn");
const favoritesList = document.getElementById("favoritesList");

// --- LÓGICA INICIAL ---

// Establece la fecha máxima seleccionable en el calendario a la fecha actual.
// Esto previene que el usuario consulte fechas futuras, para las cuales no hay datos.
datePicker.max = new Date().toISOString().split("T")[0];


async function fetchAPOD(date = "") {
  try {
    // Realiza la petición a la API. `await` pausa la ejecución hasta que la promesa se resuelva.
    const res = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`);
    // Convierte la respuesta de la API de formato JSON a un objeto JavaScript.
    const data = await res.json();
    // Llama a la función para mostrar los datos en la página.
    displayAPOD(data);
  } catch (error) {
    // Si ocurre un error durante la petición (ej. problema de red), se muestra en la consola.
    console.error("Error al obtener APOD:", error);
  }
}


function displayAPOD(data) {
  // Asigna el título, fecha y explicación a los elementos HTML correspondientes.
  titleEl.textContent = data.title;
  dateEl.textContent = data.date;
  explanationEl.textContent = data.explanation;
  
  // Limpia el contenedor de medios antes de agregar el nuevo contenido para evitar duplicados.
  mediaContainer.innerHTML = "";
  // Comprueba si el tipo de medio es una imagen.
  if (data.media_type === "image") {
    // Crea un elemento <img>.
    const img = document.createElement("img");
    // Asigna la URL de la imagen al atributo 'src'.
    img.src = data.url;
    // Añade un texto alternativo por accesibilidad.
    img.alt = data.title;
    // Agrega la imagen al contenedor.
    mediaContainer.appendChild(img);
  // Si no es una imagen, comprueba si es un video.
  } else if (data.media_type === "video") {
    // Crea un elemento <iframe> para incrustar el video.
    const iframe = document.createElement("iframe");
    // Asigna la URL del video al atributo 'src'.
    iframe.src = data.url;
    // Define el ancho y alto del reproductor de video.
    iframe.width = "100%";
    iframe.height = "400";
    // Agrega el iframe al contenedor.
    mediaContainer.appendChild(iframe);
  }

  // Asigna la función addFavorite al evento onclick del botón de favoritos.
  // Se usa una función de flecha para pasar el objeto 'data' actual como argumento.
  favBtn.onclick = () => addFavorite(data);
}


function addFavorite(apod) {
  // Obtiene los favoritos actuales del localStorage o inicializa un array vacío si no hay nada.
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Comprueba si el APOD actual ya existe en favoritos (comparando por fecha) para no añadir duplicados.
  if (!favorites.some(fav => fav.date === apod.date)) {
    // Si no existe, lo añade al array.
    favorites.push(apod);
    // Guarda el array actualizado en el localStorage, convirtiéndolo a una cadena JSON.
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Vuelve a cargar la lista de favoritos en la página para mostrar el nuevo elemento.
    loadFavorites();
  }
}

function loadFavorites() {
  favoritesList.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Itera sobre cada elemento guardado en favoritos.
  favorites.forEach(fav => {
    // Crea un nuevo elemento de lista <li>.
    const li = document.createElement("li");
    // Establece el texto del elemento de lista.
    li.textContent = `${fav.date} - ${fav.title}`;
    // Cambia el cursor para indicar que es un elemento clickeable.
    li.style.cursor = "pointer";
    // Al hacer clic en un favorito, se llama a displayAPOD para mostrar sus detalles.
    li.onclick = () => displayAPOD(fav);
    // Añade el elemento a la lista de favoritos en el HTML.
    favoritesList.appendChild(li);
  });
}

// --- EVENT LISTENERS ---

// Se ejecuta cuando el usuario hace clic en el botón de búsqueda.
searchBtn.addEventListener("click", () => {
  // Obtiene la fecha seleccionada por el usuario en el input.
  const date = datePicker.value;
  // Valida que la fecha seleccionada no sea posterior a la fecha actual.
  if (new Date(date) > new Date()) {
    // Muestra una alerta al usuario si la fecha es inválida.
    alert("No puedes seleccionar una fecha futura");
    // Detiene la ejecución de la función.
    return;
  }
  // Llama a la función para obtener y mostrar el APOD de la fecha seleccionada.
  fetchAPOD(date);
});

// --- LLAMADAS INICIALES ---
// Al cargar la página, se obtiene el APOD del día actual llamando a la función sin argumentos.
fetchAPOD();
// Se cargan los favoritos guardados en el localStorage para que sean visibles desde el inicio.
loadFavorites();
