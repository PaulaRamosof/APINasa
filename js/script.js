const key = 'RjGXDgj8bLifcEuErZtyc5vQE5aHyxxW74WWbynI';
const url = 'https://api.nasa.gov/planetary/apod?api_key=' + key;
const fecha = document.getElementById('consultarFecha');
let x = JSON.parse(localStorage.getItem("")) || [];
fetch(url, {
    method: "GET",
    body: JSON.stringify({
        id: 1,
        tittle: '',
        date: "",
        url: '',
        explanation: "Miranda",
        copyright: ''
    }),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }

})