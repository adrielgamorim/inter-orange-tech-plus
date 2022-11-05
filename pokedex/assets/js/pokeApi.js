

const pokeApi = {
    getPokemonDetails(pokemon) {
        return fetch(pokemon.url)
            .then(res => res.json())
            // .then(v => console.log(v))
            .then(createCustomPokeApiDetails)
    },

    getPokemons(offset = 0, limit = 15) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

        return fetch(url)
            .then(res => res.json())
            .then(body => body.results)
            .then(pokeList => pokeList.map(pokeApi.getPokemonDetails))
            .then(detailRequest => Promise.all(detailRequest))
    },

    getPokemonById(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`

        return fetch(url)
            .then(res => res.json())
            .then(createCustomPokeApiDetails)
    }
}

function createCustomPokeApiDetails(details) {
    const pokemon = new Pokemon()
    pokemon.id = details.id
    pokemon.name = details.name

    const types = details.types.map(v => v.type.name)
    const [ type ] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.sprite = details.sprites.other.home.front_default

    const abilities = details.abilities.map(v => v.ability.name)
    pokemon.abilities = abilities

    const gamesAppeared = details.game_indices.map(v => v.version.name)
    pokemon.games = gamesAppeared

    const moves = details.moves.map(v => v.move.name)
    pokemon.moves = moves
    
    const stats = details.stats.map(v => [v.stat.name, v.base_stat])
    pokemon.stats = stats

    return pokemon
}