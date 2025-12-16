// ===============================================
// 1. DONNÉES SIMULÉES (Mock Data)
// ===============================================
const MOCK_ARTISANS = [
    { id: 'a1', name: 'Jean Dupont', job: 'Plombier', rating: 4.8, distance: 2.1, price: 'budget', availability: 'Disponible', phone: '+33612345678' },
    { id: 'a2', name: 'Marie Curie', job: 'Électricien', rating: 4.5, distance: 0.5, price: 'moyen', availability: 'Disponible', phone: '+33698765432' },
    { id: 'a3', name: 'Pierre Martin', job: 'Menuisier', rating: 4.2, distance: 5, price: 'premium', availability: 'Occupé', phone: '+33611223344' },
    { id: 'a4', name: 'Sophie Durant', job: 'Mécanicien', rating: 4.0, distance: 3, price: 'moyen', availability: 'Disponible', phone: '+33655667788' },
    { id: 'a5', name: 'Lucas Bernard', job: 'Peintre', rating: 4.6, distance: 1.2, price: 'budget', availability: 'Disponible', phone: '+33699887766' },
    { id: 'a6', name: 'Emma Leroy', job: 'Maçon', rating: 4.9, distance: 4, price: 'premium', availability: 'Occupé', phone: '+33644556677' },
];

let selectedArtisanId = null;

// ===============================================
// 2. NAVIGATION ENTRE ÉCRANS
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

        // Si écran profil
        if (screenId === 'artisan-profile') renderArtisanProfile();
    }
}

// ===============================================
// 3. INTERACTIONS ET ACTIONS
// ===============================================

// Gestion clic sur bouton WhatsApp ou Appel
function handleAction(actionType, phoneNumber) {
    if (!phoneNumber) return;
    let url;
    if (actionType === 'whatsapp') {
        url = `https://wa.me/${phoneNumber.replace(/[\s\(\)-]/g, '')}?text=Bonjour,%20j'ai%20vu%20votre%20profil%20sur%20l'application.`;
    } else if (actionType === 'call') {
        url = `tel:${phoneNumber.replace(/[\s\(\)-]/g, '')}`;
    }
    if (url) window.open(url, '_blank');
}

// Sélection d'une catégorie depuis l'accueil
function selectCategory(category) {
    const select = document.getElementById('category-select');
    if (select) select.value = category;
    navigateTo('search-filter');
}

// Soumission du formulaire artisan
function loginArtisan(event) {
    if (event) event.preventDefault();
    const phone = document.getElementById('phone')?.value.trim();
    const pin = document.getElementById('pin')?.value.trim();
    if (!phone || !pin) return alert('Veuillez renseigner le numéro de téléphone et le code PIN.');
    navigateTo('artisan-dashboard');
}

// ===============================================
// 4. FILTRAGE
// ===============================================
function applyFilters() {
    const category = document.getElementById('category-select')?.value || '';
    const distanceValue = document.querySelector('select[name="distance"]')?.value || '';
    const price = document.querySelector('select[name="price"]')?.value || '';
    const ratingValue = document.querySelector('select[name="rating"]')?.value || '';
    const availability = document.querySelector('select[name="availability"]')?.value || '';

    const distance = parseFloat(distanceValue);
    const rating = parseFloat(ratingValue);

    return MOCK_ARTISANS.filter(a => {
        if (category && a.job.toLowerCase() !== category.toLowerCase()) return false;
        if (distanceValue && !isNaN(distance) && a.distance > distance) return false;
        if (price && a.price !== price) return false;
        if (ratingValue && !isNaN(rating) && a.rating < rating) return false;
        if (availability && availability !== '' && a.availability !== availability) return false;
        return true;
    });
}

// Affiche les artisans filtrés
function populateArtisanList() {
    const container = document.getElementById('artisan-list-container');
    const resultsCount = document.querySelector('.results-count');
    if (!container) return;

    const filtered = applyFilters();

    container.innerHTML = '';
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

    if (resultsCount) resultsCount.textContent = `${filtered.length} artisan(s) trouvés`;
}

// Affiche le profil d'un artisan
function renderArtisanProfile() {
    const profileContainer = document.getElementById('artisan-profile-content');
    const artisan = MOCK_ARTISANS.find(a => a.id === selectedArtisanId) || MOCK_ARTISANS[0];
    if (!profileContainer) return;

    profileContainer.innerHTML = '';
    const nameEl = document.createElement('h2');
    nameEl.className = 'artisan-name';
    nameEl.textContent = artisan.name;

    const jobEl = document.createElement('p');
    jobEl.className = 'artisan-job';
    jobEl.textContent = `${artisan.job}`;

    const ratingEl = document.createElement('div');
    ratingEl.className = 'artisan-rating';
    ratingEl.textContent = `${artisan.rating} ⭐`;

    const actions = document.createElement('div');
    actions.className = 'profile-actions';

    const waBtn = document.createElement('button');
    waBtn.className = 'btn-whatsapp';
    waBtn.textContent = 'WhatsApp';
    waBtn.addEventListener('click', () => handleAction('whatsapp', artisan.phone));

    const callBtn = document.createElement('button');
    callBtn.className = 'btn-call';
    callBtn.textContent = 'Appeler';
    callBtn.addEventListener('click', () => handleAction('call', artisan.phone));

    actions.appendChild(waBtn);
    actions.appendChild(callBtn);

    profileContainer.appendChild(nameEl);
    profileContainer.appendChild(jobEl);
    profileContainer.appendChild(ratingEl);
    profileContainer.appendChild(actions);
}

// ===============================================
// 5. INITIALISATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('client-home');
    populateArtisanList();

    // Changement de filtre automatique
    const selects = document.querySelectorAll('#search-filter select');
    selects.forEach(sel => {
        sel.addEventListener('change', () => populateArtisanList());
    });

    // Bouton Rechercher
    const searchBtn = document.querySelector('#search-filter .btn-primary');
    if (searchBtn) searchBtn.addEventListener('click', () => populateArtisanList());

    // Formulaire connexion artisan
    const loginForm = document.querySelector('#artisan-login form');
    if (loginForm) loginForm.addEventListener('submit', loginArtisan);
});
// ===============================================
// 6. GESTION DES BOUTONS DE FILTRE VISUELS
// ===============================================

// On récupère tous les boutons
const filterButtons = document.querySelectorAll('.filter-btn');

// Fonction pour réinitialiser les classes actives
function resetFilterButtons() {
    filterButtons.forEach(btn => {
        btn.classList.remove('active-proximity', 'active-price', 'active-rating');
    });
}

// Ajout des listeners
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        resetFilterButtons(); // désactive tous
        const type = btn.dataset.filter; // "proximity", "price", "rating"

        // Ajoute la classe active correspondante
        if (type === 'proximity') btn.classList.add('active-proximity');
        else if (type === 'price') btn.classList.add('active-price');
        else if (type === 'rating') btn.classList.add('active-rating');

        // Applique le filtre correspondant
        const select = document.querySelector(`#search-filter select[name="${type}"]`);
        if (select) {
            select.value = select.dataset.value || ''; // ou une valeur par défaut
            populateArtisanList(); // rafraîchit la liste
        }
    });
});