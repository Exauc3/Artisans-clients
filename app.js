// ===============================================
// 1. DONNÉES SIMULÉES
// ===============================================

const MOCK_ARTISANS = [
    { id: 'a1', name: 'Jean Dupont', job: 'Plombier', rating: 4.8, distance: 2.1, phone: '+33612345678', price: 'moyen', availability: 'Disponible' },
    { id: 'a2', name: 'Marie Curie', job: 'Électricien', rating: 4.5, distance: 0.5, phone: '+33698765432', price: 'budget', availability: 'Disponible' },
    { id: 'a3', name: 'Paul Martin', job: 'Menuisier', rating: 4.2, distance: 1.2, phone: '+33611223344', price: 'premium', availability: 'Occupé' },
    { id: 'a4', name: 'Sophie Leroy', job: 'Mécanicien', rating: 4.7, distance: 3, phone: '+33655667788', price: 'moyen', availability: 'Disponible' },
    { id: 'a5', name: 'Lucie Bernard', job: 'Peintre', rating: 4.1, distance: 2.5, phone: '+33699887766', price: 'budget', availability: 'Occupé' },
    { id: 'a6', name: 'Marc Dupuis', job: 'Maçon', rating: 4.3, distance: 4, phone: '+33644556677', price: 'premium', availability: 'Disponible' },
];

let selectedArtisanId = null;
let selectedCategory = ''; // La catégorie choisie depuis l'accueil

// ===============================================
// 2. NAVIGATION
// ===============================================

function navigateTo(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
        screen.setAttribute('aria-hidden', 'true');
    });

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.setAttribute('aria-hidden', 'false');

        if (screenId === 'artisan-profile') renderArtisanProfile();
    }
}

// ===============================================
// 3. SÉLECTION DE CATÉGORIE
// ===============================================

function selectCategory(category) {
    selectedCategory = category;

    // Aller à la page de filtre
    navigateTo('search-filter');

    // Remplir le select catégorie si vous voulez garder la cohérence visuelle
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) categorySelect.value = category;
}

// ===============================================
// 4. FILTRAGE ET RECHERCHE
// ===============================================

function applyFilters() {
    const category = document.getElementById('category-select').value;
    const distance = document.querySelector('select[name="distance"]').value;
    const price = document.querySelector('select[name="price"]').value;
    const rating = parseFloat(document.querySelector('select[name="rating"]').value || 0);
    const availability = document.querySelector('select[name="availability"]').value;

    const filtered = MOCK_ARTISANS.filter(a => {
        if (category && a.job.toLowerCase() !== category.toLowerCase()) return false;
        if (distance && a.distance > parseFloat(distance)) return false;
        if (price && a.price !== price) return false;
        if (rating && a.rating < rating) return false;
        if (availability && a.availability !== availability) return false;
        return true;
    });

    return filtered;
}

function populateArtisanList() {
    const container = document.getElementById('artisan-list-container');
    const resultsCount = document.querySelector('.results-count');
    if (!container) return;

    const filtered = applyFilters();

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p>Aucun artisan trouvé avec ces critères.</p>';
    } else {
        filtered.forEach(artisan => {
            const item = document.createElement('button');
            item.className = 'artisan-list-item';
            item.type = 'button';
            item.dataset.id = artisan.id;

            item.innerHTML = `
                <div class="artisan-card">
                    <div class="artisan-info">
                        <h4 class="artisan-name">${artisan.name}</h4>
                        <p class="artisan-job">${artisan.job} • ${artisan.distance} km</p>
                    </div>
                    <div class="artisan-rating">${artisan.rating} ⭐</div>
                </div>
            `;

            item.addEventListener('click', () => {
                selectedArtisanId = artisan.id;
                renderArtisanProfile();
                navigateTo('artisan-profile');
            });

            container.appendChild(item);
        });
    }

    if (resultsCount) resultsCount.textContent = `${filtered.length} artisan(s) trouvé(s)`;
}

// ===============================================
// 5. PROFIL ARTISAN
// ===============================================

function renderArtisanProfile() {
    const profileContainer = document.getElementById('artisan-profile-content');
    if (!profileContainer) return;

    const artisan = MOCK_ARTISANS.find(a => a.id === selectedArtisanId) || MOCK_ARTISANS[0];

    profileContainer.innerHTML = `
        <h2 class="artisan-name">${artisan.name}</h2>
        <p class="artisan-job">${artisan.job}</p>
        <div class="artisan-rating">${artisan.rating} ⭐</div>
        <div class="profile-actions">
            <button class="btn-whatsapp">WhatsApp</button>
            <button class="btn-call">Appeler</button>
        </div>
    `;

    const [waBtn, callBtn] = profileContainer.querySelectorAll('button');
    waBtn.addEventListener('click', () => handleAction('whatsapp', artisan.phone));
    callBtn.addEventListener('click', () => handleAction('call', artisan.phone));
}

// ===============================================
// 6. LOGIN ARTISAN
// ===============================================

function loginArtisan(event) {
    if (event) event.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    const pin = document.getElementById('pin').value.trim();
    if (!phone || !pin) { alert('Veuillez renseigner le numéro et le PIN.'); return; }
    navigateTo('artisan-dashboard');
}

// ===============================================
// 7. INITIALISATION
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('client-home');

    // Boutons catégorie
    const categoryButtons = document.querySelectorAll('.category-card');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.querySelector('p').textContent;
            selectCategory(category);
        });
    });

    // Bouton "Rechercher" dans search-filter
    const searchBtn = document.querySelector('#search-filter .btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            populateArtisanList();
            navigateTo('artisan-list');
        });
    }

    // Formulaire login artisan
    const loginForm = document.querySelector('#artisan-login form');
    if (loginForm) loginForm.addEventListener('submit', loginArtisan);
});