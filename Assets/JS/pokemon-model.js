class Pokemon{
    constructor(pokeApiDetails){
        console.log(pokeApiDetails);
        this.name = pokeApiDetails.name;
        this.id = pokeApiDetails.id;
        this.image = pokeApiDetails.sprites.other.dream_world.front_default;
        this.height = pokeApiDetails.height;
        this.weight = pokeApiDetails.weight;
        this.abilities = pokeApiDetails.abilities.map((ability)=>{return {name: ability.ability.name, isHidden: ability.is_hidden}})

        const types = pokeApiDetails.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types //destructing, equivalente a fazer lista.get(0), lista.get(1), lista.get(2)
        this.types = types
        this.type = type

        this.stats = {}
        pokeApiDetails.stats.forEach((statInformation)=>{
            this.stats[statInformation.stat.name]=  statInformation.base_stat
        })
        this.moves = pokeApiDetails.moves.map((move)=>move.move.name) 
    }
}

/*
const teste = pokeApiDetails.stats.map((stats)=>{
            const statsValues = {}
            statsValues[stats.stat.name]= stats.base_stat
            return statsValues;
        })
        this.stats = teste.reduce((stat, stat2)=>{
            console.log(stat, stat2);
            return stat + stat2
        }, {})








 name;
    id;
    type;
    types = [];
    image;
    height;
    weight;
    abilities = [];
    stats = {};
    moves = []

pokemon.name = pokeApiPokemonDetails.name;
    pokemon.id = pokeApiPokemonDetails.id;
    pokemon.image = pokeApiPokemonDetails.sprites.other.dream_world.front_default;
    const types = pokeApiPokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types //destructing, equivalente a fazer lista.get(0), lista.get(1), lista.get(2)
    pokemon.types = types
    pokemon.type = type

    pokemon.height = pokeApiPokemonDetails.height;
    pokemon.weight = pokeApiPokemonDetails.weight;
    pokemon.abilities = pokeApiPokemonDetails.abilities.map((ability)=>{return {name: ability.name, isHidden: ability.is_hidden}})









{name:'', hidden: false}

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









*/