const pokemonList = document.getElementById('pokemon-list')
const previousPage = document.getElementById('previous-page')
const nextPage = document.getElementById('next-page')
const pokemonEl = document.getElementsByClassName('.pokemon')
const pokemonDetailsEl = document.getElementById('pokemon-details')

let offset = 0
const limit = 15

function convertPokemonToHtml(pokemon) {
    return `
        <li onclick="handleDetails(${pokemon.id})" class="pokemon ${pokemon.type}">
            <div class="pokemon__name--wrapper">
                <span class="pokemon__name">${pokemon.name}</span>
                <span class="pokemon__id">#${pokemon.id}</span>
            </div>

            <div class="pokemon__details">
                <ol class="pokemon__types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.sprite}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToDetailsHtml(pokemon) {
    return `
        <div class="pokemon__details--wrapper ${pokemon.type}">
            <i onclick="handleCloseDetails()" class="fa-regular fa-circle-xmark"></i>
            <div class="flex">
                <img class="pokemon__details--img" src="${pokemon.sprite}" alt="${pokemon.name}">
                <div class="pokemon__name--wrapper">
                    <span class="pokemon__details--name">${pokemon.name}</span>
                    <span class="${pokemon.type} pokemon__details--id">#${pokemon.id}</span>
                </div>
            </div>
            <div class="pokemon__details--types">
                ${pokemon.types.map(type => `<span class="pokemon__details--type ${type}">${type}</span>`).join('')}
            </div>
            <p>Stats</p>
            <div class="pokemon__details--box">
                ${pokemon.stats.map(stat => `<span class="${pokemon.type} pokemon__details--content">${stat[0]}: ${stat[1]}</span>`).join('')}
            </div>
            <p>Abilities</p>
            <div class="pokemon__details--box">
                ${pokemon.abilities.map(ability => `<span class="${pokemon.type} pokemon__details--content">${ability}</span>`).join('')}
            </div>
            <p>Moves</p>
            <div class="pokemon__details--box">
                ${pokemon.moves.map(move => `<span class="${pokemon.type} pokemon__details--content">${move}</span>`).join('')}
            </div>
            <p>Games appeared</p>
            <div class="pokemon__details--box">
                ${pokemon.games.map(game => `<span class="${pokemon.type} pokemon__details--content">${game}</span>`).join('')}
            </div>
            
        </div>
    `
}

function handleDetails(id) {
    console.log(id)
    pokeApi.getPokemonById(id).then(pokemon => {
        pokemonDetailsEl.innerHTML = convertPokemonToDetailsHtml(pokemon)
        pokemonDetailsEl.scrollIntoView({ behavior: "smooth"})
    })
}

function handleCloseDetails() {
    pokemonDetailsEl.innerHTML = ""
}

function handlePokemons (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokeList = []) => {
        pokemonList.innerHTML = pokeList.map(convertPokemonToHtml).join('')
    })
}
handlePokemons()

previousPage.addEventListener('click', () => {
    pokemonDetailsEl.innerHTML = ""
    offset -= limit
    if(offset < 0) offset = 0
    handlePokemons(offset, limit)
})

nextPage.addEventListener('click', () => {
    pokemonDetailsEl.innerHTML = ""
    offset += limit
    handlePokemons(offset, limit)
})