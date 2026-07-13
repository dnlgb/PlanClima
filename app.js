const botonB = document.getElementById("buscar")
const inputText = document.getElementById("cityInput")
const inputPlan = document.getElementById("planes")

    botonB.addEventListener("click" , function(){
        const ciudadUser = inputText.value
        const planesUser = inputPlan.value
        
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadUser}&count=5&language=es&format=json`)
        .then((response) => response.json())
        .then((data) => console.log(data))

    })