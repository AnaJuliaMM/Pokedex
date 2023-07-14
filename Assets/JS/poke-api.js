const pokeApi = {}

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


pokeApi.getPokemonDetail = async (pokemon)=>{
    const pokemonDetails = await fetch(pokemon.url)
    const pokemonDetailsJson = await pokemonDetails.json();
    console.log(pokemonDetailsJson)
    return createPokemonCustomDescription(pokemonDetailsJson)

}

//Consumo da API
pokeApi.getPokemons = async (offset = 0, limit = 5)=>{
    try{
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        const responseJson = await response.json();

        const pokemonList = responseJson.results;
        const pokemonUrls = await pokemonList.map(pokeApi.getPokemonDetail)
        console.log(pokemonUrls);
        const pokemonDetail = await Promise.all(pokemonUrls);
         
        return pokemonDetail;
     
    }
    catch(error){
        console.log('Erro ao buscar os pokémons:', error);
    }
}
