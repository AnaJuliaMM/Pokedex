const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

//Transformar em elemento HTML
function convertHtmlListElement(pokemon){
    return `<li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                <li class="type">grass</li>
                <li class="type">posion</li>
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
        </div>
        </li>`
}


function addPokedexHtmlPage(pokemon){
    const pokemonList = document.getElementById('pokemonList')
    pokemonList.innerHTML += convertHtmlListElement(pokemon)
}

//Requisição http (É uma Promise)
async function makeHttpRequest(){
    try{
        const response =  await fetch(url)
        const responseBody = await response.json()
        const pokemonList = responseBody.results //É um atributo do JSON que possuí a lista dos pokemóns
        pokemonList.forEach(pokemon => {
            addPokedexHtmlPage(pokemon);
        });

    }catch(error){
        console.log(error);
    }finally{
        console.log('Requisição Concluída');
    }
}
makeHttpRequest()




//Manipulação do HTML