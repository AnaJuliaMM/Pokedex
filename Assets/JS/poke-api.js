const pokeApi = {}

function createPokemonCustomDescription(pokeApiPokemonDetails) {
    const pokemon = new Pokemon(pokeApiPokemonDetails);
    return pokemon;
}

pokeApi.getPokemonDetails = async (pokemon) => {
    const pokemonDetails = await fetch(pokemon.url)
    const pokemonDetailsJson = await pokemonDetails.json();
    return createPokemonCustomDescription(pokemonDetailsJson)
}

//Consumo da API
pokeApi.getPokemons = async (offset = 0, limit = 5) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        const pokemonsList = responseJson.results;

        const pokemonUrls = await pokemonsList.map(pokeApi.getPokemonDetails)
        const pokemonsDetailed = await Promise.all(pokemonUrls);
        return pokemonsDetailed;
    } catch (error) {
        console.log('Erro ao buscar os pokémons:', error);
    }
}
