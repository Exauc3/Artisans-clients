// ===============================================
// 1. GESTION DES DONNÉES SIMULÉES (Mock Data)
// ===============================================

const MOCK_ARTISANS = [
    { id: 'a1', name: 'Jean Dupont', job: 'Plombier', rating: 4.8, distance: '2.1 km', phone: '+33612345678' },
    { id: 'a2', name: 'Marie Curie', job: 'Électricien', rating: 4.5, distance: '500 m', phone: '+33698765432' },
    { id: 'a3', name: 'Paul Martin', job: 'Menuisier', rating: 4.2, distance: '1.2 km', phone: '+33611223344' },
    { id: 'a4', name: 'Sophie Leroy', job: 'Mécanicien', rating: 4.7, distance: '3 km', phone: '+33655667788' },
    { id: 'a5', name: 'Lucie Bernard', job: 'Peintre', rating: 4.1, distance: '2.5 km', phone: '+33699887766' },
    { id: 'a6', name: 'Marc Dupuis', job: 'Maçon', rating: 4.3, distance: '4 km', phone: '+33644556677' },
];

let selectedArtisanId = null;
let selectedCategory = '';

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

        if (screenId === 'artisan-profile') {
            renderArtisanProfile();
        }
    }
}

// ===============================================
// 3. ACTIONS (WhatsApp / Call)
// ===============================================

function handleAction(actionType, phoneNumber) {
    if (!phoneNumber) return;
    let url;
    if (actionType === 'whatsapp') {
        url = `https://wa.me/${phoneNumber.replace(/[\s\(\)-]/g, '')}?text=Bonjour,%20j'ai%20vu%20votre%20profil%20sur%20l'application.`;
    } else if (actionType === 'call') {
        url = `tel:${phoneNumber.replace(/[\s\(\)-]/g, '')}`;
    }
    if (url) {
        const target = (window.cordova || window.Cordova) ? '_system' : '_blank';
        window.open(url, target);
    }
}

// ===============================================
// 4. FILTRAGE DES ARTISANS
// ===============================================

function selectCategory(category) {
    selectedCategory = category;
    navigateTo('artisan-list');
    populateArtisanList();
}

function populateArtisanList() {
    const container = document.getElementById('artisan-list-container');
    const resultsCount = document.querySelector('.results-count');
    if (!container) return;

    // Si aucune catégorie sélectionnée, ne rien afficher
    if (!selectedCategory) {
        container.innerHTML = '<p>Veuillez sélectionner une catégorie pour voir les artisans.</p>';
        if (resultsCount) resultsCount.textContent = '0 artisan(s) trouvé(s)';
        return;
    }

    const filtered = MOCK_ARTISANS.filter(a =>
        a.job.toLowerCase() === selectedCategory.toLowerCase()
    );

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
                    <p class="artisan-job">${artisan.job} • ${artisan.distance}</p>
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
// 6. CONNEXION ARTISAN
// ===============================================

function loginArtisan(event) {
    if (event) event.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    const pin = document.getElementById('pin').value.trim();

    if (!phone || !pin) {
        alert('Veuillez renseigner le numéro et le PIN.');
        return;
    }

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

    // Formulaire login artisan
    const loginForm = document.querySelector('#artisan-login form');
    if (loginForm) loginForm.addEventListener('submit', loginArtisan);
});