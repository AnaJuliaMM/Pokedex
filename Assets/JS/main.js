const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMore')
const limit = 5;
let offset = 0; 
const maxRecords = 151; //Primeira Geração


//Promise: recebe os pokemons que foram requisitados na forma de lista e insere no html como <li></li>
async function loadPokedexItems(offset, limit){
    const pokemons = await pokeApi.getPokemons(offset, limit); //pokeAPI é um objeto que vem do script 'poke-api.js'
    pokemonList.innerHTML += pokemons.map((pokemon)=>
        `<li class="pokemon ${pokemon.type}" id="${pokemon.name}">
            <span class="number">${'#'+ pokemon.id}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type)=>`<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>`
    ).join('')
    
    //Ouvidor de eventos para abrir a página de detalhes
    const pokedexs = document.getElementsByClassName('pokemon'); 
    for (let i = 0; i < pokedexs.length; i++) {
            pokedexs[i].addEventListener('click', ()=>{
                window.location.href = `./detailsPage.html?pokemonId=${i+1}`
                });
    }

}

//Primeiras pokedex carregadas(5)
loadPokedexItems(offset, limit) 

//Carregamento de outras de pokedex conforme solicitação do usuário
loadMoreBtn.addEventListener('click', async ()=>{
    offset += limit;
    const qtRecordsNextPage = offset+limit;
    if(qtRecordsNextPage >= maxRecords ){
        const newLimit = maxRecords - offset;
        await loadPokedexItems(offset, newLimit);
        loadMoreBtn.parentElement.removeChild(loadMoreBtn) //Remove btn
    }else{
        await loadPokedexItems(offset, limit)
    }  
} )

