const urlParams = new URLSearchParams(window.location.search); //Procura Query strings
const pokemonId = urlParams.get('pokemonId'); //Procura a chave 'pokemonId' 
console.log(pokemonId); // Exibe o nome do Pokémon no console

const header = document.getElementById('header')
const content = document.getElementById('content')
const about = document.getElementById('about')
const stats = document.getElementById('stats')
const moves = document.getElementById('moves')
const details = document.getElementById('details');
const detail = document.getElementById('detail');




//Criando uma instância do classe Pokemon 
function createPokemonCustomDescription(pokeApiDetails){
    const pokemon = new detailedPokemon(pokeApiDetails);
    return pokemon;
}

//Fazer a requisição do pokemon selecionado
async function getPokemonDetails(){
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        const pokemonDetails = await fetch(url);
        const pokemonDetailsJson = await pokemonDetails.json();
        return createPokemonCustomDescription(pokemonDetailsJson)
    }catch(error){
        console.log('Erro ao buscar os pokémons:', error);
    }
}

async function loadPokemonDescription(){
    const pokemon = await getPokemonDetails(); //Arquivo Json com os detalhes do pokemon
    console.log(pokemon);  
    content.classList.add(`${pokemon.type}`) 
    header.innerHTML = `
    <div class="header">
        <div class="name">
            <span class="id">${'#' + pokemon.id}</span>
            <h1>${pokemon.name}</h1>
            <ol class="types">
                ${pokemon.types.map((type)=> `<li class=${pokemon.type}>${type}</li>`).join('')}
            </ol>
        </div>
        </div>
        <figure class="image"><img src="${pokemon.image}" alt="${pokemon.name}"></figure>
    </div>`
    details.innerHTML = `
    <ul class="detail">
        <li><span class="label">Height</span><span class="value">${pokemon.height}</span></li>
        <li><span class="label">Weight</span><span class="value">${pokemon.weight}</span></li>
        <li><span class="label">Abilities</span><span class="value">${pokemon.abilities.map((ability)=> ability.name).join(', ')}</span></li>
    </ul>`

    about.addEventListener('click', ()=>{loadAboutDescription(pokemon)})
    stats.addEventListener('click', ()=>{loadStatsDescription(pokemon)})
    moves.addEventListener('click', ()=>{loadMovesDescription(pokemon)})
}
loadPokemonDescription()

function loadAboutDescription(pokemon){
    details.innerHTML = `
    <ul class="detail">
        <li><span class="label">Height</span><span class="value">${pokemon.height}</span></li>
        <li><span class="label">Weight</span><span class="value">${pokemon.weight}</span></li>
        <li><span class="label">Abilities</span><span class="value">${pokemon.abilities.map((ability)=> ability.name).join(', ')}</span></li>
    </ul>`
}
function loadStatsDescription(pokemon){
    details.innerHTML = `
    <ul class="detail">  
        ${pokemon.stats.map((stat)=> {
            const [nome, valor] = stat.split(' ');
            return `<li>
                <div class='stats'>
                    <span class="label">${nome}</span>
                    <span class="value">${valor}</span>
                </div>
                <progress value="${valor}" max="100"></progress>
            </li>`}).join('')}
    </ul>`
}
function loadMovesDescription(pokemon){
    const primeirosElementos = pokemon.moves.slice(0, 27)
    details.innerHTML = `
    <ul class="detail">
        <li>
            <span class="label">Total</span>
            <span class="value">${pokemon.moves.length}</span>
            <button id="showAllMoves">show all</button>
        </li>
    </ul>
    <ul class="moves" id="movesName">
    
    </ul>
    `
    const showAllMoves = document.getElementById('showAllMoves');
    const movesName = document.getElementById('movesName')

    showAllMoves.addEventListener('click', ()=>{
        if(movesName.innerHTML != ''){
            movesName.innerHTML = ''
            showAllMoves.innerText = 'show all'
        }else{
            movesName.innerHTML = `${pokemon.moves.map((move)=>`<li>${move}</li>`).join('')}`
            showAllMoves.innerText = 'Hide all'
        }
        
    })
   
}



/*

<h1>${pokemon.name}</h1>
    <ol>
        ${pokemon.types.map((type)=> `<li>${type}</li>`).join('')}
    </ol>
    <ol>
            <li>height: ${pokemon.height} </li>
            <li>weigth:  ${pokemon.weight}</li>
            <li>abilities: ${pokemon.abilities.map((ability)=> ability.name).join()}</li>
        </ol>
        <ol>
            Base Stats
            ${pokemon.stats.join('<br>')}
          
        </ol>
        <ol>
            Moves
            ${pokemon.moves.map((move)=>`<li>${move}</li>`).join('')}
        </ol> 

*/