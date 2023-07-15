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
            <span class="number">${'#'+ pokemon.number}</span>
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
    const newPokemons = document.getElementsByClassName('pokemon'); 
    for (let i = 0; i < newPokemons.length; i++) {
        newPokemons[i].addEventListener('click', ()=>{
            console.log(i)
            window.location.href = `./detailsPage.html?pokemonIndex=${i}`
        });
    }
}
loadPokedexItems(offset, limit) //Primeira lista carregada

//Carregamento de outras de pokedex
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

