const apiKey = '_3ruSZA2ID8XULXj7YvWB_HUm0UldYv79Dh3jhY87_Y';
const destinations = [
    { name: 'Cancún', country: 'México' },
    { name: 'Bali', country: 'Indonesia' },
    { name: 'Phuket', country: 'Tailandia' },
    { name: 'Maui', country: 'EE.UU.' },
    { name: 'Santorini', country: 'Grecia' }
];

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const fetchImages = (query, count, elementId, nameId, label) => {
    const url = `https://api.unsplash.com/photos/random?query=${query}&count=${count}&client_id=${apiKey}`;

    axios.get(url)
        .then(response => {
            const container = document.getElementById(elementId);
            container.innerHTML = ''; 

            response.data.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description || query;
                container.appendChild(img);
            });

            const nameElement = document.getElementById(nameId);
            nameElement.textContent = `${capitalizeFirstLetter(query)}`;

        })
        .catch(error => {
            console.error('Error:', error);
        });

let searchPerformed = false;

const buscarPais = () => {
    const pais = document.getElementById('search-input').value.trim();
    
    if (!pais) {
        alert('Por favor, ingresa un país.');
        return;
    }

    searchPerformed = true;

    // Mostrar imágenes del país buscado
    fetchImages(`playa ${pais}`, 2, 'playa-imagenes', 'playa-nombre', 'Playa');
    fetchImages(pais, 2, 'pais-playa-imagenes', 'pais-playa-nombre', 'País');
    fetchImages(`templo ${pais}`, 2, 'templo-imagenes', 'templo-nombre', 'Templo');
};

// Evento para el botón de búsqueda
document.getElementById('search-button').addEventListener('click', buscarPais);

};

let currentDestinationIndex = 0;
const updateImages = () => {

    if (!searchPerformed) {
    const destination = destinations[currentDestinationIndex];

    // Mostrar imágenes de playa y país
    fetchImages(`playa ${destination.name}`, 2, 'playa-imagenes', 'playa-nombre', 'Playa');
    fetchImages(destination.country, 2, 'pais-playa-imagenes', 'pais-playa-nombre', 'País');

    // Mostrar imágenes de templo y país
    fetchImages(`templo ${destination.country}`, 2, 'templo-imagenes', 'templo-nombre', 'Templo');
    fetchImages(destination.country, 2, 'pais-templo-imagenes', 'pais-templo-nombre', 'País');

    // Pasar al siguiente destino
    currentDestinationIndex = (currentDestinationIndex + 1) % destinations.length;
}
};

// Llamar a la función para actualizar las imágenes
updateImages();

