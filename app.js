const botonB = document.getElementById("buscar")
const inputText = document.getElementById("cityInput")
const inputPlan = document.getElementById("planes")
const contenedor = document.querySelector(".Ciudad-resultado");


    botonB.addEventListener("click" , function(){
        const ciudadUser = inputText.value
        const planesUser = inputPlan.value
        contenedor.textContent = ""
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadUser}&count=5&language=es&format=json`)
        .then((response) => response.json())
        .then((data) => {
            for(let ciudad of data.results){ 
                const newDiv = document.createElement("div")
                    newDiv.textContent = ciudad.name + "-" + ciudad.country
                    contenedor.append(newDiv)
                    
            }  
            
        })
        
    })