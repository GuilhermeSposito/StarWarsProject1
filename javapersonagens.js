let currentPageUrl = 'https://swapi.dev/api/planets/'


window.onload = async ()=>{
    try{
       
       await loadPlanets(currentPageUrl)

    }   catch (error) {

        console.log(error)
        alert('Erro Ao Carregar Cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

}

async function loadPlanets(url){

    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; 
    try{
            const response = await fetch(url);
            const responseJson = await response.json();

            responseJson.results.forEach((planet) => {
                const card = document.createElement("div")
                card.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                card.className = "cards"

                const planetNameBG = document.createElement("div")
                planetNameBG.className = "planets-bg"

                const planetName = document.createElement("span")
                planetName.className = "planets-name"
                planetName.innerText = `${converName(planet.name)}`


                planetNameBG.appendChild(planetName)
                card.appendChild(planetNameBG)

                card.onclick = () =>{
                    const modal= document.getElementById("modal");
                    modal.style.visibility = "visible" ;

                    const modalContent = document.getElementById("modal-content")
                    modalContent.innerHTML = '';

                    
                   

                    const fecharModal = document.createElement("div")
                    fecharModal.className= "fechar-modal"
                    fecharModal.innerHTML= '<i class="fa-solid fa-xmark"></i>'

                    const planetImage = document.createElement("div")
                    planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
                    planetImage.className = "planet-image"


                    const planetName = document.createElement("span")
                    planetName.className = "planet-details"
                    planetName.innerText = ` Nome: ${converName(planet.name)}`

                    const rotacaoPlanet = document.createElement("span")
                    rotacaoPlanet.className = "planet-details"
                    rotacaoPlanet.innerText = `Periodo de rotacao: ${planet.rotation_period} hrs`

                    const diasPlanet = document.createElement("span")
                    diasPlanet.className = "planet-details"
                    diasPlanet.innerText = `Dias no ano: ${planet.orbital_period} dias`

                     
                    const climaPlanet = document.createElement("spam")
                    climaPlanet.className = "planet-details"
                    climaPlanet.innerText = `Clima: ${planet.climate}`

                    const population= document.createElement("span")
                    population.className = "planet-details"
                    population.innerText = `Populacao: ${planet.population}`
               
                  
                    modalContent.appendChild(fecharModal)
                    modalContent.appendChild(planetImage)
                    modalContent.appendChild(planetName)
                    modalContent.appendChild(rotacaoPlanet)
                    modalContent.appendChild(diasPlanet)
                    modalContent.appendChild(climaPlanet)
                    modalContent.appendChild(population)
                   
                }

                mainContent.appendChild(card)

            })

         

            const nextButton = document.getElementById('next-button');
            const backButton = document.getElementById('back-button');
            
            nextButton.disabled = !responseJson.next;
            backButton.disabled = !responseJson.previous;

            backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch (error){

        alert('Erro ao Carregar Os Personagens')
        console.log(error)
    }

}



async function loadNextPage(){

    if(!currentPageUrl) return;

    try {
        
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadPlanets(responseJson.next)


    } catch (error) {

        console.log(error)
        alert('erro ao carregar a proxima página')
    }

}

async function loadPreviousPage(){

    if(!currentPageUrl) return;

    try {  
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadPlanets(responseJson.previous)

    } catch (error) {

        console.log(error)
        alert('erro ao carregar a  página anterior')
    }

}

function hideModal() {
    const modal = document.getElementById("modal")

    modal.style.visibility = "hidden"


}


function convertEyeColor(eyeColor){


        const cores = {


            blue: "azul",
            brown: "Castanho",
            green: "verde",
            yellow: "amarelo",
            black: "preto",
            pink: "rosa",
            red: "vermelho",
            orange: "laranja",
            hazel: "avelã",
            unknown: "desconhecida",
             gray: "cinza"




        };


        return cores[eyeColor.toLowerCase()] || eyeColor

}



function converName(name){


    if(name === "unknown"){
        return "desconhecido"}

        return `${name}`

}