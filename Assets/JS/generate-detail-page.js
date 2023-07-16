const urlParams = new URLSearchParams(window.location.search); //Procura Query strings
const pokemonId = urlParams.get('pokemonId'); //Procura a chave 'pokemonId' 
console.log(pokemonId); // Exibe o nome do Pokémon no console

const teste = document.getElementById('teste')

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
    teste.innerHTML = `
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
    
    `
}
loadPokemonDescription()




/*


*/