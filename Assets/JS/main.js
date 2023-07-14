function convertToHtmlLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${'#'+pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type)=>`<li class="type ${pokemon.type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </div>
        </li>`
}

const pokemonList = document.getElementById('pokemonList')
async function manipulateHtml(){
    const pokemons = await pokeApi.getPokemons();     //pokeAPI é um objeto que vem do script 'poke-api.js'

    pokemonList.innerHTML = pokemons.map(convertToHtmlLi).join('')
}
manipulateHtml()




