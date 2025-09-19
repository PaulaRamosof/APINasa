const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const API_URL = "https://api.nasa.gov/planetary/apod";

const datePicker = document.getElementById("datePicker");
const searchBtn = document.getElementById("searchBtn");
const titleEl = document.getElementById("title");
const dateEl = document.getElementById("date");
const mediaContainer = document.getElementById("mediaContainer");
const explanationEl = document.getElementById("explanation");
const favBtn = document.getElementById("favBtn");
const favoritesList = document.getElementById("favoritesList");

datePicker.max = new Date().toISOString().split("T")[0];

async function fetchAPOD(date = "") {
  try {
    const res = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}`);
    const data = await res.json();
    displayAPOD(data);
  } catch (error) {
    console.error("Error al obtener APOD:", error);
  }
}

function displayAPOD(data) {
  titleEl.textContent = data.title;
  dateEl.textContent = data.date;
  explanationEl.textContent = data.explanation;

  mediaContainer.innerHTML = "";
  if (data.media_type === "image") {
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = data.title;
    mediaContainer.appendChild(img);
  } else if (data.media_type === "video") {
    const iframe = document.createElement("iframe");
    iframe.src = data.url;
    iframe.width = "100%";
    iframe.height = "400";
    mediaContainer.appendChild(iframe);
  }

  favBtn.onclick = () => addFavorite(data);
}

function addFavorite(apod) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some(fav => fav.date === apod.date)) {
    favorites.push(apod);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  favoritesList.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach(fav => {
    const li = document.createElement("li");
    li.textContent = `${fav.date} - ${fav.title}`;
    li.style.cursor = "pointer";
    li.onclick = () => displayAPOD(fav);
    favoritesList.appendChild(li);
  });
}

searchBtn.addEventListener("click", () => {
  const date = datePicker.value;
  if (new Date(date) > new Date()) {
    alert("No puedes seleccionar una fecha futura");
    return;
  }
  fetchAPOD(date);
});

fetchAPOD();
loadFavorites();

