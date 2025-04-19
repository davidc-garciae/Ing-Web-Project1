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
async function createPokemonCard(pokemon) {
    const card = document.createElement('article');
    card.className = 'pokemon-card';
    
    // Crear y agregar la imagen
    const image = document.createElement('img');
    image.className = 'pokemon-image';
    image.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.loading = 'lazy';
    
    // Crear y agregar el nombre
    const name = document.createElement('h2');
    name.className = 'pokemon-name';
    name.textContent = pokemon.name;
    
    // Crear y agregar los tipos
    const types = document.createElement('div');
    types.className = 'pokemon-types';
    
    pokemon.types.forEach(type => {
        const typeSpan = document.createElement('span');
        typeSpan.className = `type ${type.type.name}`;
        typeSpan.textContent = type.type.name;
        types.appendChild(typeSpan);
    });
    
    // Cargar datos de la especie y aplicar el color
    try {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        
        console.log(`Color de ${pokemon.name}:`, speciesData.color.name); // Debugging
        
        // Mapeo de colores de la API a valores hexadecimales
        const colorMap = {
            'black': '#303030',
            'blue': '#3B4CCA',
            'brown': '#A38C21',
            'gray': '#919191',
            'green': '#3E9709',
            'pink': '#FF65A5',
            'purple': '#7B62A3',
            'red': '#FF0000',
            'white': '#E0E0E0', // Cambiado para visibilidad
            'yellow': '#FFDE00'
        };
        
        // Verificar y aplicar el color
        const pokemonColor = colorMap[speciesData.color.name];
        if (pokemonColor) {
            // Aplicar directo en lugar de como gradiente para simplificar
            card.style.setProperty('--pokemon-color', createGradient(pokemonColor));
            console.log(`Color aplicado a ${pokemon.name}:`, pokemonColor); // Debugging
        } else {
            console.log(`No se encontró color para ${pokemon.name}`); // Debugging
        }
    } catch (error) {
        console.error("Error obteniendo datos de especie:", error);
    }
    
    // Agregar todos los elementos a la tarjeta
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
            // Búsqueda por nombre o ID específico
            try {
                const searchQuery = searchTerm.toLowerCase().trim();
                const response = await fetch(`${API_BASE_URL}/pokemon/${searchQuery}`);
                
                if (!response.ok) throw new Error('Pokémon no encontrado');
                const pokemon = await response.json();
                pokemonList = [pokemon];
            } catch (error) {
                showError('Pokémon no encontrado. Intenta con otro nombre o número.');
                hideLoading();
                return;
            }
        } else {
            // Cargar lista inicial de Pokémon (limitado a 30 para mejorar rendimiento)
            const response = await fetch(`${API_BASE_URL}/pokemon?limit=30`);
            const data = await response.json();
            
            // Obtener detalles de cada Pokémon
            const promises = data.results.map(pokemon => 
                fetch(pokemon.url).then(res => res.json())
            );
            pokemonList = await Promise.all(promises);
        }
        
        // Mostrar los Pokémon en la cuadrícula (uno por uno para permitir que las llamadas a la API se completen)
        for (const pokemon of pokemonList) {
            const card = await createPokemonCard(pokemon);
            pokemonGrid.appendChild(card);
        }
        
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

// Función para crear un gradiente a partir de un color base
function createGradient(baseColor) {
    // Función para aclarar un color
    function lightenColor(color, percent) {
        let hex = color.slice(1);
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        
        r = Math.min(255, r + (255 - r) * (percent / 100));
        g = Math.min(255, g + (255 - g) * (percent / 100));
        b = Math.min(255, b + (255 - b) * (percent / 100));
        
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    }
    
    const lighterColor = lightenColor(baseColor, 30);
    return `linear-gradient(135deg, ${baseColor}, ${lighterColor})`;
}