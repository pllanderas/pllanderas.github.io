championsList = []
currentPatch = 0
selected = null
champ = null

async function load(){
    const patchResponse = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    var patchRaw = await patchResponse.json();
    currentPatch = patchRaw[0]

    const listResponse = await fetch("https://ddragon.leagueoflegends.com/cdn/" + currentPatch + "/data/en_US/champion.json");
    // Storing data in form of JSON
    var listRaw = await listResponse.json();
    var data = listRaw.data;
    for (let key in data) {
        championsList.push(key)
    }

    // Affichage des champions de la liste
    var list = document.getElementById("list")
    var defaultImg = document.createElement("img")
    defaultImg.src = "./img/square.png"
    defaultImg.classList.add("champImg")
    defaultImg.onclick = function () { imageListClick(this) }
    list.appendChild(defaultImg)

    for (let index = 0; index < championsList.length; index++) {
        var img = document.createElement("img")
        img.src = "https://ddragon.leagueoflegends.com/cdn/" + currentPatch + "/img/champion/" + championsList[index] + ".png"
        img.classList.add("champImg")
        img.id = championsList[index]
        img.onclick = function () { imageListClick(this) }
        list.appendChild(img)
    }
}

load()

function pickBanClick(element){
    // Cas à traiter
    if(selected == null){
        selected = element
        element.classList.add("selected")
    }else if(!element.classList.contains("selected")){     
        // On clique sur un élément pas sélectionné
        selected.classList.remove("selected") 
        selected = element
        element.classList.add("selected")
    }else if(element.classList.contains("selected")){ 
        // On clique sur un élément déjà sélectionné
        selected == null
        element.classList.remove("selected")
    }

}

function imageListClick(element){
    // Cas à traiter
    // Si élément sélectionné remplace + griser
    if(selected != null){
        selected.src = element.src
    }
}

function filterListResults(element){
    filter = element.value.toLowerCase()
    for (let index = 0; index < championsList.length; index++) {
        if(championsList[index].toLowerCase().includes(filter)){
            document.getElementById(championsList[index]).style.display = "initial"
        }else{
            document.getElementById(championsList[index]).style.display = "none"
        }
    }
}