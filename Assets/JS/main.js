//Elementos Html
const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMore')
const limit = 5;
let offset = 0; 
const maxRecords = 151; //Primeira Geraçã


//Promise: recebe os pokemons que foram requisitados na forma de lista e insere no html como <li></li>
async function loadPokedexItems(offset, limit){
    const pokemons = await pokeApi.getPokemons(offset, limit);     //pokeAPI é um objeto que vem do script 'poke-api.js'
    pokemonList.innerHTML += pokemons.map((pokemon)=>
        `<li class="pokemon ${pokemon.type}">
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
}

//Primeira lista carregada
loadPokedexItems(offset, limit) 

//Outras listas carregadas
loadMoreBtn.addEventListener('click', ()=>{
    offset += limit;
    debugger
    const qtRecordsNextPage = offset+limit;

    if(qtRecordsNextPage >= maxRecords ){
        const newLimit = maxRecords - offset;
        loadPokedexItems(offset, newLimit);

        //Remover o bt
        loadMoreBtn.parentElement.removeChild(loadMoreBtn)
    }else{
        loadPokedexItems(offset, limit)
    }
    
} )