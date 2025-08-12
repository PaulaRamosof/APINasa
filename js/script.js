const key = 'RjGXDgj8bLifcEuErZtyc5vQE5aHyxxW74WWbynI';
const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
const fecha = document.getElementById('consultarFecha');

//Constantes html
const titulo = document.getElementById('titulo');
let fechaConsulta = document.getElementById('consultarFecha').value;//Fecha a consultar
const fechaFoto = document.getElementById('date');//Fecha de cuando se tomo la foto
const imagen = document.getElementById('fotoDia');
const explicacion = document.getElementById('date');

fetch(url)
    .then(respuestaServer => {
        // Verificacion si la respuesta de la red fue exitosa.
        if (!respuestaServer.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return respuestaServer.json(); // Convierte la respuesta a formato JSON.
    })
    .then(datosAPI => {
        console.log("Objeto completo recibido de la API:", datosAPI);
        titulo.textContent = datosAPI.title;
        fechaFoto.textContent = datosAPI.date;
        // Al asignar la URL al atributo 'src', el navegador mostrará la imagen.
        imagen.src = datosAPI.url;
        explicacion.textContent = datosAPI.explanation;
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle.
        console.error('No se pudo obtener la imagen del día:', error);
    });

    function buscarFotoFecha(fechaConsulta){
        fetch(url)
    .then(respuestaServer => {
        // Verificacion si la respuesta de la red fue exitosa.
        if (!respuestaServer.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        return respuestaServer.json(); // Convierte la respuesta a formato JSON.
    })
    .then(datosAPI => {
        console.log("Objeto completo recibido de la API:", datosAPI);
        titulo.textContent = datosAPI.title;
        fechaFoto.textContent = datosAPI.date;
        // Al asignar la URL al atributo 'src', el navegador mostrará la imagen.
        imagen.src = datosAPI.url;
        explicacion.textContent = datosAPI.explanation;
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle.
        console.error('No se pudo obtener la imagen del día:', error);
    });

    }