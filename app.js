const botonB = document.getElementById("buscar")
const inputText = document.getElementById("cityInput")
const inputPlan = document.getElementById("planes")
const contenedor = document.querySelector(".Ciudad-resultado");
const contenedorScore = document.querySelector(".pronostico")


    botonB.addEventListener("click" , function(){
        const ciudadUser = inputText.value
        const planesUser = inputPlan.value
        contenedor.textContent = ""
        
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadUser}&count=5&language=es&format=json`)
        .then((response) => response.json())
        .then((data) => {

        for(let ciudad of data.results){ 
                const Card_Ciudades = document.createElement("div")
                    Card_Ciudades.textContent = `${ciudad.name} - ${ciudad.country}`
                    Card_Ciudades.classList.add("Ciudad-encontradas")
                    contenedor.append(Card_Ciudades)

                    Card_Ciudades.addEventListener("click" , function(){

                            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=auto`)
                            .then((response) => response.json())
                            .then((dataWeather) => {
                                const temperatura = dataWeather.hourly.temperature_2m[0];
                                const lluvia = dataWeather.hourly.precipitation_probability[0];
                                const humedad = dataWeather.hourly.relative_humidity_2m[0];
                                const Card_Clima = document.createElement("div")

                                Card_Clima.innerHTML = 
                                    `
                                        <h2>${ciudad.name}</h2>
                                        <p>País: ${ciudad.country}</p>
                                        <p>Latitud: ${ciudad.latitude}</p>
                                        <p>Longitud: ${ciudad.longitude}</p> 
                                        <p>temperatura: ${temperatura}°C</p> 
                                        <p>Humedad: ${humedad}%</p>
                                        <p>Probabilidad de lluvia: ${lluvia }% </p>
                                    `
                                Card_Clima.classList.add("Ciudad_seleccionada")
                                contenedorScore.textContent = "";
                                contenedorScore.append(Card_Clima)

                            if (planesUser == "Playa" && temperatura >= 24 && lluvia < 40){
                                console.log("dia de playa adecuado, disfruta")

                            }else if(planesUser == "Caminar" && temperatura < 29 && lluvia <= 20){
                                console.log("A caminar jajaja....:D")

                            }else if(planesUser == "Picnic" && temperatura >= 15 && lluvia <= 30){
                                console.log("Disfruta el picnic ")
                            }else if(planesUser == "Cicla" && temperatura <= 35 && lluvia <= 70){
                                console.log("A darle a esas piernas")
                            }else if(planesUser == "Familiar" && temperatura >= 1 && lluvia >= 80){
                                console.log("Descansa con la familia hoy, amigo")
                            }else{
                                console.log(`No es un buen dia para ${planesUser}, mejor elige otra actividad`)
                            }
                            })
                    })
            }
            
        })
    })