const botonB = document.getElementById("buscar")
const inputText = document.getElementById("cityInput")
const inputPlan = document.getElementById("planes")

    botonB.addEventListener("click" , function(){
        const ciudadUser = inputText.value;
        const planesUser = inputPlan.value
        console.log(ciudadUser + " " + planesUser)

    })