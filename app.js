// Configuración de la API
const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const pokemonGrid = document.getElementById('pokemonGrid');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');

// Colores para los tipos de Pokémon
const typeColors = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC'
};

// Función para mostrar el indicador de carga
function showLoading() {
    loadingIndicator.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Función para ocultar el indicador de carga
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

// Función para mostrar mensajes de error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Función para crear una tarjeta de Pokémon
function createPokemonCard(pokemon) {
    const card = document.createElement('article');
    card.className = 'pokemon-card';

    const image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.loading = 'lazy';

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const types = document.createElement('div');
    types.className = 'pokemon-types';

    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = `type ${type.type.name}`;
        typeSpan.textContent = type.type.name;
        types.appendChild(typeSpan);
    });

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(types);

    return card;
}

// Función para cargar y mostrar Pokémon
async function loadPokemon(searchTerm = '') {
    try {
        showLoading();
        pokemonGrid.innerHTML = '';

        let pokemonList = [];
        if (searchTerm) {
            // Búsqueda por nombre específico
            try {
                const response = await fetch(`${API_BASE_URL}/pokemon/${searchTerm.toLowerCase()}`);
                if (!response.ok) throw new Error('Pokémon no encontrado');
                const pokemon = await response.json();
                pokemonList = [pokemon];
            } catch (error) {
                showError('Pokémon no encontrado. Intenta con otro nombre.');
                hideLoading();
                return;
            }
        } else {
            // Cargar lista inicial de Pokémon
            const response = await fetch(`${API_BASE_URL}/pokemon?limit=300`);
            const data = await response.json();
            
            // Obtener detalles de cada Pokémon
            const promises = data.results.map(pokemon => 
                fetch(pokemon.url).then(res => res.json())
            );
            pokemonList = await Promise.all(promises);
        }

        // Mostrar los Pokémon en la cuadrícula
        pokemonList.forEach(pokemon => {
            const card = createPokemonCard(pokemon);
            pokemonGrid.appendChild(card);
        });

    } catch (error) {
        showError('Error al cargar los Pokémon. Por favor, intenta de nuevo.');
        console.error('Error:', error);
    } finally {
        hideLoading();
    }
}

// Event Listeners
searchButton.addEventListener('click', () => {
    loadPokemon(searchInput.value.trim());
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadPokemon(searchInput.value.trim());
    }
});

// Cargar Pokémon iniciales cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadPokemon();
});