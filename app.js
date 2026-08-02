const botonB = document.getElementById("buscar")
const inputText = document.getElementById("cityInput")
const inputPlan = document.getElementById("planes")
const contenedor = document.querySelector(".Ciudad-resultado");
const contenedorScore = document.querySelector(".pronostico")


botonB.addEventListener("click", function () {
    const ciudadUser = inputText.value;
    const planesUser = inputPlan.value;
    contenedor.textContent = "";

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadUser}&count=5&language=es&format=json`)
        .then((response) => response.json())
        .then((data) => {
            for (let ciudad of data.results) {
                const Card_Ciudades = document.createElement("div");
                Card_Ciudades.textContent = `${ciudad.name} - ${ciudad.country}`;
                Card_Ciudades.classList.add("Ciudad-encontradas");
                contenedor.append(Card_Ciudades);

                Card_Ciudades.addEventListener("click", function () {
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ciudad.latitude}&longitude=${ciudad.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&timezone=auto`)
                        .then((response) => response.json())
                        .then((dataWeather) => {
                            const ahora = new Date();
                            const ahoraya = ahora.toLocaleDateString("sv-SE") + "T" + String(ahora.getHours()).padStart(2, "0") + ":00";
                            const indice = dataWeather.hourly.time.indexOf(ahoraya);
                            const temperatura = dataWeather.hourly.temperature_2m[indice];
                            const lluvia = dataWeather.hourly.precipitation_probability[indice];
                            const humedad = dataWeather.hourly.relative_humidity_2m[indice];

                            let score = 100;
                            let recomendacion = "";

                            if (planesUser === "Playa") {
                                if (temperatura < 24) {
                                    score -= 30;
                                }
                                if (lluvia > 40) {
                                    score -= 40;
                                }
                                if (humedad > 80) {
                                    score -= 20;
                                }

                                console.log(score);
                                if (score >= 65) {
                                    recomendacion = "dia de playa adecuado, disfruta";
                                } else if (score >= 50) {
                                    recomendacion = "dia de playa no tan adecuado, pero puedes disfrutar";
                                } else {
                                    recomendacion = " mejor quedate en casa o elige otro plan";
                                }
                            } else if (planesUser === "Caminar") {
                                if (temperatura < 15) {
                                    score -= 30;
                                }
                                if (lluvia > 50) {
                                    score -= 40;
                                }
                                if (humedad > 70) {
                                    score -= 20;
                                }

                                if (score >= 65) {
                                    recomendacion = "dia adecuado, disfruta";
                                } else if (score >= 40) {
                                    recomendacion = "dia no tan adecuado, sal con precaucion";
                                } else {
                                    recomendacion = " mejor quedate en casa o elige otro plan";
                                }
                            } else if (planesUser === "Picnic") {
                                if (temperatura < 17) {
                                    score -= 25;
                                }
                                if (lluvia > 60) {
                                    score -= 5;
                                }
                                if (humedad > 70) {
                                    score -= 10;
                                }
                                if (score >= 70) {
                                    recomendacion = "dia adecuado, disfruta";
                                } else if (score >= 50) {
                                    recomendacion = "dia no tan adecuado, sal con precaucion";
                                } else {
                                    recomendacion = " mejor quedate en casa o elige otro plan";
                                }
                            } else if (planesUser === "Cicla") {
                                if (temperatura < 10) {
                                    score -= 30;
                                }
                                if (lluvia > 20) {
                                    score -= 20;
                                }
                                if (humedad > 60) {
                                    score -= 60;
                                }
                                if (score >= 65) {
                                    recomendacion = "dia adecuado, disfruta";
                                } else if (score >= 40) {
                                    recomendacion = "dia no tan adecuado, sal con precaucion";
                                } else {
                                    recomendacion = " mejor quedate en casa o elige otro plan";
                                }
                            } else if (planesUser === "Familiar") {
                                if (temperatura < 1) {
                                    score -= 30;
                                }
                                if (lluvia > 61) {
                                    score -= 40;
                                }
                                if (humedad > 75) {
                                    score -= 20;
                                }

                                if (score >= 50) {
                                    recomendacion = "dia adecuado, disfruta";
                                } else {
                                    recomendacion = "elige otro plan, si quieres salir con tu familia";
                                }
                            }

                            const Card_Clima = document.createElement("div");
                            Card_Clima.innerHTML = `
                                        <h2>${ciudad.name}</h2>
                                        <p><i data-lucide="globe"></i>País: ${ciudad.country}</p>
                                        <p><i data-lucide="thermometer"></i>temperatura: ${temperatura}°C</p> 
                                        <p><i data-lucide="droplets"></i>Humedad: ${humedad}%</p>
                                        <p><i data-lucide="cloud-rain"></i>Probabilidad de lluvia: ${lluvia}% </p>
                                        <p><i data-lucide="star"></i> <strong>Score:</strong> ${score}/100</p>
                                        <p><i data-lucide="lightbulb"></i><strong>Recomendación:</strong> ${recomendacion}</p>
                                    `;
                            Card_Clima.classList.add("Ciudad_seleccionada");
                            contenedorScore.textContent = "";
                            contenedorScore.append(Card_Clima);
                            lucide.createIcons();
                        });
                });
            }
        });
});