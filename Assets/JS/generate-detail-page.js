//Identificar qual pokemon foi selecionado
const urlParams = new URLSearchParams(window.location.search); //Procura Query strings
const pokemonIndex = Number(urlParams.get('pokemonIndex')); //Procura a chave 'pokemonId' 
const pokemonPokeApiId = pokemonIndex + 1
console.log(pokemonPokeApiId); // Exibe o nome do Pokémon no console

const teste = document.getElementById('teste')

//Criando uma instância do classe Pokemon 
function createPokemonCustomDescription(pokeApiDetails){
    const pokemon = new Pokemon();
    pokemon.name = pokeApiDetails.name;
    pokemon.number = pokeApiDetails.id;
    pokemon.image = pokeApiDetails.sprites.other.dream_world.front_default;
    const types = pokeApiDetails.types.map((typeSlot)=> typeSlot.type.name);
    const [type] = types //destructing, equivalente a fazer lista.get(0), lista.get(1), lista.get(2)
    pokemon.types = types
    pokemon.type = type
    return pokemon;
}

//Fazer a requisição do pokemon selecionado
async function getPokemonDetails(){
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonPokeApiId}/`;
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
            <li>Species:</li>
            <li>height: </li>
            <li>weigth:</li>
            <li>abilities: </li>
        </ol>
        <ol>
            Base Stats
            <li>hp: </li>
            <li>attack: </li>
            <li>defense: </li>
            <li>special-attack: </li>
            <li>special-defense: </li>
            <li>speed: </li>

        </ol>
        <ol>
            Moves
            <li>move 1</li>
            <li>move 2</li>
            <li>move 3</li>

        </ol>
   
    
    

    
    `

}
loadPokemonDescription()




/*


*/