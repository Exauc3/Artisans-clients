// ==================== VARIABLES ====================
const searchBar = document.querySelector('.search-bar');
const artisanList = document.querySelector('.artisan-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// ==================== GESTION DES BOUTONS ACTIFS ====================
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type; // type = proximity, price, rating
        
        // On retire toutes les classes actives de ce type
        filterButtons.forEach(b => {
            if (b.dataset.type === type) {
                b.classList.remove(`active-${type}`);
            }
        });

        // On ajoute la classe active sur le bouton cliqué
        btn.classList.add(`active-${type}`);

        // On applique le filtrage
        filterArtisans();
    });
});

// ==================== GESTION DE LA BARRE DE RECHERCHE ====================
searchBar.addEventListener('input', () => {
    filterArtisans();
});

// ==================== FONCTION DE FILTRAGE ====================
function filterArtisans() {
    const searchValue = searchBar.value.toLowerCase();

    // Récupération des filtres actifs
    const activeProximity = document.querySelector('.filter-btn.active-proximity');
    const activePrice = document.querySelector('.filter-btn.active-price');
    const activeRating = document.querySelector('.filter-btn.active-rating');

    const artisans = artisanList.querySelectorAll('.artisan-card');

    artisans.forEach(artisan => {
        let name = artisan.querySelector('.artisan-name').textContent.toLowerCase();
        let category = artisan.querySelector('.artisan-category').textContent.toLowerCase();

        // Vérifie recherche
        let matchesSearch = name.includes(searchValue) || category.includes(searchValue);

        // Vérifie filtres
        let matchesFilters = true;

        if (activeProximity && artisan.dataset.proximity !== activeProximity.dataset.value) {
            matchesFilters = false;
        }
        if (activePrice && artisan.dataset.price !== activePrice.dataset.value) {
            matchesFilters = false;
        }
        if (activeRating && artisan.dataset.rating !== activeRating.dataset.value) {
            matchesFilters = false;
        }

        // Affichage ou masquage
        if (matchesSearch && matchesFilters) {
            artisan.style.display = 'flex';
        } else {
            artisan.style.display = 'none';
        }
    });
}

// ==================== INITIALISATION ====================
filterArtisans(); // pour appliquer le filtre au chargement