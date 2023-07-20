class Pokemon{
    constructor(pokeApiDetails){
        this.name = pokeApiDetails.name;
        this.id = pokeApiDetails.id;
        this.image = pokeApiDetails.sprites.other.dream_world.front_default;
        const types = pokeApiDetails.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types //destructing, equivalente a fazer lista.get(0), lista.get(1), lista.get(2)
        this.types = types
        this.type = type
   
    }
}

class detailedPokemon extends Pokemon{
    constructor(pokeApiDetails){
        super(pokeApiDetails)
        this.height = pokeApiDetails.height;
        this.weight = pokeApiDetails.weight;
        this.abilities = pokeApiDetails.abilities.map((ability)=>{return {name: ability.ability.name, isHidden: ability.is_hidden}})
        this.stats = pokeApiDetails.stats.map((statInformation)=>`${statInformation.stat.name} ${statInformation.base_stat}`)
        this.moves = pokeApiDetails.moves.map((move)=>move.move.name)
    }

}
