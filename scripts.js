const apiKey = 'fGK0OZNCgszufRtabSXPceDE7dQfixyL6DbErIXL8IM';
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
};

let currentDestinationIndex = 0;
const updateImages = () => {
    const destination = destinations[currentDestinationIndex];

    // Mostrar imágenes de playa y país
    fetchImages(`playa ${destination.name}`, 2, 'playa-imagenes', 'playa-nombre', 'Playa');
    fetchImages(destination.country, 2, 'pais-playa-imagenes', 'pais-playa-nombre', 'País');

    // Mostrar imágenes de templo y país
    fetchImages(`templo ${destination.country}`, 2, 'templo-imagenes', 'templo-nombre', 'Templo');
    fetchImages(destination.country, 2, 'pais-templo-imagenes', 'pais-templo-nombre', 'País');

    // Pasar al siguiente destino
    currentDestinationIndex = (currentDestinationIndex + 1) % destinations.length;
};

// Llamar a la función para actualizar las imágenes
updateImages();
//setInterval(updateImages, 10000);

