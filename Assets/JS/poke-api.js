const pokeApi = {}

//Consumo da API
pokeApi.getPokemons = async (offset = 0, limit = 10)=>{
    try{
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

        const response = await fetch(url);
        const responseJson = await response.json();
        
        return responseJson.results;
    }
    catch(error){
        console.log('Erro ao buscar os pokémons:', error);
    }
}


const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

fetch(url);